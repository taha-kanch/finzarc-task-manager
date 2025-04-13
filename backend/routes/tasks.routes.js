const express = require('express');
const {
getTaskByUser,
createTask,
completeTask,
deleteTask
} = require('../controllers/tasks.controller.js');

const router = express.Router();

router.get("/:userId", getTaskByUser);
router.post("/", createTask);
router.put("/:taskId/complete", completeTask);
router.delete("/:taskId", deleteTask);

module.exports = router;
