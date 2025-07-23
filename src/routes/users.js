const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Tüm kullanıcıları getir
router.get('/', usersController.getAllUsers);

// Tek kullanıcı getir
router.get('/:id', usersController.getUserById);

// Kullanıcı profili güncelle
router.put('/:id', usersController.updateUser);

// Kullanıcı dashboard istatistikleri
router.get('/:id/dashboard', usersController.getUserDashboard);

module.exports = router; 