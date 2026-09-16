import { useState } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PostListPage from "./pages/PostListPage";

function App() {
  const savedUser = localStorage.getItem("loginUser");

  const [currentPage, setCurrentPage] = useState("home");
  const [loginUser, setLoginUser] = useState(
    savedUser ? JSON.parse(savedUser) : null
  );

  function handleLogout() {
    localStorage.removeItem("loginUser");
    setLoginUser(null);
    setCurrentPage("home");
  }

  return (
    <div className="app">
      <Header 
      currentPage={currentPage}
      onChangePage={setCurrentPage}
      loginUser = {loginUser}
      onLogout = {handleLogout}
      />

      <main className="main">
        {currentPage === "home" && <HomePage />}
        {currentPage === "login" && (
           <LoginPage
              onLogin={(user) => {
                setLoginUser(user);
                setCurrentPage("home");
              }}           
           />
           )}
        {currentPage === "signup" && <SignupPage />}
        {currentPage === "posts" && <PostListPage />}
      </main>
    </div>
  );
}
export default App;