function Header({currentPage, onChangePage}) {
    return (
        <header className="header">
            <h1 className="logo">게시판</h1>
            
            <nav className="nav">
                <button 
                type="button"
                className={currentPage === "home" ? "active" : ""} 
                onClick={() => onChangePage("home")}>홈</button>

                <button type="button"
                className={currentPage === "login" ? "active" : ""}
                 onClick={() => onChangePage("login")}>로그인</button>

                <button type="button"
                className={currentPage === "signup" ? "active" : ""}
                 onClick={() => onChangePage("signup")}>회원가입</button>
            </nav>
        </header>
    );
}
export default Header;