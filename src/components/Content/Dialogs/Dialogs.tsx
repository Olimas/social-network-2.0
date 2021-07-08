import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {createField, Input, Textarea} from "../../common/formsControls/FormControls";
import {InitialStateType} from "../../../redux/dialogs-reducer";
import {LoginFormValuesType} from "../../Login/LoginForm";

type OwnPropsType = {
  dialogsPage: InitialStateType
  addMessage: (messageText: string) => void
}
export type NewMessageFormValuesType = {
  newMessageText: string
}
type NewMessageFormKeysType = Extract<keyof NewMessageFormValuesType, string>;
type PropsType = {}

const Dialogs: React.FC<OwnPropsType> = (props) => {
  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map(d => (<DialogItem id={d.id} key={d.id} name={d.name}/>))
  let messagesElements = state.messages.map(m => (<Message key={m.id} message={m.message}/>))

  let addNewMessage = (values: NewMessageFormValuesType) => {
    props.addMessage(values.newMessageText);
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        {messagesElements}
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    </div>
  )
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={s.inputMessages}>
        {createField<NewMessageFormKeysType>("Enter your message", "newMessageText", [required, maxLength50], Textarea, {})}
      </div>
      <div>
        <button className={s.sendMessage}>Send message</button>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({
  form: 'dialogAddMessageForm'
})(AddMessageForm)


export default Dialogs;
