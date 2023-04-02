const User = require("../model/userModel");
const sendToken=require("../utils/jwtToken");



//Register user;

exports.registerUser = async (req, res, next) => {

   
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        

    });

   
    
    res.status(201).json({
        success:true,
        user
    });
}


//Login user

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    //cheching if user has given password and email both
    if (!email || !password) {
        return next("Please Enter Email & Password", 400)
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next("Invalid Email or Password", 401);
    }

    const isPasswordMatched =  await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next("Invalid Email or Password", 401)
    }
    sendToken(user, 201, res );
   
    // res.status(200).json({
    //     success: true,
    //     user,
    // });


}

//Logout user

exports.Logout = (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,

    })

    res.status(200).json({
        success: true,
        message: "Logged out",

    });
}

//get user details-

exports.getUserDetails = async (req, res, next) => {
    const users = await User.find();
    
    res.status(200).json({
        success: true,
        users,
    });
};

//update user.

exports.updateProfile = async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        password:req.body.password

    };

    
    
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user

    });

};

// Delete user
exports.deleteUser = async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    console.log(user);
  
    
    // if(!user){
    //     return next(`User does not exits with id ${req.params.id}`);
    // };

    // await user.remove();
    

    res.status(200).json({
        success: true,
        message:"User Deleted Successfully"

    });

};



