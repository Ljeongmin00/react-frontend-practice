import { useState } from "react";
import { login } from "../api/apiClient";

function LoginPage({onLogin}){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState(null);

    async function handleLogin(){
        if(email.trim() === "") {
            setMessage({
                type: "error",
                text: "이메일을 입력해주세요."
            });
            return;
        }
        if(!email.includes("@")){
            setMessage({
                type: "error",
                text: "이메일 형식이 올바르지 않습니다."
            });
            return;
        }
        if(password.trim() === ""){
            setMessage({
                type: "error",
                text: "비밀번호를 입력해주세요."
            });
            return;
        }

        try {
            const result = await login({
                email,
                password
            });

            console.log(result);
            localStorage.setItem("loginUser",JSON.stringify(result.data));
            onLogin(result.data);

            setEmail("");
            setPassword("");

            setMessage({
                type: "success",
                text: result.message
            });

        } catch (error){
            console.error(error);
            setMessage({
                type: "error",
                text: error.message
            });
        }
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
            {message && (
                <p className={`message ${message.type}`}>
                    {message.text}
                </p>
            )}
        </section>
    );
}
export default LoginPage;