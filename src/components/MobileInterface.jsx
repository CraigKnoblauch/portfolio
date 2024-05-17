import { Joystick } from "react-joystick-component";

export default function MobileInterface() {

    return <>

        <div className="mobile-interface">
            <Joystick size={125} sticky={false} baseColor="white" stickColor="limegreen" />
        </div>


    </>
}