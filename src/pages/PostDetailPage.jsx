import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/apiClient"; 
import CommentList from "../components/CommentList";

function PostDetailPage({postId, onBack, loginUser,onEdit, onDeleted}){
    const [post,setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [deleting, setDeleting] = useState(false);

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

    async function handleDelete() {
        const confirmed = window.confirm("게시글을 삭제하시겠습니까?");
        
        if(!confirmed){
            return;
        }
        setDeleting(true);

    try {
        await deletePost(postId);
        onDeleted();
    } catch (error){
        setMessage(error.message);
    } finally {
        setDeleting(false);
    }
    }

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
                <div className="post-actions">
                    <button type="button" onClick={onEdit}>
                        수정
                    </button>

                    <button 
                        type="button"
                        className="danger-button"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? "삭제 중..." : "삭제"}
                    </button>
                </div>
            )}

            <h2>{post.title}</h2>
            <p className="post-detail-meta">
                작성자: {post.username}
            </p>
            <div className="post-detail-content">
                {post.content}
            </div>
            <CommentList postId={postId} loginUser={loginUser} />
        </div>
    )
}

export default PostDetailPage;