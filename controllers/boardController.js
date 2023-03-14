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
  Board.find({})
       .sort({ name: 1 })
       .populate("category")
       .then((list_board) => {
        res.render("board_list", { title: "List of boards", board_list: list_board });
       })
       .catch((err) => {
        return next(err);
       });
};

exports.board_detail = (req, res, next) => {
  async.parallel(
    {
      async board() {
        try {
          const board = await Board.findById(req.params.id);
          return board;
        } catch (err) {
          return err;
        }
      },
    },
    (err, results) => {
      if (err) return next(err);
      if (results.board == null) {
        const err = new Error("Board not found");
        err.status = 404;
        return next(err);
      }

      res.render("board_detail", {
        name: results.board.name,
        description: results.board.description,
        category: results.board.category,
        price: results.board.price,
        numInStock: results.board.numInStock,
      });
    }
  );
};

exports.board_create_get = (req, res, next) => {
  // Get all categories to classify new board
  async.parallel(
    {
      async categories() {
        try {
          const categories = await Category.find();
          return categories;
        } catch (err) {
          return err;
        }
      },
    },
    (err, results) => {
      if (err) return next(err);
      res.render("board_form", {
        title: "Create Board",
        categories: results.categories,
      });
    }
  );
};

exports.board_create_post = [
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Must pick a category.")
    .escape()
    .isLength({ min: 1 }),
  body("price", "Price must not be empty.")
    .trim()
    .isNumeric()
    .escape(),
  body("numInStock", "Number in stock must not be empty.")
    .trim()
    .isNumeric({ no_symbols: true  }),

  async (req, res, next) => {
    const errors = validationResult(req);

    const board = new Board({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      numInStock: req.body.numInStock,
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          async categories() {
            try {
              const categories = await Category.find();
              return categories;
            } catch (err) {
              return err;
            }
          },
        },
        (err, results) => {
          if (err) return next(err);
          console.log(board.name)
          res.render("board_form", {
            title: "Create Board",
            categories: results.categories,
            board, 
            errors: errors.array(),
          });
        }
      );
      return;
    }

    try {
      await board.save();
      res.redirect(board.url);
    } catch (err) {
      return next(err);
    }
  }
];

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
