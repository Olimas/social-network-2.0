import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from "react";
import {PostsType} from "../../../../types/types";
import AddNewPostForm, {AddPostFormValuesType} from "./AddPostForm";

export type MapPropsType = {
  posts: Array<PostsType>
}
export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  let postsElements =
    [...props.posts]
      .reverse()
      .map(p => (
        <Post message={p.message} key={p.id} likesCount={p.likesCount}/>))
  let onAddNewPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  }
  return (
    <div className={s.posts}>
      <h2>My posts </h2>
      <div className={s.createPost}>
        <AddNewPostForm onSubmit={onAddNewPost}/>
      </div>
      {postsElements}
    </div>
  )
};

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;
