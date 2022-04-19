import { compose, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import profile from "./reducer";

const composer: Function = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;

const store = createStore(profile, composer(function(state: any, action: any) {return state}));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;