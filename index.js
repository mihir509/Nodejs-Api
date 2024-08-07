const express = require('express')
const mongoose = require('mongoose')
const bodyParser =  require('body-parser')
const cors = require('cors');
const items = require('./routes/items');
const users = require('./routes/users')
const assets = require('./routes/assets');

const app = express();

app.use(bodyParser.json())
app.use(cors());

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => console.log(err));

app.use('/uploads', express.static('uploads'));

app.use('/api/items', items);
app.use('/api/users', users)
app.use('/api/assets', assets);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
