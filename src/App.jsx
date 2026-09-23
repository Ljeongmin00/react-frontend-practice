import { useState } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostEditPage from "./pages/PostEditPage";

function App() {
  const savedUser = localStorage.getItem("loginUser");

  const [currentPage, setCurrentPage] = useState("home");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [loginUser, setLoginUser] = useState(
    savedUser ? JSON.parse(savedUser) : null
  );

  function handleLogout() {
    localStorage.removeItem("loginUser");
    setLoginUser(null);
    setCurrentPage("home");
  }

  function handleSelectPost(postId) {
    setSelectedPostId(postId);
    setCurrentPage("postDetail");
  }

  function handleCreatePost(){
    if(!loginUser) {
      setCurrentPage("login");
      return;
    }
    setCurrentPage("postCreate");
  }

  return (
    <div className="app">
      <Header 
      currentPage={currentPage}
      onChangePage={setCurrentPage}
      loginUser = {loginUser}
      onLogout = {handleLogout}
      onCreatePost = {handleCreatePost}
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
        {currentPage === "posts" && (
          <PostListPage
           onSelectPost={handleSelectPost}
           onCreatePost={handleCreatePost}
           />
        )}
        {currentPage === "postDetail" && (
          <PostDetailPage 
          postId={selectedPostId} 
          loginUser={loginUser}
          onBack={() => setCurrentPage("posts")}
          onEdit={() => setCurrentPage("postEdit")}
          />
        )}

        {currentPage === "postCreate" && loginUser && (
          <PostCreatePage
            loginUser={loginUser}
            onCreated={handleSelectPost}
            onCancel={() => setCurrentPage("posts")}
          />
        )}

        {currentPage === "postEdit" && (
          <PostEditPage 
          postId={selectedPostId} 
          loginUser={loginUser}
          onUpdated={handleSelectPost}
          />
        )}
      </main>
    </div>
  );
}
export default App;