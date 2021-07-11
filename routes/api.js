const express = require("express");
const router = express.Router();

const { User } = require("../models");

// get all users
router.get("/user_list", (req, res) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      console.log("select error", error);
      res.status(404).send(error.message);
    });
});

// create a user
router.post("/create_user", (req, res) => {
  User.create(req.body)
    .then((response) => {
      console.log("create response", response);
      res.status(201).send(response);
    })
    .catch((error) => {
      console.log("create error", error);
      res.status(404).send(error.message);
    });
});

// update existing user
router.patch("/update_user", (req, res) => {
  User.update(req.body, { where: { id: req.body.id } })
    .then((response) => {
      console.log("update response", response);
      response[0]
        ? res.send(req.body)
        : res.status(404).send({ error: "Could not update user" });
    })
    .catch((error) => {
      console.log("update error", error);
      res.status(404).send(error.message);
    });
});

//delete user
router.delete("/delete_user", (req, res) => {
  console.log("delete", req.body);
  User.destroy({ where: { id: req.body.userId } })
    .then((response) => {
      console.log("delete response", response);
      response
        ? res.status(204).send({ success: "user deleted" })
        : res.status(404).send({ error: "User not found" });
    })
    .catch((error) => {
      console.log("delete error", error);
      res.status(404).send(error.message);
    });
});

module.exports = router;
