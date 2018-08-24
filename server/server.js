const express=require('express');
const models=require("./model");
const userRouter=require("./user");
const bodyParser= require("body-parser");
const cookieParser=require("cookie-parser")
const Chat=models.getModel("chat");
let app = express();
const server=require("http").Server(app);
const io= require("socket.io")(server);

//io是全局的链接
//socket 是当前的链接
io.on("connection",function(socket){
    console.log("user login");
    socket.on("sendMsg",(data)=>{
        const {from,to,msg}=data;
        // const chatid=from+"_"+to;
        const chatid=[from,to].sort().join("_")
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            console.log(doc);
            io.emit("recvMsg",Object.assign({},doc._doc))
        })
    })
})




//解析cookie
app.use(cookieParser());
//解析url的参数
app.use(bodyParser.json())
app.use("/user",userRouter)
app.use("/jj",function(req,res){
    Chat.remove({},function(err,doc){
        res.json(doc)
    })
})
server.listen(9093,function(){
    console.log("Node app start at port 9093")
});
