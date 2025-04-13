const fs = require("fs");

const readJSON = (path) => {
return JSON.parse(fs.readFileSync(path, "utf-8"));
};

const writeJSON = (path, data) => {
fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

module.exports = { readJSON, writeJSON };
