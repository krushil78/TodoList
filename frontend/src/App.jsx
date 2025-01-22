import {  Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

import Tasks from "./pages/Tasks";
import Signup from "./pages/SignUp";
import ProtectedRoute from "./pages/Protect";


function App() {
  return (


        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
           {/* Protect the /tasks route */}
           <Route
            path="/"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          
        </Routes>
  

  );
}

export default App;
