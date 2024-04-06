import React from 'react';
import PostItem from "./PostItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";

const PostList = ({posts, title, remove, lastElement, loadedOk}) => {
    return (
        <div>
            <h1 style={{textAlign: "center"}}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((post, index) => 
                    <CSSTransition
                        key={post.id}
                        timeout={300}
                        classNames='post'
                    >
                        <PostItem remove={remove} number={index + 1} post={post}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
            {loadedOk &&
            <div ref={lastElement} style={{bottom: 0, width: '100%', height: 20, background: 'red'}}/>}
        </div>
    );
};

export default PostList;