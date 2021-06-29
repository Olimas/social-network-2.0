import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/formsControls/FormControls";


const Dialogs = (props) => {
  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map(d => (<DialogItem id={d.id} key={d.id} name={d.name}/>))
  let messagesElements = state.messages.map(m => (<Message key={m.id} message={m.message}/>))

  let addNewMessage = (values) => {
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

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field className={s.inputMessages}
               placeholder="Enter your message"
               name={"newMessageText"}
               component={Textarea}
               validate={[required, maxLength50]}
        />
      </div>
      <div>
        <button className={s.sendMessage}>Send message</button>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm({
  form: 'dialogAddMessageForm'
})(AddMessageForm)


export default Dialogs;
