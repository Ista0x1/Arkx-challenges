const express = require('express');
const app = express();
const port = process.env.port || 3000;
app.use((req,res,next)=>{
    console.log('im always here');
})
app.get('/test',(req,res,next)=>{
    console.log('im just get test');
    res.send('hello');
})
app.get('/testw',(req,res,next)=>{
    console.log('im just w');
    res.send('bye');
})
app.listen(port,()=>{
    console.log('im running at '+port);
})