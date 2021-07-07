import profileReducer, {actions} from './profile-reducer'

let state = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: 'Its my first post', likesCount: 22},
    {id: 3, message: 'Hello', likesCount: 25},
  ],
  profile: null,
  status: "",
  newPostText: "",
}

it('length of posts should be incremented', () => {
  // 1. test data
  let action = actions.addPostActionCreator("test newPostText");
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.posts.length).toBe(4);
});

it('message of new posth should be correct', () => {
  // 1. test data
  let action = actions.addPostActionCreator("test newPostText");
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.posts[3].message).toBe("test newPostText");
});

it('after deleting length of messages should be decrement', () => {
  // 1. test data
  let action = actions.deletePost(1);
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.posts.length).toBe(2);
});

it(`'after deleting length shouldn't decrement if id is incorrect'`, () => {
  // 1. test data
  let action = actions.deletePost(100);
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.posts.length).toBe(3);
});
