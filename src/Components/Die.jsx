// import { useState } from "react";

export default function Die(props) {

    const style = {
        backgroundColor: props.isHeld ? "#58a4e2" : "white"
    }

  return <button onClick={props.hold} aria-label={'Die with Value $(props.value}, ${props.isHeld ? "held" : "not held"}'} aria-pressed={props.isHeld} style={style}>{props.value}</button>;
}
