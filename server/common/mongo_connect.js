const mongoose = require('mongoose');

const USER_NAME = 'mahima23';
const PASSWORD = 'mahima23';
const DATABASE = 'uc_her_stride'
const MONGO_CONNECTION_URI = `mongodb+srv://mahima23:mahima23@petinsta.zwo1x6s.mongodb.net/test`;

const MongoDbConnect = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = MongoDbConnect;