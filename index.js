const express=require('express');
const app=express();
const path=require('path')
const fs=require('fs')

app.set("view engine","ejs");   
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))


app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render('index',{files:files})
    })
})
app.post('/create',(req,res)=>{
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
    res.redirect("/")
   })
})  
app.get('/files/:fileName',(req,res)=>{
//    let fileName=req.params.fileName; 
    fs.readFile(`./files/${req.params.fileName}`,'utf-8',(err,result)=>{
        res.send(result)
    })
})

app.listen(3000,(err)=>{
    if(err) console.log(err)
    else console.log("server started at 3000") 
})