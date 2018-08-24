const express=require("express");
const models=require("./model");
const utils = require('utility');
const User=models.getModel("user");
const Chat=models.getModel("chat");
const _filter={"pwd":0}
let Router = express.Router();
function md5Pwd(pwd){
    const salt="$%#&^#^$&@*@@*@@(";
    return utils.md5(utils.md5(pwd+salt));
}


Router.get("/getmsglist",function(req,res){
    const user=req.cookies.userid;
    User.find({},function(err,doc){
        let users={};
        doc.forEach(v=>{
            users[v._id]={name:v.user,avatar:v.avatar}
        })

        Chat.find({"$or":[{from:user},{to:user}]},function(err,doc){
            if(!err){
                return res.json({code:0,msg:doc,users:users})
            }
        })

    })



})


Router.post("/update",function(req,res){
        const userid=req.cookies.userid;
    console.log(userid);
    if(!userid){
            return res.json({code:1})
        }
        const body=req.body;
    User.findByIdAndUpdate(userid,body,function(err,doc){
            const data=Object.assign({},{
                user:doc.user,
                type:doc.type
            },body)
            return res.json({code:0,data})
        })
})
Router.post("/register",function(req,res){
    const {user,pwd,type}=req.body;
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:"用户名已经存在！"})
        }
        User.create({user,pwd:md5Pwd(pwd),type},function(err,doc){
            if(err){
                return {code:1,msg:'后端出错！'}
            }
            res.cookie("userid",doc._id)
            console.log(doc);
            return res.json({code:0})
        })
    })
})
Router.post("/login",function(req,res){
    console.log(req.body);
    const {user, pwd} = req.body;
    User.findOne({user, pwd: md5Pwd(pwd)},_filter ,function (err, doc){
        console.log(doc)
        if(!doc){
            return res.json({code:1,msg:"用户或密码错误"})
        }
        res.cookie("userid",doc._id)
        return res.json({code: 0, msg:"登陆成功！",data:doc})

    })
})
Router.get("/list",function(req,res){
    const {type}=req.query;
    User.find({type},{pwd:0},function(err,doc){
        return res.json({code:0,data:doc})
    })
    // User.remove({},function (err,doc){
    //     res.send(doc)
    // })
})
Router.get("/list1",function(req,res){
    User.find({},function(err,doc){
        return res.json(doc)
    })

})
Router.get("/info",function(req,res){
    const {userid}=req.cookies;

    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:"服务器出错！"})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})
module.exports=Router