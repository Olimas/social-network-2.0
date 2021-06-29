import s from './MyPosts.module.css';
import Post from './Post/Post';
import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {Textarea} from "../../../common/formsControls/FormControls";

const MyPosts = React.memo(props => {
  let postsElements = [...props.posts].reverse().map(p => (
    <Post id={p.id} message={p.message} key={p.id} likesCount={p.likesCount}/>))
  let onAddNewPost = (values) => {
    props.addPost(values.newPostText);
  }
  return (
    <div className={s.posts}>
      <h2>My posts </h2>
      <div className={s.createPost}>
        <AddNewPostFormRedux onSubmit={onAddNewPost}/>
      </div>
      {postsElements}
    </div>
  )
});

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field className={s.descriptionPost}
               placeholder="Enter your post text"
               name={"newPostText"}
               component={Textarea}
               validate={[required, maxLength10]}
        />
      </div>
      <div>
        <button className={s.addPost}>Add post</button>
      </div>
    </form>
  )
}

const AddNewPostFormRedux = reduxForm({
  form: 'postAddForm'
})(AddNewPostForm)

export default MyPosts;
