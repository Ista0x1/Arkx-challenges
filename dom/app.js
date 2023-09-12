console.log("hello vue 1")
const app = new vue({
    el: '#app',
    data: products,

})
// const app = vue.createApp({
//  data(){
//     return {
//         products:products,
//         title:'Hi from vue js'
//     }
//  }
// })
// app.mount('#app');
let products = [
    {
        id : 1,
        name: 'Cold Water',
        description:' Cold water make youre life better',
        Image : './assets/WhatsApp Image 2023-09-06 at 10.25.25.jpeg',
        price:2000,
        currency:MAD
    },
    {
        id : 2,
        name: 'sun protection',
        description:' Sun Skin make your life better',
        Image : './assets/skin.jpg',
        price:100,
        currency:MAD
    },
    {
        id : 3,
        name: 'Flowers ',
        description:' Cold water make youre life better',
        Image : './assets/skin2.jpg',
        price:2000,
        currency:MAD
    },
    {
        id : 4,
        name: 'Barkley',
        description:' Cold water make youre life better',
        Image : './assets/skin2.jpg',
        price:2000,
        currency:MAD
    },
    {
        id : 5,
        name: 'Lucas',
        description:' Cold water make youre life better',
        Image : './assets/skin4.jpg',
        price:2000,
        currency:MAD
    }
]
console.log('hello vue ');