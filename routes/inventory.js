const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const board_controller = require("../controllers/boardController");

// GET inventory home page
router.get("/", board_controller.index);

/// BOARD ROUTES ///
router.get("/board/create", board_controller.board_create_get);
router.post("/board/create", board_controller.board_create_post);

router.get("/board/:id/delete", board_controller.board_delete_get);
router.post("/board/:id/delete", board_controller.board_delete_post);

router.get("/board/:id/update", board_controller.board_update_get);
router.post("/board/:id/update", board_controller.board_update_post);

router.get("/board/:id", board_controller.board_detail);
router.get("/boards", board_controller.board_list);

/// CATEGORY ROUTES ///
router.get("/categories", category_controller.category_list);

router.get("/category/create", category_controller.category_create_get);
router.post("/category/create", category_controller.category_create_post);

router.get("/category/:id/delete", category_controller.category_delete_get);
router.post("/category/:id/delete", category_controller.category_delete_post);

router.get("/category/:id/update", category_controller.category_update_get);
router.post("/category/:id/update", category_controller.category_update_post);

router.get("/category/:id", category_controller.category_detail);

module.exports = router;
