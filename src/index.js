require('dotenv').config()
require('./models/Form');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const formsRoutes = require('./routes/forms');
const app = express();
// view engine setup
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", function (req, res) {
    //   res.redirect('');
    let apiResponse = { message: 'route not available in the application, params not proper or missing', error: 'Server Error', status: 404 };
    res.status(500).json(apiResponse);
});
app.use(formsRoutes);

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/forms';
if (!mongoUri) {
    throw new Error(
        `MongoURI was not supplied.`
    );
}
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
    console.error('Error connecting to mongo', err);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});
