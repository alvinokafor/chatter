import { Route, Routes } from "react-router-dom";
import { Home, Signup, Login } from "./pages";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* auth pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* auth pages */}
      </Routes>
    </main>
  );
}

export default App;
