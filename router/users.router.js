const express = require('express');
const router = express.Router()
const bodyParser = require("body-parser")
const {
  Sequelize,
  Model
} = require('sequelize');
const {
  User,
  sequelize
} = require("../models/users.model");

const jsonparser = bodyParser.json();

//Creat User
router.post("/", jsonparser, async (req, res) => {
  const data = req.body;
  const user = await User.create(data);
  res.json(user);
});

//read all user
router.get("/", async (req, res) => {
  await sequelize.authenticate();
  const users = await User.findAll();
  res.json(users);
});

//read 1 user
router.get("/user", async (req, res) => {
  const firstName = req.query.firstName;
  const user = await User.findOne({
    where: {
      firstName: firstName
    },
  });
  res.json(user);
})

// update user
router.put('/up', jsonparser, async (req, res) => {
  // const id = req.params.id; 
  const id = req.query.id
  const newdb = req.body;
  await User.update({
    firstName: `${newdb.firstName}`,
    lastName: `${newdb.lastName}`,
    age: `${newdb.age}`
  }, {
    where: {
      id: id
    }
  });
  res.send('Update succsessfully!');
});

// delete user
router.delete('/:id', async (req, res) => {
  const idUser = req.params.id;
  await User.destroy({
    where: {
      id: idUser
    }
  });
  res.send('Delete succsessfully!');
});
module.exports = router;