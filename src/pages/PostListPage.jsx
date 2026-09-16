function PostListPage(){
    const posts = [
        {
            id: 1,
            title: "첫 번째 게시글",
            content: "게시글 목록 화면을 만드는 연습입니다.",
            username: "reactuser"
        },
        {
            id: 2,
            title: "두 번째 게시글",
            content: "나중에는 이 데이터를 백엔드 API에서 가져올 예정입니다.",
            username: "testuser"
        }
    ];
    return (
        <section className="page">
            <div className="page-header">
            <div>
            <h2>게시글 목록</h2>
            <p>전체 게시글을 확인할 수 있습니다.</p>
            </div>

            <button type="button">글쓰기</button>
            </div>

            <div className="post-list">
                {posts.map((post) => (
                    <article className="post-item" key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <span>작성자: {post.username}</span>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default PostListPage;