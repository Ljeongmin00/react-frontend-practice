import { useState } from "react";
import { getPosts } from "../api/apiClient";

function HomePage(){
    const [message, setMessage] = useState("");
    const [posts, setPosts] = useState([]);
    async function loadPosts() {
        try{
            const result = await getPosts();

        console.log(result);
        setMessage(result.message);
        setPosts(result.data.content);
        } catch(error) {
            console.error(error);
            setMessage("게시글 목록을 불러오지 못했습니다.");
        }
    };

    return(
        <section className="page">
            <h2>게시판 홈</h2>
            <p>React로 만드는 게시판 프론트엔드입니다.</p>

            <button type="button" onClick={loadPosts}>게시글 불러오기</button>

            <p>{message}</p>
            <ul>
  {posts.map((post) => (
    <li key={post.id}>
      {post.title} - {post.username}
    </li>
  ))}
</ul>
        </section>
    );
}
export default HomePage;