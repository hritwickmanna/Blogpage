const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-hritwick:Rk_somali24@@cluster0.nkzac.mongodb.net/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

var _ = require('lodash'); //lodash for bringing to samelevel of lowcase letter /hint

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

const postSchema ={
  title: String,
  content: String
}

const Post = mongoose.model("Post",postSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){ //hompage

Post.find(function(err,posts){ //for a single-document/object  mistake done man
res.render("home", {startingContent:homeStartingContent, posts:posts});
  });
});

app.get("/about", function(req, res){ //about
  res.render("about", {aboutContent:aboutContent});
});

app.get("/contact", function(req, res){ //contact
  res.render("contact", {contactContent:contactContent});
});

app.get("/compose", function(req, res){ //compose
  res.render("compose");
});

app.get("/posts/:topic", function(req, res){ //dynamic url/website
// for(var i=0 ;i< posts.length ;i++){
//   if(req.params.topic===posts[i].title){
//     console.log("Match-found");
//   }
// }
//another for loop method
const topic =_.lowerCase(req.params.topic); //coverting to lower case  of dynamic part /slight mistake

Post.find(function(err,posts){
posts.forEach(function(post){
  const title = _.lowerCase(post.title) ; //coverting to lower case  of array part
  if(topic === title){
    // console.log("Match-found"); //if contained array title and dynamic url found to matched
    res.render("post",{title:post.title, content: post.content});
  }
        });
    });
});

app.post("/compose",function(req, res){ //after typing and posting /slight mistake
  const post = new Post ({
    title : req.body.postTitle,
    content : req.body.postBody
  });

post.save(function(err){ //not understood why to do this, telling for the sake of bigger content
  if(!err){
    res.redirect("/");
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
