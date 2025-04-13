const { readJSON } = require('../utils/fileHelpers.js');

const USERS_FILE = './data/users.json';

const loginUser = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email & Password are required." });

    const users = readJSON(USERS_FILE);
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    return res.status(200).json({ userId: user.id });

};

module.exports = { loginUser };
