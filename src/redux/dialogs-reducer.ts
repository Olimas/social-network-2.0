const ADD_MESSAGE = 'ADD-MESSAGE';

type DialogType = {
  id: number
  name: string
}

type MessageType = {
  id: number
  message: string
}

let initialState = {
  dialogs: [
    {id: 1, name: 'User 1'},
    {id: 2, name: 'User 2'},
    {id: 3, name: 'User 3'},
    {id: 4, name: 'User 4'},
    {id: 5, name: 'User 5'},
    {id: 6, name: 'User 6'},
  ] as Array<DialogType>,
  messages: [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'Hi'},
    {id: 5, message: 'How are you?'},
    {id: 6, message: 'Yo'},
  ] as Array<MessageType>,
}

type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_MESSAGE: {
      let text = action.newMessageText
      return {
        ...state,
        messages: [...state.messages, {id: 7, message: text}],
      };
    }
    default:
      return state;
  }
}

type AddMessageActionCreatorActionType = {
  type: typeof ADD_MESSAGE
  newMessageText: string
}

export const addMessageActionCreator = (newMessageText: string): AddMessageActionCreatorActionType => ({
  type: ADD_MESSAGE,
  newMessageText
})

export default dialogsReducer;
