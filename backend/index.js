const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth.routes.js");
const taskRoutes = require("./routes/tasks.routes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, (err) => {
    if (err) return console.log(`Error: ${err}`);
    console.log(`Server is running on PORT ${PORT}`);
});
