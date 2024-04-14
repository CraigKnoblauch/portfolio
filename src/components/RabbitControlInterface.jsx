import { Affix, Button } from "@mantine/core"
import { exp } from "three/examples/jsm/nodes/Nodes.js"
import { useRabbitAnimations } from "../contexts/RabbitAnimationsContext"

export const RabbitControlInterface = () => {

    const { animationNames, animationIndex, setAnimationIndex } = useRabbitAnimations()

    return (
        <Affix position={{ bottom: 50, right: 20 }}>
            {animationNames.map((animation, index) => (
                <Button key={animation} onClick={() => setAnimationIndex(index)}>
                    {animation}
                </Button>
            ))}
        </Affix>
    )
}

export default RabbitControlInterface