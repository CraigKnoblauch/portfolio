import { createContext, useContext, useState } from "react";


const RabbitAnimationsContext = createContext({})

export const RabbitAnimationsProvider = (props) => {

    const [animationIndex, setAnimationIndex] = useState(0)
    const [animationNames, setAnimationNames] = useState([])

    return (
        <RabbitAnimationsContext.Provider value={{
            animationIndex,
            setAnimationIndex,
            animationNames,
            setAnimationNames
        }}>
            {props.children}
        </RabbitAnimationsContext.Provider>
    )
}

export const useRabbitAnimations = () => {
    return useContext(RabbitAnimationsContext)
}