const express = require("express");
const {
  listBooks,
  listBookId,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/book-controllers");
const router = express.Router();
const upload = require("../middleware/multer");

router.get("/", listBooks);
router.get("/:bookId", listBookId);
router.post("/", upload.single("image"), createBook);
router.put("/:bookId", upload.single("image"), updateBook);
router.delete("/:bookId", deleteBook);

module.exports = router;
