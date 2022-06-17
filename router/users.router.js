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

//read all user
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    if (users) {
      res.status(200);
      res.json(users);
    }
    else{
      res.status(404);
      res.json({ message: "Error: server don't found data " });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "server got error" });
  } 
});

//read 1 user with id
router.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const found = await User.findOne({
      where: {
        id,
      },
    });
    if (found) {
      res.status(200);
      res.json(found);
    }
    else{
      res.status(404);
      res.json({ message: "not found" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "server got error" });
  } 
})

//Creat User
router.post("/", jsonparser, async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const user = await User.create(data);
      res.status(200);
      res.json(user);
    }
    else{
      res.status(404);
      res.json({ message: "Error: server don't found input data " });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "server got error" });
  }
  
});

// update user
router.put('/:id', jsonparser, async (req, res) => {
  const {
    id
  } = req.params;
  const {
    firstName,
    lastName,
    age
  } = req.body;
  try {
    const find = await User.findOne({
      where: {
        id,
      }
    })
    if (!find) {
      res.status(404)
      res.send({
        messeage: "don't find data"
      })
    } else {
      const data = await User.update({
        firstName,
        lastName,
        age
      }, {
        where: {
          id,
        }
      });
      res.status(200)
      res.send('Update succsessfully!');
    }
  } catch (error) {
    res.status(500);
    res.json({
      messeage: "Server get error while updating data"
    })
  }

});

// delete user
router.delete('/:id', async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const find = await User.findOne({
      where: {
        id,
      }
    })
    if (!find) {
      res.status(404)
      res.send({
        messeage: "don't find data"
      })
    } else {
     const deleteUser = await User.destroy({
        where: {
          id,
        }
      });
    }
    res.send('Delete succsessfully!');
  } catch (error) {
    res.status(500);
    res.json({
      messeage: "Server get error while delete data"
    })
  }
});
module.exports = router;