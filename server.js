const express = require("express");
const db = require("./data/db.js");

const server = express();
server.use(express.json());

server.post("/api/posts", (req, res) => {
  console.log(req.body);
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db.insert({ title, contents })
    .then(({ id }) => {
      db.findById(id)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "There was an error while saving the post to the database"
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

server.post("/api/posts/:id/comments", (req, res) => {
  console.log(req.body);
  const { text } = req.body;
  if (!text) {
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    });
  }
  db.insertComment({ text: req.body.text, post_id: req.params.id })
    .then(response => {
      db.findCommentById(response.id)
        .then(comment => {
          res.status(201).json(comment);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "There was an error while saving the comment to the database"
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      console.log("post", post);
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.get("/api/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  db.findPostComments(id)
    .then(comments => {
      console.log("comments", comments);
      if (comments) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(deleted => {
      console.log(deleted);
      if (deleted) {
        res.status(200).end();
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The post could not be removed" });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (!title && !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db.update(id, { title, contents })
    .then(updated => {
      if (updated) {
        db.findById(id)
          .then(post => res.status(200).json(post))
          .catch(err => {
            console.log(err);
            res
              .status(500)
              .json({ error: "The post information could not be modified." });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

module.exports = server;
