import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import SocketContext from "../context/SocketContext";
import WalletContext from "../context/WalletContext";



export default function HomePage() {
  const { userData } = useContext(AuthContext);
  const {
    requestRide,
    confirmRideDriver,
    confirmRideRider,
    endRide,
    ride,
    availableRideData,
    data,
    rideStatus,
    setData,
    requestCart
  } = useContext(SocketContext);
  const {connectWallet,
    currentAccount,}= useContext(WalletContext)
  console.log(ride, availableRideData, data, rideStatus);

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let t;
    if (rideStatus === "started") {
      t = setInterval(() => {
        setTimer((time) => time + 1);
      }, [1000]);
    }
    return () => (t ? clearInterval(t) : null);
  }, [rideStatus]);
  console.log(rideStatus);
  return (
    <Container style = {{justifyContent: "center",alignItems:"center", display:"flex", flexDirection:"column", width:"100%", height:"100%"}}>
      <p className = "h1">{userData.type === "rider"?"FARMER":"CONSUMER"}</p>
      {!currentAccount && <Button className = "button" onClick={connectWallet}> Connect Wallet </Button>}
      {currentAccount && 
      <>
      {userData.type === "rider" && (
        <>
        {rideStatus===null ? 
          <Button className = "button" style={{ margin: 20 }} onClick={requestRide}>
            REQUEST RIDE
          </Button> : rideStatus!=="ended" && rideStatus!=="started" ? 
          <Button className = "button" style={{ margin: 20 }} onClick={()=>{
            setData({apple:50})
            requestCart()
          }}>
            CONFIRM ORDER
          </Button> : rideStatus==="ended" ? <p>Please pay</p> : <p>Enjoy your Ride</p>}
        </>
      )}
      {userData.type === "driver" && (
        <>
        {rideStatus===null && <p>No Rides Available </p>}
        {rideStatus==="available" && 
          <Button className = "button" style={{ margin: 20 }} onClick={confirmRideDriver}>
            ACCEPT RIDE
          </Button>}
          {rideStatus==="started" && 
          <Button className = "button" style={{ margin: 20 }} onClick={endRide}>
            END RIDE
          </Button>}
          {rideStatus==="ended" && <p>Ride Ended</p>}
        </>
      )}
   {(rideStatus==="started" || rideStatus==="ended") && 
      <p className="h3 neon">{timer}</p>}</>}
    </Container>
  );
}
