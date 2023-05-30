import handleRefreshToken from "./refreshtoken.controller";
import handleLogout from "./logout.controller";
import { handleRegistration, handleLogin } from "./auth.controller";

// export * as authController from "./auth.controller";
export { handleRefreshToken, handleRegistration, handleLogin, handleLogout };
