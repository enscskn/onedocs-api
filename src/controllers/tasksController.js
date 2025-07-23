const supabase = require('../utils/supabaseClient');
const { TaskStatus } = require('../models/task');

// Tüm task'ları getir
exports.getAllTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let query = supabase.from('tasks').select('*');
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

// Yeni task oluştur
exports.createTask = async (req, res) => {
  try {
    const { title, description, assigned_to, created_by, due_date, status } = req.body;
    if (!title || !description || !assigned_to || !created_by) {
      return res.status(400).json({ message: 'Gerekli alanlar eksik' });
    }
    const { data, error } = await supabase.from('tasks').insert([
      {
        title,
        description,
        assigned_to,
        created_by,
        due_date: due_date || null,
        status: status || TaskStatus.PENDING,
      },
    ]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 