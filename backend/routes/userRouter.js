// routes/userRouter.js
import express from 'express';
import { deleteUser, findUserByIdByBody, findUserByIdByParams, findUsers, forgotPassword, login, resetPassword, signup, userUpdate } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.post("/findUsers",findUsers)
userRouter.post("/findUserbyIdByBody",findUserByIdByBody)
userRouter.get("/findUserbyIdByParams/:id",findUserByIdByParams)
userRouter.delete("/deleteUser/:id",deleteUser)
userRouter.put("/userUpdate",userUpdate)



userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);

export default userRouter;