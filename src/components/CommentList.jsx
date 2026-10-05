import { useState, useEffect } from "react";
import { getComments } from "../api/apiClient";

function CommentList({ postId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function loadComments() {
            try {
                setLoading(true);
                setMessage("");
            
            const result = await getComments(postId);
            setComments(result.data);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }}

        loadComments();
    }, [postId]);

    return(
        <section className="comment-section">
            <h3>댓글</h3>

            {loading && (
                <p className="message">
                    댓글을 불러오는 중입니다.
                </p>
            )}

            {message !== "" && (
                <p className="message error">
                    {message}
                </p>
            )}

            {!loading && message === "" && comments.length === 0 && (
                <p className="empty-message">
                    작성된 댓글이 없습니다.
                </p>
            )}

            {!loading && message === "" && comments.length > 0 && (
            <div className="comment-list">
                {comments.map((comment) => (
                    <article className="comment-item" key={comment.id}>
                        <div className="comment-author">
                            {comment.username}
                        </div>

                        <p className="comment-content">
                            {comment.content}
                        </p>
                    </article>
                ))}
            </div>
            )}
        </section>
    );
}

export default CommentList;