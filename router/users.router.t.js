const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { UserModel, sequelize } = require("../models/users.model");

// get middleware for json parser
const bodyJson = bodyParser.json();

// API get all users
router.get("/", bodyJson, async (req, res) => {
  const users = await UserModel.findAll();
  res.json(users);
});

// API get a specified user
router.get("/:id", bodyJson, async (req, res) => {
  const { id: userId } = req.params;
  try {
    const found = await UserModel.findOne({
      where: {
        id: userId,
      },
    });

    if (found) {
      res.status(200);
      res.json(found);
    } else {
      res.status(404);
      res.json({ message: "not found" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "server got error" });
  }
});

// API create new user
router.post("/", bodyJson, async (req, res) => {
  // get data from frontend
  const data = req.body;

  // execute query insert new user
  const user = await UserModel.create(data);

  // response data for frontend
  res.status(201);
  res.json(user);
});

// API update an existed user
router.put("/:id", isAdmin, bodyJson, async (req, res) => {
  // get user id
  const { id } = req.params;

  // get body data
  const { firstName, lastName, age } = req.body;

  // execute update
  try {
    // firstly, we must check if there is user with id in database
    const found = await UserModel.findOne({
      where: {
        id,
      },
    });

    if (!found) {
      // not found
      res.status(404);
      res.json({ message: "eh your data is wrong" });
    } else {
      // found user existed in database
      const updatedUser = await UserModel.update(
        {
          firstName,
          lastName,
          age,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200);
      res.json({ message: "successfully updated!" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "Server get error while updating data" });
  }
});

module.exports = router;