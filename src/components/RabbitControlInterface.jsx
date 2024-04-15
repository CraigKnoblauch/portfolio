import { exp } from "three/examples/jsm/nodes/Nodes.js"
import { useRabbitAnimations } from "../contexts/RabbitAnimationsContext"

export const RabbitControlInterface = () => {

    const { animationNames, animationIndex, setAnimationIndex } = useRabbitAnimations()

    return <div className="rabbit-control-interface">
        <ul>
            {animationNames.map((animation, index) => (
                <button key={animation} onClick={() => setAnimationIndex(index)}>
                    {animation}
                </button>
            ))}
        </ul>
    </div>
}

export default RabbitControlInterface