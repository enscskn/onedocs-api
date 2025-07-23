const supabase = require('../utils/supabaseClient');
const { EmailStatus } = require('../models/email');

// Tüm e-postaları getir
exports.getAllEmails = async (req, res) => {
  try {
    const { status } = req.query;
    let query = supabase.from('emails').select('*');
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

// Belirli kullanıcıya atanan e-postaları getir
exports.getAssignedEmails = async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase.from('emails').select('*').eq('assigned_to', userId);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tek e-posta getir
exports.getEmailById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('emails').select('*').eq('id', id).single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: 'E-posta bulunamadı' });
  }
};

// Yeni e-posta oluştur
exports.createEmail = async (req, res) => {
  try {
    const { subject, body, assigned_to, created_by, due_date, status } = req.body;
    if (!subject || !body || !assigned_to || !created_by) {
      return res.status(400).json({ message: 'Gerekli alanlar eksik' });
    }
    const { data, error } = await supabase.from('emails').insert([
      {
        subject,
        body,
        assigned_to,
        created_by,
        due_date: due_date || null,
        status: status || EmailStatus.PENDING,
      },
    ]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// E-posta güncelle
exports.updateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;
    const { data, error } = await supabase.from('emails').update(updateFields).eq('id', id).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// E-posta sil
exports.deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('emails').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'E-posta başarıyla silindi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Kullanıcı e-posta istatistikleri
exports.getEmailStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase.from('emails').select('status');
    if (error) throw error;
    const stats = { total: 0, completed: 0, pending: 0, in_progress: 0 };
    data.forEach(email => {
      stats.total++;
      if (email.status === EmailStatus.COMPLETED) stats.completed++;
      else if (email.status === EmailStatus.PENDING) stats.pending++;
      else if (email.status === EmailStatus.IN_PROGRESS) stats.in_progress++;
    });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 