const db = require("../../utils/database");
const Book = require("./model");

const { findOneById } = Book();

function createOne(req, res) {
  const createOne = `
    INSERT INTO books
      (name, type, author, topic, publicationDate)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  db.query(createOne, Object.values(req.body))
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function getAll(req, res) {
  const getAll = `
    SELECT *
    FROM books;
  `;

  db.query(getAll)
    .then((result) => res.json({ data: result.rows }))
    .catch(console.error);
}

function getOneById(req, res) {
  const idToGet = req.params.id;

  const getOneById = `
    SELECT *
    FROM books
    WHERE id = $1;
  `;

  db.query(getOneById, [idToGet])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function updateOneById(req, res) {
  const bookIdToUpdate = Number(req.params.id);

  const bookToUpdate = req.body;

  console.log(bookToUpdate);

  findOneById(bookIdToUpdate, (foundBook) => {
    const updatedBook = { ...foundBook, ...bookToUpdate };

    const updateOneById = `
    UPDATE books
    SET title = $1
    WHERE id = $2
    RETURNING *;
    `;
    db.query(updateOneById, [updatedBook.title, bookIdToUpdate])
      .then((result) => {
        console.log(result);
        res.json({ data: result.rows[0] });
      })
      .catch(console.error);
  });
}

module.exports = {
  createOne,
  getAll,
  getOneById,
  updateOneById,
};
