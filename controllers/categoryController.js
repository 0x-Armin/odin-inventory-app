const Category = require("../models/category");
const Board = require("../models/board");

const async = require("async");

exports.category_list = (req, res) => {
  Category.find()
          .then((list_categories) => {
            res.render("category_list", { title: "Category List", category_list: list_categories });
          })
          .catch((err) => {
            return next(err);
          })
};

exports.category_detail = (req, res, next) => {
  async.parallel(
    {
      async category() {
        try {
          const category = await Category.findById(req.params.id);
          return category;
        } catch (err) {
          return err;
        }
      },
      async category_board() {
        try {
          const board = await Board.find( { category: req.params.id });
          return board;
        } catch (err) {
          return err;
        }
      },
    },
    (err, results) => {
      if (err) return next(err);
      if (results.category == null) {
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
      }
      res.render("category_detail", {
        title: "Category Detail",
        category: results.category,
        category_board: results.category_board,
      });
    }
  );
};

exports.category_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED");
};

exports.category_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED");
};

exports.category_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED");
};

exports.category_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED");
};

exports.category_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED");
};

exports.category_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED");
};
