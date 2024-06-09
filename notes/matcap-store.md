```jsx
import { create } from "zustand"
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { matcapImages } from 'src/matcapImages.js'

export const useMatcapStore = create((set) => ({
  matcaps: {},
  loadMatcaps: () => {
    matcapImages.forEach((imageFilename) => {
      const materialName = imageFilename.split('.')[0]; // Remove the file extension
      const matcap = useLoader(TextureLoader, ['./matcaps/' + imageFilename]); // Load the matcap
      set((state) => ({ matcaps: { ...state.matcaps, [materialName]: matcap } }));
    });
  },
  getMatcapByName: (name) => (state) => state.matcaps[name],
}));
```