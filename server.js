const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors');




const app = express();

// connect db
connectDB()
app.get('/', (req, res) => res.send('API Running')
);
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


//Middleware
app.use(express.json({ extended: false }));

//Usings router
app.use('/api/users', require('./routers/api/users'))
app.use('/api/auth', require('./routers/api/auth'))
app.use('/api/profile', require('./routers/api/profile'))
app.use('/api/post', require('./routers/api/post'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on ${PORT}`)
);

