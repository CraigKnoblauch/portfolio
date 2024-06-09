import { create } from "zustand"

export const useMobileControlsStore = create((set) => ({
    direction: "",
    setDirection: (newDirection) => set(() => ({ direction: newDirection })),
    stop: () => set(() => ({ direction: "" }))
}))