import { useContext, useEffect } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { Button, Container, Navbar } from "react-bootstrap";
import DetailsForm from "./components/DetailsForm";
import HomePage from "./components/homePage";
import { SocketProvider } from "./context/SocketContext";
import { WalletProvider } from "./context/WalletContext";



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SocketProvider>
          <WalletProvider>
          <Navbar className = "heading">
        <Container style = {{justifyContent:"center"}}>
          <Navbar.Brand href="#home" className = "text-light text-middle" style = {{fontSize :"50px"}}>RIDEHUB</Navbar.Brand>
        </Container>
      </Navbar>
          <Page />
          </WalletProvider>
          
        </SocketProvider>
      </AuthProvider>
    </div>
  );
}

const Page = () => {
  const { loggedIn, loading, userData } = useContext(AuthContext);
  if (loading) return <p>loading</p>;
  if (!loading && !loggedIn) return <SignIn />;
  if (!loading && !userData?.type) return <DetailsForm />;
  return <HomePage />;
};

const SignIn = () => {
  const { login } = useContext(AuthContext);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Button className = "button" onClick={login}>Login</Button>
    </div>
  );
};

export default App;
