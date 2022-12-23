const express = require("express");
const cors = require("cors");
const app = express();

const { generateUploadURL } = require("./s3");

app.use(express.static("client"));
app.use(cors());

app.get("/s3Url", async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});

app.listen(8080, () => console.log("listening on port 8080"));
