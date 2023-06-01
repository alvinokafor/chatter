import handleRefreshToken from "./refreshtoken.controller";
import handleLogout from "./logout.controller";
import { handleRegistration, handleLogin } from "./auth.controller";
import {
  handleCreatePost,
  handleGetUserPosts,
  handleGetPost,
  handleUpdatePost,
  handleDeletePost,
  handleGetALlPosts,
} from "./post.controller";

export {
  handleRefreshToken,
  handleRegistration,
  handleLogin,
  handleLogout,
  handleCreatePost,
  handleGetUserPosts,
  handleGetPost,
  handleUpdatePost,
  handleDeletePost,
  handleGetALlPosts,
};
