import style from "./ChatPage.module.css"
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {ChatMessageApiType} from "../../api/chat-api";
import {AppStateType} from "../../redux/redux-store";

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat/>
    </div>
  )
}

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      {status === "error" && <div>Some error occurred. Please refresh the page</div>}
      <>
        <Messages/>
        <AddMessageForm/>
      </>
    </div>
  );
}

const Messages: React.FC<{}> = ({}) => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);

  // for auto scrolling down when get new message
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setAutoScroll] = useState(false);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
      !isAutoScroll && setAutoScroll(true);
    } else {
      isAutoScroll && setAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);


  return (
    <div className={style.messages} onScroll={scrollHandler}>
      {messages.map((m, index) => <Message message={m} key={m.id}/>)}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
}

const Message: React.FC<{ message: ChatMessageApiType }> = React.memo (({message}) => {
  return (
    <div>
      <img className={style.userAvatar} src={message.photo} alt="userAvatar"/> <b>{message.userName}</b>
      <br/>
      {message.message}
      <hr/>
    </div>
  );
})

const AddMessageForm: React.FC<{}> = ({}) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) return;
    dispatch(sendMessage(message));
    setMessage('');
  }
  return (
    <div>
      <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      </div>
      <div>
        <button disabled={status !== 'ready'} onClick={sendMessageHandler}>send</button>
      </div>
    </div>
  );
}


export default ChatPage;
