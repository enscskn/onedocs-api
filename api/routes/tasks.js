const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

// Tüm task'ları getir
router.get('/', tasksController.getAllTasks);

// Yeni task oluştur
router.post('/', tasksController.createTask);

// Belirli kullanıcıya atanan task'ları getir
router.get('/assigned/:userId', tasksController.getAssignedTasks);

module.exports = router; 