import { getCurrentTime, isFn, isObject } from '../../shared/utils'
import { NoPriority, PriorityLevel, getTimeoutByPriorityLevel } from './SchedulerPriority'
import { peek, pop, push } from './SchedulerMinHeap'
//Scheduler实现一个单线程任务调度器

//任务类
type Callback = any
export type Task = {
    id: number; //任务ID
    callback: Callback | null //任务回调函数
    priorityLevel: PriorityLevel //任务优先级
    startTime: number; //任务开始时间（进入调度器的时间）
    expirationTime: number //任务过期时间
    sortIndex: number; //任务排序索引
};
let taskIdCounter = 1; //任务ID计数器
let startTime = -1 //时间切片起始时间
let frameInterval = 5 //时间切片 = 5ms
let isPerformingWork = false //是否正在调度任务
let isHostCallbackScheduled = false //标记是否安排浏览器调度任务
let isMessageLoopRunning = false //是否启动消息循环
//任务池，最小堆
const taskQueue: Array<Task> = []
//当前任务
let currentTask: Task | null = null

//当前任务优先级
let currentPriority: PriorityLevel = NoPriority;
//任务调度入口
export function scheduleCallback(
    priorityLevel:PriorityLevel,
    callback:Callback,
    options?:{delay:number}
){
    //任务进入调度
    const currentTime = getCurrentTime()
    let startTime: number;
    if (isObject(options) && options !== null) {
      let delay = options?.delay;
      if (typeof delay === "number" && delay > 0) {
        startTime = currentTime + delay;
      } else {
        startTime = currentTime;
      }
    } else {
      startTime = currentTime;
    }
    const timeout = getTimeoutByPriorityLevel(priorityLevel);
    const expirationTime = startTime + timeout;
    const newTask = {
        id: taskIdCounter++,
        callback,
        priorityLevel,
        startTime, //任务开始调度理论时间
        expirationTime,  //过期时间
        sortIndex: -1 //越小越优先调度
    }
    newTask.sortIndex = expirationTime
    push(taskQueue,newTask)
    if(!isHostCallbackScheduled && !isPerformingWork){
        isHostCallbackScheduled = true
        requestHostCallback(flushWork) //给浏览器注册一个回调函数
    }
}
//给浏览器注册一个回调函数
function requestHostCallback(calllback: Callback){
    if(!isMessageLoopRunning){
        isMessageLoopRunning = true
        schedulePerformWorkUntilDeadline() //时间切片内执行，直到时间切片结束
    }
}
function performWorkUntilDeadline(){
    if(isMessageLoopRunning){
        //一个work的起始时间
        const currentTime = getCurrentTime()
        let hasOtherWork = false;
        try{    
            hasOtherWork = flushWork(currentTime)
        } finally{
            if(hasOtherWork){
                //如果还有其他任务需要执行，继续调度
                schedulePerformWorkUntilDeadline();
            }else{
                isMessageLoopRunning = false;
            }
        }
    }
}
const channel = new MessageChannel();
const port = channel.port2;
channel.port1.onmessage = performWorkUntilDeadline
//时间切片内执行，直到时间切片结束
function schedulePerformWorkUntilDeadline() {
    port.postMessage(null);
}
function flushWork(initialTime: number) {
    isHostCallbackScheduled = false
    isPerformingWork = true
    let previousPriorityLevel = currentPriority
    try{
        return workLoop(initialTime)
    } finally {
        currentPriority = previousPriorityLevel
        currentTask = null
        isPerformingWork = false
    }
}
function requestHostTimeout(){

}
function handleTimeout(){

}
function cancelHostTimeout(){

}
//取消某个任务，先把task.callback 设置为 null
//位于堆顶时删除
function cancelCallback(){
    currentTask!.callback = null
}
//获取当前任务优先级
function getCurrentPriorityLevel(): PriorityLevel {
  return currentPriority;
}
//todo
//控制权交还给主线程,当前时间 - 开始时间 >= 5ms
function shouldYieldToHost() {
    const timeElapsed = getCurrentTime() - startTime
    return timeElapsed >= frameInterval
}
//很多task要执行，每个task有一个callback
//一个work就是一个时间切片内执行的一些task
//时间切片要循环，就在workLoop中实现
// 返回true表示还有任务未完成，需要继续执行
function workLoop(initialTime: number) {
    let currentTime = initialTime
    currentTask = peek(taskQueue) as Task
    while(currentTask !== null) {
        if(currentTask.expirationTime > currentTime && shouldYieldToHost()) {
            break;
        }
        const callback = currentTask.callback
        if(isFn(callback)) { //当前任务未被取消（存在），任务有效
            currentTask.callback = null //将任务的回调函数置为null，表示任务已开始执行,防止任务重复执行
            currentPriority = currentTask.priorityLevel
            const didUserCallbackTimeout = currentTask.expirationTime <= currentTime
            const continuationCallback = callback(didUserCallbackTimeout) //执行任务回调函数
            if(isFn(continuationCallback)) { //如果回调函数返回了一个新的任务,即当前任务没有执行完成
                currentTask.callback = continuationCallback
                return true
            }else{
                if(currentTask === peek(taskQueue)) { //如果当前任务仍然是堆顶任务
                    pop(taskQueue); //从任务池中删除
                }
            }
        }else{ //任务无效
            pop(taskQueue); //从任务池中删除
        }
        currentTask = peek(taskQueue) as Task; //获取下一个任务
    }
    if(currentTask !== null) {
        return true
    } else{
        return false; //没有更多任务需要执行
    }
}