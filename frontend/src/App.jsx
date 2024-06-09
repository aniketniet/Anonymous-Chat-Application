import socketIO from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/singup";
import ChatPage from "./chatpage";

import Home from "./home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/chatpage" Component={ChatPage} />
      </Routes>
    </div>
  );
}

export default App;
