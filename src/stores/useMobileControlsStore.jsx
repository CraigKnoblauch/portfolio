import { create } from "zustand"
import { subscribeWithSelector } from 'zustand/middleware'

export const useMobileControlsStore = create((set) => ({
    direction: "",
    setDirection: (newDirection) => set((state) => ({ direction: newDirection })),
    stop: () => set((state) => ({ direction: "" }))
}))