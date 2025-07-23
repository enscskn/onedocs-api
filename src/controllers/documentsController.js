const supabase = require('../utils/supabaseClient');
const { DocumentStatus } = require('../models/document');

// Tüm dökümanları getir
exports.getAllDocuments = async (req, res) => {
  try {
    const { status } = req.query;
    let query = supabase.from('contracts').select('*');
    if (status) {
      query = query.eq('status', status);
    }
    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Belirli kullanıcıya atanan dökümanları getir
exports.getAssignedDocuments = async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase.from('contracts').select('*').eq('assigned_to', userId);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tek döküman getir
exports.getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('contracts').select('*').eq('id', id).single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: 'Döküman bulunamadı' });
  }
};

// Yeni döküman oluştur
exports.createDocument = async (req, res) => {
  try {
    const { title, content, assigned_to, created_by, due_date, status } = req.body;
    if (!title || !content || !assigned_to || !created_by) {
      return res.status(400).json({ message: 'Gerekli alanlar eksik' });
    }
    const { data, error } = await supabase.from('contracts').insert([
      {
        title,
        content,
        assigned_to,
        created_by,
        due_date: due_date || null,
        status: status || DocumentStatus.PENDING,
      },
    ]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Döküman güncelle
exports.updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;
    const { data, error } = await supabase.from('contracts').update(updateFields).eq('id', id).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Döküman sil
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('contracts').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Döküman başarıyla silindi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Kullanıcı döküman istatistikleri
exports.getDocumentStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase.from('contracts').select('status');
    if (error) throw error;
    const stats = { total: 0, completed: 0, pending: 0, in_progress: 0 };
    data.forEach(doc => {
      stats.total++;
      if (doc.status === DocumentStatus.COMPLETED) stats.completed++;
      else if (doc.status === DocumentStatus.PENDING) stats.pending++;
      else if (doc.status === DocumentStatus.IN_PROGRESS) stats.in_progress++;
    });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 