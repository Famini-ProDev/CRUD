import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Components/users/usersSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
