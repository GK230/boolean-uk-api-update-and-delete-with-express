const express = require("express");

const {
  createOne,
  getAll,
  getOneById,
  updateOneById,
} = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

router.patch("/:id", updateOneById);

module.exports = router;
