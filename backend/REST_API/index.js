const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();

// Middleware configuration
app.use(express.urlencoded({ extended: false }));

/*
In Express.js, middleware is used to parse the data in the request body. 
When a client sends data to the server, especially in a POST request where data is sent as part of the request body, 
it's not automatically parsed by Express. This is where middleware comes in handy.
*/

// Return the json data
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// Return the html element
app.get("/html/users", (req, res) => {
  const html = `
  <ul>
    ${users
      .map((user) => `<li>${user.first_name}--${user.last_name}</li>`)
      .join("")}
  </ul>`;

  res.send(html);
});

// getting the user with id
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id); // string to integer
  const user = users.find((user) => (user.id = id));
  return res.json(user);
});

// POST endpoint for creating new users
// app.post("/api/users", (req, res) => {
//   const { first_name, last_name, email, gender, job_title } = req.body;
//   console.log(req.body);

//   // Creating a new user object
//   const newUser = {
//     id: users.length + 1,
//     first_name,
//     last_name,
//     email,
//     gender,
//     job_title,
//   };

//   return res.json(newUser);
// });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length + 1 });
  });
});

// Todo : Edit the user with id
app.patch("/api/users/:id", (req, res) => {
  return res.json({ status: "Pending" });
});

// Todo : delete the user with id
app.delete("/api/users/:id", (req, res) => {
  return res.json({ status: "Pending" });
});

// ? Improve Code Maintainability
// app
//   .route("/api/users/:id")
//   .get((req, res) => {
//     const id = Number(req.params.id); // string to integer
//     const user = users.find((user) => (user.id = id));
//     return res.json(user);
//   })
//   .patch((req, res) => {
//     return res.json({ status: "Pending" });
//   })
//   .delete((req, res) => {
//     return res.json({ status: "Pending" });
//   });

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
