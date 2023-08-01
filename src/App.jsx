import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Protected from "./Protected";
import Login from "./Login";
import Registration from "./Registration";

function App() {
  return(
    <BrowserRouter>
    <nav>
    <Link to="/Registration">Not registered yet? Click here to Register</Link>
    </nav>
    <Routes>
      <Route path="/"  element={<Login />} />
      <Route path="/dashboard"  element={<Protected Component={Dashboard} />} />
      
      <Route path="/Registration" element={<Registration />} />
    </Routes>
    </BrowserRouter>
      
  );
}

export default App;
