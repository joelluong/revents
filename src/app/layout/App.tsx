import NavBar from "./nav/NavBar.tsx";
import {Container} from "semantic-ui-react";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage.tsx";
import ModalManager from "../common/modals/ModalManager.tsx";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <ModalManager />
          <NavBar />
          <Container className='main'>
            <Outlet />
          </Container>
        </>
      )}
    </>
  )
}

export default App
