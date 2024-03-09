import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Policy from "./pages/Policy";
import PolicyDetails from "./pages/PolicyDetails";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Policy />} />
      <Route path="/policy/:policyId" element={<PolicyDetails />} />
    </Routes>
  );
}

export default App;
