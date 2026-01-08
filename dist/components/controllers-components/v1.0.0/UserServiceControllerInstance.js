import { userService } from "../../service-component/v1.0.0/UserServiceInstance.js";
import { UserServiceController } from "./UserServiceController.js";
export const userServiceController = new UserServiceController(userService);
