const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dateTime = require("./helper-functions/dateAndTime");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb+srv://admin-prat33k:admin123@cluster0.4wyjr.mongodb.net/campusQ-db");

const postSchema = new mongoose.Schema({
    question: String,
    answers: [String],      // ith answer
    likes: [Number],        // like of ith answer
    dislikes: [Number],     // dislike of ith answer
    comments: [[String]],   // array of comments on ith answer 
    date: String,
    time: String,
});

const Post = new mongoose.model("post", postSchema);

const testPost = new Post({
    question: "Eu tempor fugiat officia aliquip officia do ullamco consectetur ea.?",
    answers: ["Non ut laboris est consectetur anim laboris dolore deserunt incididunt deserunt duis ipsum. Ullamco aute ipsum qui mollit aliquip enim sint magna magna tempor proident consectetur qui ipsum. Irure sunt aliqua Lorem labore id est ullamco minim minim elit culpa incididunt consequat et.", "Deserunt occaecat ipsum fugiat do dolore cillum. Labore do pariatur excepteur commodo duis. Ut sint nulla eu velit magna ut. Magna officia est culpa dolor irure in cupidatat. Minim magna nostrud sit nulla esse do voluptate irure Lorem ex consectetur.", "In anim laborum minim dolore reprehenderit ex duis quis culpa. Laboris enim minim ad anim tempor nisi ut Lorem dolor. Exercitation consectetur eu ut cupidatat. Proident magna reprehenderit dolor magna eu ex cillum fugiat dolore. In amet veniam ex laboris duis do nulla. Laborum ipsum deserunt id qui ad voluptate aute incididunt do irure laborum magna enim."],
    likes: [5, 2, 10],
    dislikes: [3, 1 , 1],
    comments: [["Proident proident anim sit enim proident voluptate quis commodo minim enim."], [], ["Mollit officia excepteur exercitation aliquip irure voluptate in pariatur.", "Id incididunt qui eu nostrud sit eiusmod nostrud.", "Ex anim dolor culpa quis proident amet ullamco fugiat do proident sint aliquip qui."]],
    date: dateTime.date(),
    time: dateTime.time(),
});

// testPost.save();

app.get("/home-posts", async (req, res)=>{

    try {
        const homePosts = await Post.find();
        res.send(homePosts);
    }
    catch(err) {
        console.error(err);
    } 

});

app.post("/askques", async (req, res)=>{

    // this is to convert the incoming data in js object form
    var data;
    for(var a in req.body) {
        data = a;
    }
    const dataObj = JSON.parse(data);
    console.log(dataObj);

    // Post to be saved in database
    const newPost = new Post({
        question: dataObj.ques,
        answers: [],
        likes: [],
        dislikes: [],
        comments: [],
        date: dateTime.date(),
        time: dateTime.time(),
    });

    Post.create(newPost, (err)=>{
        if(err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
    
});

app.listen(process.env.PORT || 4000, ()=>{
    console.log("server is running at port 4000");
});