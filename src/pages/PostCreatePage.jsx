import { useState } from "react";

function PostCreatePage( {loginUser, onCancel}){
    const[title,setTitle] = useState("");
    const[content,setContent] = useState("");
    const[message,setMessage] = useState(null);

function handleSubmit(event){
    event.preventDefault();
    
    if(title.trim()===""){
        setMessage("제목을 입력해주세요.");
        return;
    }

    if(content.trim()===""){
        setMessage("내용을 입력해주세요.");
        return;
    }

    setMessage(null);
    console.log({
        title: title.trim(),
        content: content.trim(),
        userId: loginUser.id
    });
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
                type="submit">
                작성
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