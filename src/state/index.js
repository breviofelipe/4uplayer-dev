import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  translation: null,
  user: null,
  token: null,
  metamaskAddress: null,
  posts: [],
  users: [],
  notifications: [],
  friends: []
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
    setMetamaskAddress: (state, action) => {
       state.metamaskAddress = action.payload.metamaskAddress; 
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.metamaskAddress = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload.role;
      } else {
        console.error("user role non-existent :(");
      }
    },
    setClan: (state, action) => {
      if (state.user) {
        state.user.clan = action.payload.clan;
      } else {
        console.error("user clan non-existent :(");
      }
    },
    setUsers: (state, action) => {
      state.users = action.payload.users;    
    },
    setFriendsPage: (state, action) => {
      state.friends = action.payload.friends;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload.notifications;    
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
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

export const { setMode, setTranslation, setLogin, setLogout, setFriends, setPosts, setPost, setUsers, setNotifications, setMetamaskAddress, setFriendsPage, setRole, setClan } =
  authSlice.actions;
export default authSlice.reducer;
