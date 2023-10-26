import styled from "styled-components"
import bg from './img/bg.png'
import {MainLayout} from './styles/Layouts'
import Orb from "./Components/Orb/Orb"
import Navigation from "./Components/Navigation/Navigation";
import React, { useMemo, useState } from "react"


function App() {
  const [active, setActive] = React.useState(1)
  const orbMemo = useMemo(() => {
    return <Orb />
  },[])
  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  positionL relative;
`;


export default App;
