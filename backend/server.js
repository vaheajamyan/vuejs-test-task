const express = require("express");
const http = require("http");

const {users} = require("./users");

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.post("/api/login", (req, res) => {
    const {username, password} = req.body;
    console.log(username,password);
    if (!username || !password) {
        return res.status(200).json({
            errors: [
                ...(!username ? ["username required"] : []),
                ...(!password ? ["password required"] : []),
            ]
        }).end();
    }

    const user = users.find(_ => _.username === username);
    if (!user || user.password !== password) {
        return res.status(200).json({errors: ["invalid username or password"]}).end();
    }

    return res.status(200).json({token: user.token}).end();
});

const server = http.createServer(app);


server.listen(8880, () => {
    console.log("http://localhost:8880")
});
