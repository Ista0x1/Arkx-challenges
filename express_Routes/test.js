const express = require('express');
const app = express();
const port = process.env.port || 3000;
app.use((req,res,next)=>{
    console.log('im always here');
    console.log(`${req.method} ${req.path}`)
    next()
})
app.get('/test',(req,res,next)=>{
    console.log('im just get test');
    res.end('hello');
})
app.get('/testw',(req,res,next)=>{
    console.log('im just w');
    res.send('bye');
})
app.listen(port,()=>{
    console.log('im running at '+port);
})