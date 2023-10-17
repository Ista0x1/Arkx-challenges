const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    id:Number,
    title:String,
    content:String,
    image:String,
    categories:[String]
});
blogSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('blogs',blogSchema);