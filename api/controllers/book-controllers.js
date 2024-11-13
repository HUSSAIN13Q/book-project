const express = require("express");

const Book = require("../module/Book");

const listBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listBookId = async (req, res) => {
  const { bookId } = req.params;
  try {
    const findId = await Book.findById(bookId);
    res.json(findId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const findId = await Book.findById(bookId);
    if (findId) {
      await findId.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const foundBook = await Book.findById(bookId);
    if (foundBook) {
      for (const key in req.body) {
        foundBook[key] = req.body[key];
      }
      await foundBook.save();
      res.status(200).json(foundBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { listBooks, listBookId, createBook, updateBook, deleteBook };
