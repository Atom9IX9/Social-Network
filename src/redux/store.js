// import messagesReducer from "./messagesReducer";
// import profileReducer from "./profileReducer";
// import sidebarReducer from "./sidebarReducer";

// let store = {
//   _state: {
//     profilePage: {
//       posts: [
//         { postId: 1, text: "It's my first post!", likes: 10 },
//         { postId: 2, text: "It's my second post!", likes: 5 },
//         { postId: 3, text: "Check my fotos!", likes: 10 },
//         { postId: 4, text: "How're you?", likes: 11 },
//         { postId: 5, text: "It's my last post(", likes: 1 },
//       ],
//       newPostText: "",
//     },
//     messagesPage: {
//       contacts: [
//         { contactId: 1, name: "Dima" },
//         { contactId: 2, name: "Danylo" },
//         { contactId: 3, name: "Valera(Ghoster)" },
//         { contactId: 4, name: "Mom" },
//         { contactId: 5, name: "Windy31" },
//       ],
//       messages: [
//         { messageId: 1, message: "Hello" },
//         { messageId: 2, message: "How are you?" },
//         { messageId: 3, message: "Why you ignore me?" },
//         { messageId: 4, message: "I am Oksa" },
//         { messageId: 5, message: "Y?" },
//       ],
//       messageText: "",
//     },
//     sidebar: {
//       friends: [{ name: "Dima" }, { name: "Mom" }, { name: "Danylo" }],
//       links: [
//         { path: "/profile", linkName: "Profile" },
//         { path: "/messages", linkName: "Messages" },
//         { path: "/news", linkName: "News" },
//         { path: "/music", linkName: "Music" },
//         { path: "/settings", linkName: "Settings" },
//       ],
//     },
//   },
//   _callSubscriber() {},

//   getState() {
//     return this._state;
//   },
//   subscribe(observer) {
//     this._callSubscriber = observer;
//   },

//   dispatch(action) {
//     profileReducer(this._state.profilePage, action);
//     messagesReducer(this._state.messagesPage, action);
//     sidebarReducer(this._state.sidebar, action)
//     this._callSubscriber()
//   },
// };

// export default store;
