import { useEffect, useState } from "react";
import { getPost } from "../api/apiClient"; 

function PostDetailPage({postId, onBack, loginUser,onEdit}){
    const [post,setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function loadPost() {
            try{
            const result = await getPost(postId);
            setPost(result.data);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }
        loadPost();
    }, [postId]);

    if (loading === true) {
        return <p>게시물을 불러오는 중입니다.</p>
    }

    if (message !== "") {
        return <p>{message}</p>
    }

    if (post === null) {
        return <p>게시글 정보가 없습니다.</p>
    }

    const loginUserId = loginUser?.userId ?? loginUser?.id;
    const isAuthor =
        loginUserId != null &&
        Number(post.userId) === Number(loginUserId);

    return(
        <div className="post-detail">
            <button 
                type="button" 
                className="back-button"
                onClick={onBack}
                >
                목록으로
            </button>

            {isAuthor && (
                <button type="button" onClick={onEdit}>
                    수정
                </button>
            )}

            <h2>{post.title}</h2>
            <p className="post-detail-meta">
                작성자: {post.username}
            </p>
            <div className="post-detail-content">
                {post.content}
            </div>
        </div>
    )
}

export default PostDetailPage;