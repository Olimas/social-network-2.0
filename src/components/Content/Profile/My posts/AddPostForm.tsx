import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../../../utils/validators/validators";
import {createField, GetStringKeys, Textarea} from "../../../common/formsControls/FormControls";
import s from "./MyPosts.module.css";

type PropsType = {}

export type AddPostFormValuesType = {
  newPostText: string
}
type AddPostFormValuesKeysType = GetStringKeys<AddPostFormValuesType>;

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={s.descriptionPost}>
        {createField<AddPostFormValuesKeysType>("Enter your post text", "newPostText", [required], Textarea, {})}
      </div>
      <div>
        <button className={s.addPost}>Add post</button>
      </div>
    </form>
  )
}
// const AddNewPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({form: 'postAddForm'})(AddNewPostForm)

export default reduxForm<AddPostFormValuesType, PropsType>({form: 'postAddForm'})(AddNewPostForm)
