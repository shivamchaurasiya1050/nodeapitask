const express=require("express");
const cookieParser=require("cookie-parser")
const app=express();
app.use(express.json());
app.use(cookieParser());
const conncetDataBase=require("./config/dataBase")
const user=require("./router/userRoutes");
const PORT= process.env.PORT||8000;

conncetDataBase();


 app.use("/api/v1",user);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})