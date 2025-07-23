// Task status enum
const TaskStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Task model örneği (Supabase tablosu ile eşleşmeli)
// Bu dosya, validasyon ve örnek veri için kullanılabilir

module.exports = { TaskStatus }; 