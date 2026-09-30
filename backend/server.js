import app from "./app.js";

const PORT = process.env.PORT || "8881";

app.listen(PORT, () => {
    console.log("Servidor rodando em http://localhost:" + PORT);
});

