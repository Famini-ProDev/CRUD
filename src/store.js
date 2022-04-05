import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducer/usersSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
