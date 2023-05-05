const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routes/user.js');
const dotenv = require('dotenv');
const tourRouter = require('./routes/tour.js');

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use('/users', userRouter); //http://localhost:8080/users/signup
app.use('/tour', tourRouter);


const port = process.env.PORT || 8080;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(8080, () => console.log(`Server running on port 8080`));
    })
    .catch((error) => console.log(`${error} did not connect`));
