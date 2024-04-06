import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import { HandleRequest } from '../utils/pages';

const PostIdPage = () => {
    const params = useParams()
    let [post, setPost] = useState({});
    let [comments, setComments] = useState([]);
    let [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })

    let [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostService.getCommentByPostId(id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            {HandleRequest(isLoading, error, 
                () => post == null ? "No post" : <h1>{post.id}. {post.title}</h1>)
            } 
            <h1>
                Comments
            </h1>
            {HandleRequest(isCommentsLoading, commentsError, 
                () => <div>
                        {comments.map((comment) => 
                            <div style={{marginTop: '1em'}} key={comment.id}>
                                <h5>{comment.email}</h5>
                                <div>{comment.body}</div>
                            </div>)}
                      </div>)
            }
        </div>
    );
};

export default PostIdPage;