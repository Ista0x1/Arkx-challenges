const  express = require('express'); 
const app = express();
const port = process.env.port || 3000;
let products = [
    {
        id : 1,
        name: 'Cold Water',
        description:' Cold water make youre life better',
        Image : '/assets/WhatsApp Image 2023-09-06 at 10.25.25.jpeg',
        price:2000,
        currency:'MAD',
        quantity:0
    },
    {
        id : 2,
        name: 'kas original',
        description:' Sun Skin make your life better',
        Image : '/assets/kas.jpeg',
        price:100,
        quantity:0,
        currency:'MAD'
    },
    {
        id : 3,
        name: 'cask gaming  ',
        description:' Cold water make youre life better',
        Image : '/assets/cask.jpeg',
        price:2000,
        currency:'MAD'
    },
    {
        id : 4,
        name: 'Air Pods Oraimo',
        description:' Cold water make youre life better',
        Image : '/assets/oraimo.jpeg',
        price:2000,
        currency:'MAD'
    },
    {
        id : 5,
        name: 'Air Pods ',
        description:' Cold water make youre life better',
        Image : '/assets/airpodsanas.jpeg',
        price:2000,
        currency:'MAD'
    },
    {
        id : 6,
        name: 'Hot Water',
        description:' Cold water make youre life better',
        Image : '/assets/ain at.jpeg',
        price:2000,
        quantity:20,
        currency:'MAD'
    },
    {
        id : 7,
        name: 'Book Arkx ',
        description:' Cold water make youre life better',
        Image : '/assets/arkxbook.jpeg',
        price:400,
        quantity:20,
        currency:'MAD'
    },
    {
        id : 8,
        name: 'BRika for best Smoking Experience',
        description:' Cold water make youre life better',
        Image : '/assets/brika.jpeg',
        price:2000,
        quantity:20,
        currency:'MAD'
    },
    {
        id : 9,
        name: 'Tmar for a fresh Energy',
        description:' Cold water make youre life better',
        Image : '/assets/tmar.jpeg',
        price:2000,
        quantity:20,
        currency:'MAD'
    },
    {
        id : 10,
        name: 'Loz',
        description:' Cold water make youre life better',
        Image : '/assets/loz.jpeg',
        price:2000,
        quantity:20,
        currency:'MAD'
    }
]
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