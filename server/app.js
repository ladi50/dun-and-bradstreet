const express = require("express");
const cors = require("cors");

const itemsRoutes = require("./routes/items");

const app = express();

app.use(cors());
app.use(express.json());

app.use(itemsRoutes);

app.listen(process.env.PORT || 8000, () => console.log("Server is running!"));