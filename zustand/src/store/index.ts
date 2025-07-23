// import {create} from 'zustand'
import {create} from '../zustand-nut/react'
interface BearState{
    bear: number
    count: number // Optional property for count
    increase: (by?:number) => void
    increasecount: () => void
    decrease: (by?:number) => void
    reset: () => void
}
export const useBearStore = create<BearState>()((set) => ({
    bear: 0,
    count: 100,
    increase: (by = 1) => set((state) => ({ bear: state.bear + by })),
    decrease: (by = 1) => set((state) => ({ bear: state.bear - by })),
    increasecount: () => set((state) => ({ count: state.count + 1 })),
    reset: () => set(() => ({ bear: 0 })),
}))