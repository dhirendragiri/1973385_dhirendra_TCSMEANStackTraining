const express = require('express');
const  path = require('path')
const app = express();
const fs = require('fs')

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.set("view engine" , "ejs")
app.set("views" , "views")
app.use(express.static(__dirname + './views'))

/* app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname , 'views' , 'index.html'))

}) */

app.get("/",(req,res) => {
     fs.readFile('./data.json','utf8',(err,data) => {
        console.log(data);
        const newData = JSON.parse(data)
        res.render('allTasks.ejs',{data : newData})
    })
})

app.post("/delete-task",(req,res) => {
    const id = req.body.delId;
    console.log(id);

    fs.readFile('./data.json','utf-8',(err,data) => {
         data = JSON.parse(data)
         const newData = data.filter(el => {
             return el.taskId.toString() != id.toString()
         })

         console.log(newData);
         fs.writeFile('./data.json',JSON.stringify(newData),() => {
             res.render('allTasks.ejs',{data : newData})
         })

    })
})

app.post("/add-task",(req,res) => {
    const empId = req.body.empId;
    const taskId = req.body.taskId;
    const task = req.body.task;
    const deadline = req.body.deadline;

    fs.readFile('./data.json','utf-8',(err,data) => {
        data = JSON.parse(data);
        data.push({
            empId : empId,
            taskId : taskId,
            task : task,
            deadline : deadline
        })

        fs.writeFile('data.json',JSON.stringify(data),() => {
            console.log("data added")
            return res.render('allTasks',{data : data})
        })
        
    })


    

   

    

    
})

app.listen(3000,() => {
    console.log("app started")
})