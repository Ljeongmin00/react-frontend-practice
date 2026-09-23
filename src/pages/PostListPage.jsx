import { getPosts } from "../api/apiClient";
import { useEffect,useState } from "react";

function PostListPage( {onSelectPost, onCreatePost} ){
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        loadPosts();
    },[page]);

    async function loadPosts(){
        try{
        setLoading(true);
        setMessage(null);

        const result = await getPosts(page,10);
        setPosts(result.data.content);
        setTotalPages(result.data.totalPages);

        if (result.data.content.length === 0 ) {
            setMessage({
                type: "error",
                text: "게시글이 없습니다."
            });
        }
        
        } catch (error) {
            setMessage({
                type: "error",
                text: error.message
            });
        } finally {
            setLoading(false);
        }
    }
    return (
        <section className="page">
            <div className="page-header">
            <div>
            <h2>게시글 목록</h2>
            <p>전체 게시글을 확인할 수 있습니다.</p>
            </div>

            <button 
                type="button"
                onClick={onCreatePost}
                >
                글쓰기
                </button>
            </div>

            {loading && (
                <p className="message">게시글을 불러오는 중입니다...</p>
            )}

            {message && (
                <p className={`message ${message.type}`}>
                    {message.text}
                </p>
            )}

            <div className="post-list">
                {posts.map((post) => (
                    <article className="post-item" key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <span>작성자: {post.username}</span>

                        <button
                            type="button"
                            onClick={() => onSelectPost(post.id)}
                        >
                            상세보기
                        </button>
                    </article>
                ))}
            </div>
            {totalPages > 0 && (
                <div className="pagination">
                    <button
                    type="button"
                    onClick={() => setPage(page - 1)}
                    disabled={page ===0 || loading}
                    >
                    이전
                    </button>

                    <span>
                        {page + 1} / {totalPages}
                    </span>

                    <button
                    type="button"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages - 1 || loading}
                    >
                    다음
                    </button>
                </div>
            )}
        </section>
    );
}

export default PostListPage;