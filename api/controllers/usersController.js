const supabase = require('../utils/supabaseClient');
const { UserRole } = require('../models/user');

// Tüm kullanıcıları getir
exports.getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase.from('profiles').select('id, email, full_name, role, created_at');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tek kullanıcı getir
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('profiles').select('id, email, full_name, role, created_at').eq('id', id).single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }
};

// Kullanıcı profili güncelle
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;
    const { data, error } = await supabase.from('profiles').update(updateFields).eq('id', id).select('id, email, full_name, role, created_at');
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Kullanıcı dashboard istatistikleri
exports.getUserDashboard = async (req, res) => {
  try {
    const { id } = req.params;
    // Tasks
    const { data: tasks, error: taskError } = await supabase.from('tasks').select('status').eq('assigned_to', id);
    // Documents (contracts)
    const { data: contracts, error: contractError } = await supabase.from('documents').select('status').eq('assigned_to', id);
    // Emails
    const { data: emails, error: emailError } = await supabase.from('emails').select('status').eq('assigned_to', id);
    if (taskError || contractError || emailError) throw (taskError || contractError || emailError);
    // İstatistikleri hesapla
    const stats = (arr) => ({
      total: arr.length,
      completed: arr.filter(x => x.status === 'completed').length,
      pending: arr.filter(x => x.status === 'pending').length,
      in_progress: arr.filter(x => x.status === 'in_progress').length,
    });
    const tasksStats = stats(tasks);
    const contractsStats = stats(contracts);
    const emailsStats = stats(emails);
    const summary = {
      total_items: tasksStats.total + contractsStats.total + emailsStats.total,
      total_completed: tasksStats.completed + contractsStats.completed + emailsStats.completed,
      total_pending: tasksStats.pending + contractsStats.pending + emailsStats.pending,
      total_in_progress: tasksStats.in_progress + contractsStats.in_progress + emailsStats.in_progress,
    };
    res.json({ tasks: tasksStats, contracts: contractsStats, emails: emailsStats, summary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 