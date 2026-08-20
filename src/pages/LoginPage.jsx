function LoginPage(){
    return(
        <section className="page">
            <h2>로그인</h2>
            <form className="form">
                <input type="email" placeholder="이메일"/>
                <input type="password" placeholder="비밀번호"/>
                <button type="button">로그인</button>
            </form>
        </section>
    );
}
export default LoginPage;