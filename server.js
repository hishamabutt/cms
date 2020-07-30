const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');

const app = express();
app.use(fileUpload());
//conect DataBase
connectDB();

//Init Middleware
app.use(express.json({ extented: false }));

app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/user', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/test', require('./routes/api/testDetail'));
app.use('/api/doctor', require('./routes/api/doctors'));
app.use('/api/file', require('./file'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever Started on Port ${PORT}`));
