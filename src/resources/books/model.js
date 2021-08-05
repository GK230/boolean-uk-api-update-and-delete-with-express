const db = require("../../utils/database");
const { buildBooksDatabase } = require("../../utils/mockData");

function Book() {
  function createTable() {
    const sql = `
      
      CREATE TABLE IF NOT EXISTS books (
        id              SERIAL        PRIMARY KEY,
        title           VARCHAR(255)   NOT NULL,
        type            VARCHAR(255)   NOT NULL,
        author          VARCHAR(255)   NOT NULL,
        topic           VARCHAR(255)   NOT NULL,
        publicationDate DATE           NOT NULL
      );
    `;

    db.query(sql)
      .then((result) => console.log("[DB] Book table ready."))
      .catch(console.error);
  }

  async function findOneById(bookId, callback) {
    const getOneById = `
    SELECT *
    FROM books
    WHERE id = $1;
  `;

    const result = await db.query(getOneById, [bookId]);

    callback(result.rows[0]);
  }

  function mockData() {
    const createBook = `
      INSERT INTO books
        (title, type, author, topic, publicationDate)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const books = buildBooksDatabase();

    books.forEach((book) => {
      db.query(createBook, Object.values(book)).catch(console.error);
    });
  }

  createTable();
  mockData();
  return {
    findOneById,
  };
}

module.exports = Book;
