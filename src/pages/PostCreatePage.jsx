import { useState } from "react";
import { createPost } from "../api/apiClient";

function PostCreatePage( {loginUser, onCancel, onCreated}){
    const[title,setTitle] = useState("");
    const[content,setContent] = useState("");
    const[message,setMessage] = useState(null);
    const[submitting, setSubmitting] = useState(false);

async function handleSubmit(event){
    event.preventDefault();

    if (submitting === true) return;
    
    if(title.trim()===""){
        setMessage("제목을 입력해주세요.");
        return;
    }

    if(content.trim()===""){
        setMessage("내용을 입력해주세요.");
        return;
    }

    setMessage(null);
    setSubmitting(true);
try{
    const result = await createPost({
        title: title.trim(),
        content: content.trim(),
        userId: loginUser.id
    });

    onCreated(result.data.id);
}catch (error) {
    setMessage(error.message);
} finally{
    setSubmitting(false);
}
}
    return(
        <>
        <h2>게시글 작성</h2>

        <form onSubmit={handleSubmit}>
            <label htmlFor="title">제목</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <label htmlFor="content">내용</label>
            <textarea
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}            
            />

            <button
                type="submit" disabled={submitting}>
                {submitting ? "작성 중..." : "작성"}
                </button>

            <button
                type="button"
                onClick={onCancel}>
                    취소
                </button>
        </form>

        {message && <p className="message error">{message}</p>}
        </>
    );
}

export default PostCreatePage;