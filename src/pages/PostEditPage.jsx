import { useState,useEffect } from "react";
import { getPost,updatePost } from "../api/apiClient";

function PostEditPage({postId, loginUser, onUpdated}){

    const[title,setTitle] = useState("");
    const[content,setContent] = useState("");
    const[loading,setLoading] = useState(true);
    const[submitting,setSubmitting] = useState(false);
    const[message,setMessage] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            setLoading(true);
            setMessage(null);

            try{
                const result = await getPost(postId);
                setTitle(result.data.title);
                setContent(result.data.content);
            } catch(error) {
                setMessage("게시물을 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [postId]);

    async function handleSubmit(event){
        event.preventDefault();

        if(submitting === true) {
            return;
        }

        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if(!trimmedTitle || !trimmedContent) {
            setMessage("제목과 내용을 모두 입력해 주세요.");
            return;
        }

        const userId = loginUser?.userId ?? loginUser?.id;

        if (userId == null){
            setMessage("로그인이 필요합니다.");
            return;
        }

        setSubmitting(true);
        setMessage(null);

        try{
            await updatePost(postId,{
                title: trimmedTitle,
                content: trimmedContent,
                userId: userId
            });

            onUpdated(postId);
        } catch (error) {
            setMessage(error.message || "게시글 수정에 실패했습니다.");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <p>게시글을 불러오는 중입니다.</p>
    }

    return(
        <div>
            <h2>게시글 수정</h2>

            <form onSubmit={handleSubmit}>
            <label>
                제목
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </label>

            <label>
                내용
                <textarea
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                />
            </label>

            {message && <p>{message}</p>}

            <button type="submit" disabled={submitting}>
                {submitting ? "수정 중..." : "수정 완료"}
            </button>
            </form>
        </div>
    );
}

export default PostEditPage;