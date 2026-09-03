import { useState } from "react";
import { signup } from "../api/apiClient";

function SignupPage(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSignup() {
        if (username.trim() === ""){
            setMessage("이름을 입력해주세요.");
            return;
        }
        if (email.trim() === ""){
            setMessage("이메일을 입력해주세요.");
            return;
        }
        if(!email.includes("@")){
            setMessage("이메일 형식이 올바르지 않습니다.");
            return;
        }
        if(password.length < 8 ){
            setMessage("비밀번호는 8자 이상이어야 합니다.");
            return;
        }
        try {
            const result = await signup({
                username,
                email,
                password,
            });

            console.log(result);
            setMessage(result.message);
        } catch (error) {
            console.error(error);
            setMessage(error.message);
        }
    }

    return(
        <section className="page">
            <h2>회원가입</h2>
            <form className="form">
                <input 
                    type="text" 
                    value={username} 
                    onChange={(event) => setUsername(event.target.value)} 
                    placeholder="이름"
                />
                <input 
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="이메일"
                />
                <input 
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="비밀번호"
                />
                <button type="button" onClick={handleSignup}>회원가입</button>
            </form>
            
            {message && <p className="message">{message}</p>}
        </section>
    );
}
export default SignupPage;