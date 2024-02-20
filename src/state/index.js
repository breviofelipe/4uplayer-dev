import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  translation: null,
  user: null,
  token: null,
  posts: [],
  users: [],
  notifications: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setTranslation: (state, action) => {
      state.translation = action.payload;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setUsers: (state, action) => {
      state.users = action.payload.users;    
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload.notifications;    
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPostsPersonagem: (state, action) => {
      state.postsPersonagem = action.payload.postsPersonagem;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post.id === action.payload.post.id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setTranslation, setLogin, setLogout, setFriends, setPosts, setPost, setUsers, setNotifications } =
  authSlice.actions;
export default authSlice.reducer;
