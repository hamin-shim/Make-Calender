import { useEffect, useState } from "react";
import "../style/search.scss";
import Result from "../component/Result";
function Search({ userObject, events }) {
  const [searchWhat, setSearchWhat] = useState(null);
  const [keyWord, setKeyWord] = useState("");
  const [result, setResult] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();
    setKeyWord(searchWhat);
  };
  const searchResult = (keyWord) => {
    let includedData = [];
    if (!userObject) {
      alert("로그인 해주세요");
    } else {
      events.map((eve) => {
        if (eve.creatorId === userObject.uid) {
          if (
            eve.title.includes(keyWord) || //title에 포함되거나
            eve.description.includes(keyWord) || //description에 포함되거나
            eve.date.includes(keyWord) || //date에 포함되어 있거나
            eve.tag.includes(keyWord)
          ) {
            //tag array에 포함되어 있거나
            includedData.push(eve);
          }
        }
      });
    }
    setResult(includedData);
  };
  useEffect(() => {
    searchResult();
  }, []);
  useEffect(() => {
    searchResult(keyWord);
    console.log(searchWhat, keyWord);
  }, [keyWord]);
  return (
    <div className="search mt-5">
      <form onSubmit={onSubmit}>
        <div className="searchBar">
          <input
            className="form-control"
            type="text"
            value={searchWhat}
            onChange={(e) => {
              setSearchWhat(e.target.value);
            }}
            placeholder="검색어를 입력하세요 (태그, 제목, 설명 등..)"
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-outline-primary"
          />
        </div>
      </form>
      {}
      <Result data={result} />
    </div>
  );
}
export default Search;
