import { useState } from "react";

function LoginPage(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");

    function handleLogin(){
        if(email.trim() === "") {
            setMessage("이메일을 입력해주세요.");
            return;
        }
        if(!email.includes("@")){
            setMessage("이메일 형식이 올바르지 않습니다.");
            return;
        }
        if(password.trim() === ""){
            setMessage("비밀번호를 입력해주세요.");
            return;
        }

        console.log({
            email,
            password
        });
        setMessage("로그인 입력값 확인 완료");
    }

    return(
        <section className="page">
            <h2>로그인</h2>
            <form className="form">
                <input 
                    type="email" 
                    placeholder="이메일"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password" 
                    placeholder="비밀번호"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="button" onClick={handleLogin}>로그인</button>
            </form>
            {message && <p className="message">{message}</p>}
        </section>
    );
}
export default LoginPage;