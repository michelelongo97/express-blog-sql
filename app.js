const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");

const postsRouter = require("./routers/posts");

app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send("Server del mio blog");
});

app.use("/posts", postsRouter);

//middleware per error404
app.use(notFound);
app.use(errorsHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
