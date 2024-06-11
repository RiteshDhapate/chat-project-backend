import {Router} from "express";
import { registerController } from "../controllers/register.controller.js";
import { resendEmailController } from "../controllers/resendEmail.controller.js";
import { updateUserProfileController } from "../controllers/updateProfile.contriller.js";
import { loginController } from "../controllers/loginUser.controller.js";
import { forgotPasswordController } from "../controllers/forgotPassword.controller.js";
import { verifyUserController } from "../controllers/verifyUser.controller.js";
import { updatePasswordController } from "../controllers/updatePassword.js";
import { getUserDetailController } from "../controllers/getUserDetails.controller.js";
import { getAllUsersSentRequests } from "../controllers/getAllusersSentRequest.controller.js";
import { sendRequestController } from "../controllers/sendRequest.controller.js";
import { getAllUsersAcceptRequests } from "../controllers/getAllUsersAcceptRequest.controller.js";
import { acceptRequestController } from "../controllers/acceptRequest.controller.js";
import { rejectRequestController } from "../controllers/rejectRequest.controller.js";
import { getAllGroupJoinController } from "../controllers/getAllGroupsJoin.controller.js";
import { createGroupController } from "../controllers/createGroup.controller.js";
import { joinGroupController } from "../controllers/joinGroup.controller.js";
import { getAllGroupController } from "../controllers/getAllGroups.controller.js";
import { getAllFrendsRequests } from "../controllers/getAllFriends.controller.js";
import { getChatDetailsController } from "../controllers/getChatDetails.controller.js";
import { getMessagesController } from "../controllers/getMessages.controller.js";
const route = Router();


// user routes
route.post("/register",registerController);
route.post("/login",loginController);
route.post("/forgot-password",forgotPasswordController);
route.post("/resend-email",resendEmailController);
route.post("/verify-user",verifyUserController);
route.post("/update-password",updatePasswordController);
route.post("/update-profile",updateUserProfileController);
route.post("/get-user-details",getUserDetailController);
route.post("/get-all-user-sent-requests", getAllUsersSentRequests);
route.post("/sent-request", sendRequestController);
route.post("/accept-request", acceptRequestController);
route.post("/reject-request", rejectRequestController);
route.post("/get-all-users-accept-requests", getAllUsersAcceptRequests);

// groups routes
route.post("/get-all-groups-join", getAllGroupJoinController);
route.post("/create-group", createGroupController);
route.post("/join-group", joinGroupController);
route.post("/get-all-groups", getAllGroupController);


// friends
route.post("/get-all-friends", getAllFrendsRequests);


// get chats user or group and my id details
route.post("/get-chat-details", getChatDetailsController);
route.post("/get-messages", getMessagesController);

export default route;