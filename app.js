const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, './public')));

app.listen(3000, () => {
    console.log("el servidor se conecto en el puerto 3000")
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/home.html"));
})
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/register.html"));
})
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/login.html"));
});
app.get("/productCard", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/productCard.html"));
});
app.get("/history", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/history.html"));
});
  });
app.get("/detallesProductos", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/detallesProductos.html"))
})

