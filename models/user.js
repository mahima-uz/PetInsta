const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const User = new mongoose.Schema({

    username:{
        type: String, 
        required: true
    },
    petParent:{ 
        type: String, 
        required: true 
    },
    profilePicture:{ 
        type: String, 
        required: true 
    },
    petName:{ 
        type: String, 
        required: true 
    },
    petAge:{ 
        type: String, 
        required: true 
    },
    petGender:{ 
        type: String, 
        required: true 
    },
    petBreed:{ 
        type: String, 
        required: true 
    },
    postsArray:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Posts'
        }
    ],
    followed:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
});

module.exports = mongoose.model('User', User);

