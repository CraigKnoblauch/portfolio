import { create } from "zustand"
import { Joystick } from "react-joystick-component"
import { useMobileControlsStore } from "src/stores/useMobileControlsStore"
import React from "react"

/**
 * Implementation notes
 * 
 * useMobileControlsStore is a custom hook that uses Zustand to manage the state of the mobile controls ui
 * When the user moves the joystick, the setDirection function from the useMobileControlsStore is called with the new direction
 * When the user stops moving the joystick, the stop function from the useMobileControlsStore is called
 * Currently useMobileControlsStore can be accessed from any component in the app
 */
export default React.memo(function MobileInterface() {

    const setDirection = useMobileControlsStore(state => state.setDirection)
    const stop = useMobileControlsStore(state => state.stop)

    return (
        <>
            <div className="mobile-interface">

                <Joystick move={(data) => {setDirection(data.direction)}}
                          stop={() => stop()} 
                          size={125} 
                          sticky={false} 
                          baseColor="white" 
                          stickColor="limegreen" />

            </div>
        </>
    );
})