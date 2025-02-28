const express = require('express');
const { resolve } = require('path');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const {User} = require("./model/signup");
const bcrypt = require("bcryptjs")

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.static('static'));
app.use(express.json())

const mongoDB = async()=>{
  await mongoose.connect(MONGO_URI)
  .then(()=>{
      console.log("Connected to mongoDB")
  })
  .catch((error)=>{
      console.log("Unable to connect to mongoDB", error)
  })
}

mongoDB();

app.post('/signup', async(req, res)=>{
  try {
    const {name, email, password} = req.body;
    // console.log(email)
    const existingUser = await User.find({ email });
    // console.log(existingUser)
    if (existingUser.length!=0){
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({name, email, password:hashedPassword});
    await user.save();

    res.status(201).json({"message":"User Created Successfully"});
  } catch (error) {
    console.log(error)
    res.status(400).json({error:error.message})
  }
})

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
