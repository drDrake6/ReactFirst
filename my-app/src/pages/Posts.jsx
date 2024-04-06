import React, {useEffect, useRef, useState} from "react";
import '../styles/App.css'
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import { usePost } from "../hooks/usePost";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { HandleRequest, getPagesCount } from "../utils/pages";
import Pagination from "../components/UI/Pagination/Pagination";
import { v4 as uuidv4 } from 'uuid';
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
  let [posts, setPosts] = useState([])
  let [filter, setFilter] = useState({sort: '', query: ''});
  let [modal, setModal] = useState(false);
  let [totalPages, setTotalPages] = useState(0);
  let [limit, setLimit] = useState(10);
  let [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostLoading, error] = useFetching( async (limit, page) => {
    console.log(totalPages)
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data]);
    totalPages = response.headers['x-total-count']
    setTotalPages(getPagesCount(totalPages, limit))
  })

  useObserver(lastElement, page < totalPages, isPostLoading, () =>{
    setPage(page + 1)
  })

  useEffect(
    () => {
      fetchPosts(limit, page)
    }, [page, limit]
  )

  const sortedAndSearchedPosts = usePost(posts, filter.sort, filter.query)

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(el => el.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: '2em'}} onClick={() => setModal(true)}>
        Create Post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
      <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '1em 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <MySelect 
        value={limit} 
        onChange={(value) => {setLimit(value)}} 
        defaultValue="Quentity of elements on page" 
        options={[
          {key: uuidv4(), value: 5, name: '5'},
          {key: uuidv4(), value: 10, name: '10'},
          {key: uuidv4(), value: 20, name: '20'},
          {key: uuidv4(), value: 25, name: '25'},
          {key: uuidv4(), value: totalPages * limit, name: 'Show all'},
        ]}/>
      <PostList 
        remove={removePost} 
        posts={sortedAndSearchedPosts} 
        title={HandleRequest(isPostLoading, error, 
          () => posts.length === 0 ? "No posts" : "Posts list" 
        )}
        lastElement={lastElement}
        loadedOk={!isPostLoading}/>
      <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
    </div>
  );
}

export default Posts;
