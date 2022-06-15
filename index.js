const express = require('express');
const  bodyParser  = require('body-parser');
const userRouter = require("./router/users.router");

const app = express()
const port = 3000;
app.use("/users", userRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})