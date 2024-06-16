import { create } from "zustand"

export const useMobileControlsStore = create((set) => ({
    direction: "",
    x: 0,
    y: 0,

    // setDirection: (newDirection) => set(() => ({ direction: newDirection })),
    // setX: (newX) => set(() => ({ x: newX })),
    // setY: (newY) => set(() => ({ y: newY })),
    setData: (data) => set(() => ({ direction: data.direction, x: data.x, y: data.y })),

    stop: () => set(() => ({ direction: "", x: 0, y: 0}))
}))