//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const upload = require("express-fileupload");
const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(upload());
mongoose.connect("mongodb+srv://admin:bangatia@cluster0.mia2p.mongodb.net/pdfDB",{useNewUrlParser: true,  useUnifiedTopology:true});


const itemsSchema = {
  name: String,
  course: String,
  count:{
    type: Number, default: 0
  }
};

const Item = mongoose.model("Item", itemsSchema);

app.get("/", function(req, res) {
var maxi=0;
Item.find({course:"course1"},function(err,docs)
{
  if(err)console.log(err);
  else
  {
    docs.forEach(function(item)
  {
    maxi=Math.max(maxi,item.count);
  })

  Item.find({count:maxi,course:"course1"},function(err,namem)
{
    res.render("index",{docs:docs,gem1:namem[0].name});
})

  }
})

});


app.get("/course2",function(req,res)
{
  var maxi=0;
  //var courseName= req.params.title;
  Item.find({course:"course2"},function(err,docs)
  {
    if(err)console.log(err);
    else
    {
      docs.forEach(function(item)
    {
      maxi=Math.max(maxi,item.count);
    })

    Item.find({count:maxi,course:"course2"},function(err,namem)
  {
      res.render("index",{docs:docs,gem1:namem[0].name});
  })

    }
  })

})


app.get("/course3",function(req,res)
{
  var maxi=0;
  //var courseName= req.params.title;
  Item.find({course:"course3"},function(err,docs)
  {
    if(err)console.log(err);
    else
    {
      docs.forEach(function(item)
    {
      maxi=Math.max(maxi,item.count);
    })

    Item.find({count:maxi,course:"course3"},function(err,namem)
  {
      res.render("index",{docs:docs,gem1:namem[0].name});
  })

    }
  })

})


app.get("/course4",function(req,res)
{
  var maxi=0;
  //var courseName= req.params.title;
  Item.find({course:"course4"},function(err,docs)
  {
    if(err)console.log(err);
    else
    {
      docs.forEach(function(item)
    {
      maxi=Math.max(maxi,item.count);
    })

    Item.find({count:maxi,course:"course4"},function(err,namem)
  {
      res.render("index",{docs:docs,gem1:namem[0].name});
  })

    }
  })

})

app.get("/upload",function(req,res)
{
  res.render("insert");
})
app.post("/upload",function(req,res)
{
  var courseName =req.body.courses;
  console.log(courseName);
  if(req.files)
  {
    var file=req.files.file;
    var filename=file.name;
    file.mv(__dirname+'/public/docs/'+courseName+'/'+filename,function(err)
  {if(err)console.log(err);
  else
  {
    const doc= new Item({
      name: filename,course:courseName,count:0
    })
    doc.save();
      res.render("uploaded")
  }

  })
  }
})

app.get("/downloads/:course/:title",function(req,res)
{
  const courseName= req.params.course;
  const request= req.params.title;

Item.updateOne({name:request,course:courseName},{$inc: {count: 1}},function(err)
{
if(err)console.log(err);
})
  res.download(__dirname+'/public/docs/'+courseName+'/'+request,`${request}`,(err)=>
{
if(err){console.log(err);}
  else
  {console.log("downloaded");    }

})
});


app.listen(PORT, function() {
  console.log("Server started on port 3000");
});
