import { useState } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  return (
    <div className="app">
      <Header currentPage={currentPage} onChangePage={setCurrentPage}/>

      <main className="main">
        {currentPage === "home" && <HomePage />}
        {currentPage === "login" && <LoginPage />}
        {currentPage === "signup" && <SignupPage />}
      </main>
    </div>
  );
}
export default App;