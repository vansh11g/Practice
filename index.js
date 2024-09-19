import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
// just for github check
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

function checkpassword(req, res, next) {
  const pass = req.body["password"];
  if (pass === "ILoveProgramming") {
    req.isauthorised = true; // Set a property on the request object instead
  } else {
    req.isauthorised = false; // Explicitly set false if the password is incorrect
  }
  next();
}

// Serve the index.html file at the root
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Apply the middleware only to the "/check" route
app.post("/check", checkpassword, (req, res) => {
  if (req.isauthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(port, () => {
  console.log(`SERVER ${port} is on and listening`);
});
