const express = require('express');
const { parse } = require('path');
const app = express();
const port = process.env.port ?? 3000;
app.use(express.json())
let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
  ];
app.get('/products',(req,res)=>{
    res.send(products) 
})
app.get('/products/search',(req,res)=>{
    let min= req.query.minPrice;
    let max =req.query.maxPrice;
    const search = products.filter(product => product.price > min && product.price < max)
    if(search){
        console.log(search);
        res.send(search);

    }
    else{
        res.status(404).send('update minPrice and maxPrice')
    }
})
app.get('/products/:id',(req,res,next)=>{
    let id = Number(req.params.id);
    console.log(id)
    let product = products.find(product => product.id === id);
    if(product){
    console.log(product)
    res.send(product);
    }
    else{
     
    }
})
app.post('/products',(req,res)=>{
    const product = req.body;
    if(!product.name){
        res.status(404).send('bro please enter full information of product')
    }
    product.id = products.length + 1;
        products.push(product);
    res.status(201).send(product)
})
app.put('/products/:id',(req,res)=>{
    let id = req.params.id;
    const product = products.find(p => p.id === id);

    console.log(product)
    if(!product){
        console.log(product)
        res.status(404).send('bro what are you doing enter the correct id ')
    }
    product.name = req.body.name || product.name;
    product.price =req.body.price || product.price;
    
    res.send(products);


})
app.delete('/products/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    const product = products.findIndex(p=>p.id === id);
    if(product){
        products.splice(product,1);
        res.send(products)
    }
    else{
        res.send('there is no such a  product')
    }
})
app.get('*',(req,res)=>{
    res.status(404).send("404")
})

app.listen(port, ()=>{ console.log('Server running on port '+port)})
