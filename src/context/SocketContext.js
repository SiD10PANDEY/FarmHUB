import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import AuthContext from "./AuthContext";

const SocketContext = React.createContext({});
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState({});
  const [responseData, setResponseData] = useState({});
  const [availableCartRequest, setAvailableCartRequest] = useState({});
  const [requestStatus, setRequestStatus] = useState();
  const { loggedIn, userData, user } = useContext(AuthContext);

  useEffect(() => {
    if (loggedIn && userData?.type) {
      const socket = io("http://localhost:3000");

      socket.on("connect", () => {
        setSocket(socket);
      });

      socket.on("disconnect", () => {
        setSocket(null);
      });

      socket.on("response", (data) => {
        setResponseData(data);
        setRequestStatus("open");
      });

      socket.on("request", (data) => {
        setAvailableCartRequest(data);
        setRequestStatus("open");
      });

      socket.on("confirm", (data) => {
        setRequestStatus("confirmed");
      });

      socket.on("cancel", (data) => {
        setRequestStatus("cancelled");
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
      };
    }
  }, [loggedIn, userData]);

  const requestCart = () => {
    if (socket !== null) {
      socket.emit("request", data);
    }
  };

  const confirm = () => {
    if (socket !== null) {
      socket.emit("confirm", responseData);
    }
  };
  const sendData = (data) => {
    if (socket !== null) {
      socket.emit("data", { ...userData, ...data, user , type: userData.type === "rider" ? "consumer" : "farmer",});
    }
  };

  const response = (data) => {
    if (socket !== null) {
      socket.emit("response", data);
    }
  };

  const cancel = () => {
    if (socket !== null) {
      socket.emit("cancel");
    }
  };

  useEffect(() => {
    setData({
      apples: 50,
    });
    requestCart();
  }, []);

  return (
    <SocketContext.Provider
    value={{
      requestCart,
      confirm,
      response,
      cancel,
      data,
      availableCartRequest,
      responseData,
      requestStatus,
      sendData,
      socket,
      setData,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;