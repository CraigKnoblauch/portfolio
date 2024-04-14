import { OrbitControls } from "@react-three/drei"
import Rabbit from "./Rabbit.jsx"

const Experience = () => {
    return (
        <>
            <ambientLight />
            <OrbitControls />
            <Rabbit />
        </>
    )
}

export default Experience