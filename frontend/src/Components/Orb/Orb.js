import React from "react"
import styled, { keyframes } from 'styled-components'
import { useWindowSize } from "../utils/useWidowSize";


function Orb() {

    const {width, height} = useWindowSize()

    console.log(width, height)

    const moveOrb = keyframes`
        0%{
            transform: translate(0, 0);
        }
        50%{
            transform: translate(${width}px, ${height/2}px);
        }
        100%{
            transform: translate(0, 0);
        }
    `
// background: linear-gradient(180deg, #1D2570 0%, #7991BD 100%);
    const OrbStyled = styled.div`
        width: 100vh;
        height: 100vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -37vh;
        margin-top: -37vh;
        background: linear-gradient(180deg, #F56692 0%, #F2994A 80%);
        filter: blur(800px);
        animation: ${moveOrb} 15s alternate linear infinite;
    `;

    return (
        <OrbStyled></OrbStyled>
    )
}

export default Orb