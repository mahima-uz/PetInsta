
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const PostSchema = new mongoose.Schema({

            userid:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            mediaLink:{ 
                type: String,
                required: true
            },
            location:{ 
                type: String,
            },
            date:{
                type: Date,
                default: Date.now
              },
            time:{
                type: Date,
                default: Date.now
              },         
            likes:{ 
                type: Number,
            },
           
},)

module.exports = mongoose.model('Posts', PostSchema);















//// date:{ type: Date, required: true },
            // time:{ type: Date, required: true },