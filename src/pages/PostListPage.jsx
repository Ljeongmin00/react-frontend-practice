import { useEffect,useState } from "react";
import PostSearchForm from "../components/PostSearchForm";
import { getPosts, searchPosts } from "../api/apiClient";

function PostListPage( {onSelectPost, onCreatePost} ){
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        loadPosts();
    },[page, searchKeyword]);

    async function loadPosts(){
        try{
        setLoading(true);
        setMessage(null);

        const result = searchKeyword
            ? await searchPosts(searchKeyword, page, 10)
            : await getPosts(page, 10);

        const pageData = result.data;

        setPosts(pageData.content);
        setTotalPages(pageData.totalPages);
        setTotalElements(pageData.totalElements);

        if (pageData.content.length === 0 ) {
            setMessage({
                type: "info",
                text: searchKeyword
                    ? "검색 결과가 없습니다."
                    : "게시글이 없습니다."
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
    
    function handleSearch(keyword){
        setSearchKeyword(keyword);
        setPage(0);
    }

    function handleReset(){
        setSearchKeyword("");
        setPage(0);
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

            <PostSearchForm
                onSearch={handleSearch}
                onReset={handleReset}
                loading={loading}
            />

           <div className="post-list-summary">
                {searchKeyword ? (
                    <p>
                        <strong>{searchKeyword}</strong> 검색 결과: {totalElements}개
                    </p>
                ) : (
                    <p>전체 게시글 {totalElements}개</p>
                )}
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
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                    type="button"
                    className="pagination-button"
                    onClick={() => setPage(page - 1)}
                    disabled={page ===0 || loading}
                    >
                    이전
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={page === index ? "pagination-button active" : "pagination-button"}
                            onClick={() => setPage(index)}
                            disabled={loading}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                    type="button"
                    className="pagination-button"
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