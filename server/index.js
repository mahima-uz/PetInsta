const express = require('express');
const Router = express();
const Post=require('../models/posts.js')
const User=require("../models/user.js")


Router.post('/createPost/:userId',async(req,res)=>{
    try{
        
        const userid=req.params.userId;
        const post=new Post({
            userid:userid,
            mediaLink:req.body.mediaLink,
            location:req.body.location,
            likes:req.body.likes,
            comments:req.body.comments,
        })

        const result=await post.save()
        const user=await User.findById(userid)
        user.postsArray.push(post._id);
        
        res.status(200).json({post,});
    
    } catch(e){
        console.error(e);
        res.status(500).json('Server error --> ' + e.message);
    }
})

Router.post('/createUser',async(req,res)=>{
    try{
        const user=new User({
            username:req.body.username,
            petParent:req.body.petParent,
            profilePicture:req.body.profilePicture,
            petName:req.body.petName,
            petAge:req.body.petAge,
            petGender:req.body.petAge,
            petBreed:req.body.petBreed
        })
        const result=await user.save();
        res.status(200).json({})

    }catch(e){
        console.error(e);
        res.status(500).json('Server error --> ' + e.message);
    }
})

Router.get('/follow/:userId/:followingId',async(req,res)=>{
    try {
        const userid=req.params.userId;
        const followingId=req.params.followingId;

        await User.findByIdAndUpdate(
            userid,
            {$push:{followed:followingId } },
            {new:true}
        )
        await User.findByIdAndUpdate(
            followingId,
            {$push:{followers: userid } },
            {new:true}
        )
        res.status(200).json({});
    } catch(e) {
        console.error(e);
        res.status(500).json('Server error --> ' + e.message);
    }
})


Router.get('/like/:postId',async(req,res)=>{
    try{
        const postId=req.params.postId;
        await Post.findByIdAndUpdate(
            postId,
            {$inc:{likes:1}},
            {new:true}
        )
        res.status(200).json({});
    }catch(e){
        console.error(e);
        res.status(500).json('Server error --> ' + e.message);
    }

})

Router.get("/openProfile/:userId",async(req,res)=>{
    try{
        const userId=req.params.userId;
        const user=await User.findById(userId)
        const posts=await Post.find({userid:userId})
        const response={
            user,posts
        }
        res.status(200).json(response)
    }catch(e){
        console.error(e);
        res.status(500).json('Server error --> ' + e.message);
    }
})

Router.get("/getFeed/:userId",async(req,res)=>{
    try{
        const response={}
        const userId=req.params.userId;
        const user=await User.findById(userId);
        const followedUsers=user.followed;
        const posts=await Post.find()
        posts.forEach(function(item){
            if(followedUsers.includes(item.userid)){
               response[item._id]=item;
            }
        })
        res.status(200).json(response)

    }catch(e){
        console.error(e);
        res.status(500).json('Server error --> ' + e.message);
    }
})

















// function getUser(userid){
//     return userDatabase.find((item,index)=>{
//         if(parseInt(item.userid)===userid){
        
//             return item;
//         }
//     })
// }

// function getPost(userid){
//     posts=[]
//     for(var i=0;i<postsDatabase.length;i++){
//         if(parseInt(postsDatabase[i].userid)===userid){
//         // console.log(postsDatabase[i]);

//             posts.push(postsDatabase[i]);
//         }
//     }
//     // console.log(posts,"posts")
//     return posts;
// }
// function addPost(userid){
//     postsDatabase
// }

// Router.get('/getFeed',async(req,res)=>{
    
//     shownPosts=[];
//     try{
//         const userid=3;
//         const userDetails= await getUser(userid);
//         const userFollowed=userDetails.followed;
//         userFollowed.forEach( userid => {
//             const res=getPost(userid)
//             shownPosts.push(res);
        
//         });
    
//         for(let j=0;j<shownPosts.length;j++){
//             len=shownPosts[j].length;
//             for(let k=0;k<len;k++){
//             let user=getUser(parseInt(shownPosts[j][k].userid));
//             // console.log("user",user);
//             shownPosts[j][k].username=user.username;
//             shownPosts[j][k].profilePicture=user.profilePicture;
//             }
//         }
//         // console.log(shownPosts);
//        return res.send(shownPosts);
        
//     }
//     catch(err){
//         console.error(err);
//     res.status(500).json('Server error --> ' + err.message);
//     }
// })

module.exports = Router;