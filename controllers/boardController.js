const Board = require("../models/board");
const Category = require("../models/category");

const async = require("async");
const { body, validationResult } = require("express-validator");

exports.index = (req, res) => {
  async.parallel(
    {
      async board_count() {
        try {
          const numBoard = await Board.countDocuments();
          return numBoard;
        } catch (err) {
          return err;
        }
      },
      async category_count() {
        try {
          const numCategory = await Category.countDocuments();
          return numCategory;
        } catch (err) {
          return err;
        }
      },
    },
    (err, results) => {
      console.log("trying to render");
      res.render("index", {
        title: "Inventory Application",
        error: err,
        data: results,
      });
    }
  );
};

exports.board_list = (req, res) => {
  res.send("NOT IMPLEMENTED: Board list");
};

exports.board_detail = (req, res) => {
  res.send("NOT IMPLEMENTED: Board detail");
};

exports.board_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED");
};

exports.board_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED");
};

exports.board_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED");
};

exports.board_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED");
};

exports.board_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED");
};

exports.board_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED");
};
