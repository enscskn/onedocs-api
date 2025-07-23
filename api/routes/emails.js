const express = require('express');
const router = express.Router();
const emailsController = require('../controllers/emailsController');

// Tüm e-postaları getir
router.get('/', emailsController.getAllEmails);

// Belirli kullanıcıya atanan e-postaları getir
router.get('/assigned/:userId', emailsController.getAssignedEmails);

// Tek e-posta getir
router.get('/:id', emailsController.getEmailById);

// Yeni e-posta oluştur
router.post('/', emailsController.createEmail);

// E-posta güncelle
router.put('/:id', emailsController.updateEmail);

// E-posta sil
router.delete('/:id', emailsController.deleteEmail);

// Kullanıcı e-posta istatistikleri
router.get('/stats/:userId', emailsController.getEmailStats);

module.exports = router; 