const Category = require("../models/category");

exports.category_list = (req, res) => {
  Category.find()
          .then((list_categories) => {
            res.render("category_list", { title: "Category List", category_list: list_categories });
          })
          .catch((err) => {
            return next(err);
          })
};

exports.category_detail = (req, res) => {
  res.send("NOT IMPLEMENTED");
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
