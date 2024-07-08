import { create } from 'zustand'

export const useCameraStore = create((set) => ({
  cameras: {},
  addCamera: (camera) => set((state) => ({ cameras: state.cameras[camera.name] = camera }))
}))