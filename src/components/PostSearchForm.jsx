import { useState } from "react";

function PostSearchForm({onSearch, onReset}) {
    const [keyword, setKeyword] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        setMessage("");

        const trimmedKeyword = keyword.trim();

        if(trimmedKeyword === "") {
            setMessage("검색어를 입력해주세요.");
            return;
        }

        onSearch(trimmedKeyword);
    }

    function handleReset(){
        setKeyword("");
        setMessage("");
        onReset();
    }

    return (
        <div className="post-search-area">
            <form className="post-search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                aria-label="게시글 검색어"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="검색어를 입력하세요."
            />
            <button type="submit">
                검색
            </button>

            <button type="button" onClick={handleReset}>
                초기화
            </button>

            </form>

            {message !== "" && (
                <p className="message error">
                    {message}
                </p>
            )}
        </div>
    );
}

export default PostSearchForm;