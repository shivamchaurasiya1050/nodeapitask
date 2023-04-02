const express= require("express");

const {registerUser, getUserDetails,loginUser,deleteUser,updateProfile,Logout}=require("../controller/userController")
const {isAuthenticatedUser, authorizeRoles}=require("../middleware/auth")
const router= express.Router();

router.route("/create").post(registerUser);
router.route("/login").post(loginUser);
router.route("/user/me").get(getUserDetails);
router.route("/user/update/:id").put(isAuthenticatedUser,authorizeRoles("user"), updateProfile);
router.route("/user/:id").delete(isAuthenticatedUser,authorizeRoles("user"), deleteUser);
router.route("/logout").get(Logout);


module.exports=router;