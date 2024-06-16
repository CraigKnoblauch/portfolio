import { Joystick } from "react-joystick-component"
import React from "react"

import { useMobileControlsStore } from "src/stores/useMobileControlsStore"

/**
 * Implementation notes
 * 
 * useMobileControlsStore is a custom hook that uses Zustand to manage the state of the mobile controls ui
 * When the user moves the joystick, the setDirection function from the useMobileControlsStore is called with the new direction
 * When the user stops moving the joystick, the stop function from the useMobileControlsStore is called
 * Currently useMobileControlsStore can be accessed from any component in the app
 */
const MobileInterface = React.memo(function MobileInterface() {

    // const setDirection = useMobileControlsStore(state => state.setDirection)
    // const setX = useMobileControlsStore(state => state.setX)
    // const setY = useMobileControlsStore(state => state.setY)

    const setData = useMobileControlsStore(state => state.setData)

    const stop = useMobileControlsStore(state => state.stop)

    return (
        <>
            <div className="mobile-interface">

                <Joystick move={(data) => {setData(data)}}
                          stop={() => stop()} 
                          start={(data) => setData(data)}
                          size={150}
                          stickSize={80} 
                          sticky={false} 
                          baseColor="white" 
                          stickColor="black" />

            </div>
        </>
    );
});

export default MobileInterface;