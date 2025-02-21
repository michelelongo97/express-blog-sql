const connection = require("../data/db");

const postsData = require("../data/posts");

//index
const index = (req, res) => {
  const sql = `SELECT * FROM posts`;

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Database query failed",
      });
    }

    res.json(results);
  });
};

//show
const show = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM posts WHERE id = ?`;

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Database query failed",
      });
    }

    const post = results[0];

    if (!post) {
      return res.status(404).json({
        error: "Not Found",
        message: "Post non trovato",
      });
    }

    res.json(post);
  });
};

//create
const create = (req, res) => {
  const newId = postsData[postsData.length - 1].id + 1;
  const newPost = {
    id: newId,
    title: req.body.title,
    tags: req.body.tags,
    image: req.body.image,
    content: req.body.content,
  };

  postsData.push(newPost);

  res.sendStatus(201);
};

//update
const update = (req, res) => {
  const post = postsData.find((elm) => elm.id == req.params.id);

  if (!post) {
    return res.status(404).json({
      error: "Post not found",
    });
  }

  post.name = req.body.name;
  post.tags = req.body.tags;

  res.json(post);
};

//modify
const modify = (req, res) => {
  res.send(`Modifica parziale del post: ${req.params.id}`);
};

//delete
const destroy = (req, res) => {
  //  const post = postsData.find((elm) => elm.id == req.params.id);

  //  if (!post) {
  //    return res.status(404).json({
  //      error: "Post not found",
  //    });
  //  }

  //  postsData.splice(postsData.indexOf(post), 1);
  //  console.log("Post aggiornati:", postsData);

  const sql = `DELETE FROM posts WHERE id = ?`;
  const id = req.params.id;

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Database query failed",
      });
    }
    res.sendStatus(204);
  });
};

module.exports = { index, show, create, update, modify, destroy };
