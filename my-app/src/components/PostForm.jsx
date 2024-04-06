import React, { useRef, useState } from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import { v4 as uuidv4 } from 'uuid';

const PostForm = ({create}) => {

    let [post, setPost] = useState({title: 'Post6', body: 'Post6 text'});
    const bodyInputRef = useRef();

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: uuidv4()
        }
        create(newPost)
        setPost({title: '', body: ''})
      }

    return (
        <div>
            {/*Управляемый компонент (двухсторонее связывание, хук useState)*/}
      <MyInput 
          value={post.title} 
          onChange={e => setPost({...post, title: e.target.value})} 
          type="text" 
          placeholder="post name"
      />
      {/*Неуправляемый компонент (ссылка, хук useRef)*/}
      {/* <MyInput 
          ref={bodyInputRef} 
          type="text" 
          placeholder="post desc"
      /> */}
      <MyInput 
          value={post.body} 
          onChange={e => setPost({...post, body: e.target.value})} 
          type="text" 
          placeholder="post desc"
      />
      <MyButton onClick={addNewPost}>Create</MyButton>
        </div>
    );
};

export default PostForm;