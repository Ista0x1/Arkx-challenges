const  express = require('express'); 
const app = express();
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

client.connect((err) => {
    if (err) {
      console.error('Failed to connect to the database:', err);
      return;
    }else{
        console.log('Connected to the database');
    }
  });   
    // Get a reference to the database
    const db = client.db('products');  
    // Get a reference to a collection
     collection = db.collection('products');
const port =  3000;

app.use(express.static(__dirname + '/views',{ maxAge:'30d'}));

app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
    res.render('index',{products});
})
app.get('/product/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    console.log(product)
    res.render('product-details',{product: product})
})
app.listen(port,()=>{
    console.log('server running at '+port);
})