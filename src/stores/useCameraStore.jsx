import { create } from "zustand"

export const useCameraStore = create((set) => ({
    cameras: {}, // Map of THREE.Camera objects

    addCamera: (camera) =>
    {
        set((cameras) =>
        {
            cameras[camera.name] = camera
        })
    },

    // TODO what if an invalid name is passed?
    getCameraByName: (name) =>
    {
        return cameras[name]
    }
}))