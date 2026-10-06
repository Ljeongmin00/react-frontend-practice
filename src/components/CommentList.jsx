import { useState, useEffect } from "react";
import { getComments, createComment } from "../api/apiClient";

function CommentList({ postId, loginUser }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const [reloadCount, setReloadCount] = useState(0);

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
    }, [postId, reloadCount]);

    async function handleSubmit(event) {
        event.preventDefault()
        if (submitting) return;

        setSubmitMessage("");

        const trimmdContent = content.trim();
        const userId = loginUser?.userId ?? loginUser?.id;

        if (trimmdContent === "") {
            setSubmitMessage("댓글 내용을 입력해주세요.");
            return;
        }

        if (userId == null) {
            setSubmitMessage("로그인이 필요합니다.");
            return;
        }

        setSubmitting(true);

        try {
            await createComment(postId, {
                content: trimmdContent,
                userId
            });
            setContent("");
            setReloadCount((count) => count + 1);
        } catch (error) {
            setSubmitMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    }

    return(
        <section className="comment-section">
            <h3>댓글</h3>
        {loginUser ? (
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder="댓글을 입력하세요."
                    rows={3}
                    maxLength={1000}
                    disabled={submitting}
                />
               <button type="submit" disabled={submitting}>
                    {submitting ? "등록 중..." : "등록"}
               </button>
               {submitMessage !== "" && (
                    <p className="message error">{submitMessage}</p>
               )}
            </form>
            ) : (
                <p className="message">
                    로그인 후 댓글을 작성할 수 있습니다.
                </p>
            )}

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