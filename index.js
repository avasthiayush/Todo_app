const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
dotenv.config();

app.set("view engine", "ejs");

//models
const Todo = require("./models/Todo");

//connection to db
mongoose.set("useFindAndModify", false);
const uri = process.env.dbURL;
mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true  }, () => {
console.log("Connected to db!");
});

app.use(express.urlencoded({ extended: true }));

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/',function(req,res){
    Todo.Todo.find({},function(err,data)
    {
        if(err)
        {
                process.exit(1);
        }
        res.render('todo', {data:data});
    })
});

app.post('/save',urlencodedParser,function(req,res)
{ 
    let va = ".";
    if(req.body.content.length > 0){
        va=req.body.content;
    }
    let p = {
        content : va
    };
    Todo.Todo(p).save(function(err,data)
    {
         if(err)
         {
         process.exit(1);
         }
         res.redirect('/');
    });
});

app.post('/remove',function(req,res)
{
    console.log(req.body);
    Todo.Todo.find({ content : req.body.content }).deleteOne(function(err,data)
    {
        if(err)
        {
        process.exit(1);
        }
        res.redirect('/');
    });
});

app.listen(3000, () => console.log("Server Up and running"));