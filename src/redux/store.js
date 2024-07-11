import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import typeReducer from "./typeSlice.js";

export default configureStore({
  reducer: {
    user: userReducer,
    type: typeReducer,
  },
});
