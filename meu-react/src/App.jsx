import { useState } from "react";
import LoginStatus from "./components/LoginStatus";
import Notification from "./components/Notification";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  return (
    <div>
      <LoginStatus isLoggedIn={isLoggedIn} />
      <Notification showNotification={showNotif} />
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>
      <button onClick={() => setShowNotif(!showNotif)}>
        {showNotif ? "Ocultar" : "Mostrar"} Notificação
      </button>
    </div>
  );
}

export default App;
