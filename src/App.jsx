import { Outlet } from "react-router-dom";
import Header from "./components/Headers";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <div>
      <Header />
      <Container classname='my-2'>
        <Outlet />
      </Container>
    </div>
  )
}

export default App
