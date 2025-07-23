const express = require('express');
const router = express.Router();
const documentsController = require('../controllers/documentsController');

// Tüm dökümanları getir
router.get('/', documentsController.getAllDocuments);

// Belirli kullanıcıya atanan dökümanları getir
router.get('/assigned/:userId', documentsController.getAssignedDocuments);

// Tek döküman getir
router.get('/:id', documentsController.getDocumentById);

// Yeni döküman oluştur
router.post('/', documentsController.createDocument);

// Döküman güncelle
router.put('/:id', documentsController.updateDocument);

// Döküman sil
router.delete('/:id', documentsController.deleteDocument);

// Kullanıcı döküman istatistikleri
router.get('/stats/:userId', documentsController.getDocumentStats);

module.exports = router; 