const dotenv = require("dotenv");
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const app = express();


dotenv.config({ path: './config.env' });

const sequelize = require('./db/conn');
app.use(cors({
  credentials: true, origin: true
}));
// app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use("/Images", express.static ("./Images"));

app.use(cookieParser());
app.use('/post', require('./routes/post'))
app.use('/admin', require('./routes/auth'))
app.use('/register', require('./routes/register'))


const PORT = process.env.PORT || 3000;

app.get("/signup", (req, res) => {
  res.send(`Hello from the server`);
});

sequelize.sync({force:false})
.then(result=>{
  // console.log(result);
  app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
  })
})
.catch(err => {
  console.log(err);
});

