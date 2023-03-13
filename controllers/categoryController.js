const Category = require("../models/category");
const Board = require("../models/board");

const async = require("async");
const { body, validationResult } = require("express-validator");

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
  res.render("category_form", { title: "Create Category" });
};

exports.category_create_post = [
  // Validate and sanitize the name field
  body("name", "Category name required").trim().isLength({ min: 1, max: 30 }).escape(),
  body("description", "Description required").trim().isLength({ min: 1, max: 70 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({ name: req.body.name, description: req.body.description });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category,
        errors: errors.array(),
      });
      return;
    } else {
      Category.findOne({ name: req.body.name })
              .then(async (found_cate) => {
                if (found_cate) res.redirect(found_cate.url);
                else {
                  const result = await category.save();
                  if (result) res.redirect(category.url);
                  else return next(result);
                }
              })
              .catch((err) => {
                return next(err);
              });
    }
  },
];

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
