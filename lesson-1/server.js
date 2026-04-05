import http from "http";

const users = [
  {
    id: "1",
    username: "mindx",
    email: "mindx@gmail.com",
    address: "29T1 Hoang Dao Thuy",
    age: 10,
  },
  {
    id: "2",
    username: "mindx-2",
    email: "mindx-2@gmail.com",
    address: "29T1 Hoang Dao Thuy",
    age: 60,
  },
];

const app = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, "http://localhost:3001");
  switch (requestUrl.pathname) {
    case "/users":
      res.end(JSON.stringify(users));
      break;
    case "/users/old": {
      const oldUsers = users.filter((user) => user.age > 50);
      res.end(JSON.stringify(oldUsers));
      break;
    }
    case "/users/add-random":
      const randomUser = {
        id: "2",
        username: "mindx-2",
        email: "mindx-2@gmail.com",
        address: "29T1 Hoang Dao Thuy",
        age: 60,
      };
      users.push(randomUser);
      res.end(JSON.stringify(randomUser));
      break;
    case "/users/add":
      const name = requestUrl.searchParams.get("name");
      const age = requestUrl.searchParams.get("age");
      const user = {
        id: 3,
        name,
        age,
      };
      users.push(user);
      res.end(JSON.stringify(users));
      break;
    default:
      res.end("NOT FOUND");
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});
