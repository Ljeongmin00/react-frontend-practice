function SignupPage(){
    return(
        <section className="page">
            <h2>회원가입</h2>
            <form className="form">
                <input type="text" placeholder="이름"/>
                <input type="email" placeholder="이메일"/>
                <input type="password" placeholder="비밀번호"/>
                <button type="button">회원가입</button>
            </form>
        </section>
    );
}
export default SignupPage;