const express = require('express');
const ctrl = require("../../controllers/contacts");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { auth } = require('../../middlewares');

const router = express.Router();



router.get("/", ctrl.getAll);
router.get("/:contactId", ctrlWrapper(ctrl.getById));
router.post("/", auth, ctrlWrapper(ctrl.add));
router.delete("/:contactId", ctrlWrapper(ctrl.removeById));
router.put("/:contactId", ctrlWrapper(ctrl.putById));
router.patch("/:contactId/favorite", ctrlWrapper(ctrl.patchFavoriteById));

module.exports = router;
