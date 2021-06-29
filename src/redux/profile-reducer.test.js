import profileReducer, {addPostActionCreator, deletePost} from './profile-reducer'

let state = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: 'Its my first post', likesCount: 22},
    {id: 3, message: 'Hello', likesCount: 25},
  ],
}
test('length of posts should be incremented', () => {
  // 1. test data
  let action = addPostActionCreator("test newPostText");
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.posts.length).toBe(4);
});
test('message of new posth should be correct', () => {
  // 1. test data
  let action = addPostActionCreator("test newPostText");
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.posts[3].message).toBe("test newPostText");
});
test('after deleting length of messages should be decrement', () => {
  // 1. test data
  let action = deletePost(1);
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.posts.length).toBe(2);
});
test(`'after deleting length shouldn't decrement if id is incorrect'`, () => {
  // 1. test data
  let action = deletePost(100);
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.posts.length).toBe(3);
});
