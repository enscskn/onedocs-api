const API_BASE = 'https://onedocs-api.vercel.app/api';

// Helper: JSON pretty print
function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

// Alert göster
function showAlert(id, type, msg) {
  document.getElementById(id).innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">${msg}<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>`;
}

// Tabloya veri bas
function renderTable(tableId, data) {
  const table = document.getElementById(tableId);
  if (!data || !Array.isArray(data) || data.length === 0) {
    table.style.display = 'none';
    table.innerHTML = '';
    return;
  }
  const keys = Object.keys(data[0]);
  let thead = '<thead><tr>' + keys.map(k => `<th>${k}</th>`).join('') + '</tr></thead>';
  let tbody = '<tbody>' + data.map(row => '<tr>' + keys.map(k => `<td>${row[k] ?? ''}</td>`).join('') + '</tr>').join('') + '</tbody>';
  table.innerHTML = thead + tbody;
  table.style.display = '';
}

// HEALTH BADGE
async function updateHealthBadge() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    let color = 'secondary', text = 'Bilinmiyor';
    if (data.status === 'ok' && data.services?.api === 'healthy') {
      color = 'success'; text = 'API Sağlıklı';
    } else if (data.status !== 'ok') {
      color = 'danger'; text = 'API Sorunlu';
    }
    document.getElementById('health-badge').innerHTML = `<span class="badge bg-${color}">${text}</span>`;
  } catch {
    document.getElementById('health-badge').innerHTML = '<span class="badge bg-danger">API Erişilemiyor</span>';
  }
}
setInterval(updateHealthBadge, 5000); updateHealthBadge();

// TASKS
async function getTasks() {
  try {
    const res = await fetch(`${API_BASE}/tasks`);
    const data = await res.json();
    renderTable('tasks-table', data);
    showAlert('tasks-alert', 'success', 'Task listesi başarıyla yüklendi.');
  } catch (e) {
    showAlert('tasks-alert', 'danger', 'Tasklar yüklenemedi.');
  }
}
async function getTasksByUser() {
  const userId = document.getElementById('tasks-user-id').value.trim();
  if (!userId) return showAlert('tasks-alert', 'warning', 'Kullanıcı ID giriniz.');
  try {
    const res = await fetch(`${API_BASE}/tasks/assigned/${userId}`);
    const data = await res.json();
    renderTable('tasks-table', data);
    showAlert('tasks-alert', 'success', `Kullanıcı (${userId}) için tasklar yüklendi.`);
  } catch (e) {
    showAlert('tasks-alert', 'danger', 'Tasklar yüklenemedi.');
  }
}
document.getElementById('task-create-form').onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const body = {
    title: form.title.value,
    description: form.description.value,
    assigned_to: form.assigned_to.value,
    created_by: form.created_by.value,
    due_date: form.due_date.value ? new Date(form.due_date.value).toISOString() : undefined,
    status: form.status.value
  };
  try {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) {
      showAlert('task-create-alert', 'success', 'Task başarıyla oluşturuldu.');
      getTasks();
      form.reset();
    } else {
      showAlert('task-create-alert', 'danger', data.message || 'Task oluşturulamadı.');
    }
  } catch {
    showAlert('task-create-alert', 'danger', 'Task oluşturulamadı.');
  }
};
document.getElementById('fill-task-btn').onclick = () => {
  const f = document.getElementById('task-create-form');
  f.title.value = 'Örnek Task';
  f.description.value = 'Bu bir örnek açıklamadır.';
  f.assigned_to.value = '1';
  f.created_by.value = '2';
  f.due_date.value = new Date(Date.now() + 86400000).toISOString().slice(0,16);
  f.status.value = 'pending';
};

// DOCUMENTS
async function getDocuments() {
  try {
    const res = await fetch(`${API_BASE}/documents`);
    const data = await res.json();
    renderTable('documents-table', data);
    showAlert('documents-alert', 'success', 'Döküman listesi başarıyla yüklendi.');
  } catch (e) {
    showAlert('documents-alert', 'danger', 'Dökümanlar yüklenemedi.');
  }
}
async function getDocumentsByUser() {
  const userId = document.getElementById('documents-user-id').value.trim();
  if (!userId) return showAlert('documents-alert', 'warning', 'Kullanıcı ID giriniz.');
  try {
    const res = await fetch(`${API_BASE}/documents/assigned/${userId}`);
    const data = await res.json();
    renderTable('documents-table', data);
    showAlert('documents-alert', 'success', `Kullanıcı (${userId}) için dökümanlar yüklendi.`);
  } catch (e) {
    showAlert('documents-alert', 'danger', 'Dökümanlar yüklenemedi.');
  }
}
document.getElementById('document-create-form').onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const body = {
    title: form.title.value,
    content: form.content.value,
    assigned_to: form.assigned_to.value,
    created_by: form.created_by.value,
    due_date: form.due_date.value ? new Date(form.due_date.value).toISOString() : undefined,
    status: form.status.value
  };
  try {
    const res = await fetch(`${API_BASE}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) {
      showAlert('document-create-alert', 'success', 'Döküman başarıyla oluşturuldu.');
      getDocuments();
      form.reset();
    } else {
      showAlert('document-create-alert', 'danger', data.message || 'Döküman oluşturulamadı.');
    }
  } catch {
    showAlert('document-create-alert', 'danger', 'Döküman oluşturulamadı.');
  }
};
document.getElementById('fill-document-btn').onclick = () => {
  const f = document.getElementById('document-create-form');
  f.title.value = 'Örnek Döküman';
  f.content.value = 'Bu bir örnek döküman içeriğidir.';
  f.assigned_to.value = '1';
  f.created_by.value = '2';
  f.due_date.value = new Date(Date.now() + 172800000).toISOString().slice(0,16);
  f.status.value = 'waiting';
};

// EMAILS
async function getEmails() {
  try {
    const res = await fetch(`${API_BASE}/emails`);
    const data = await res.json();
    renderTable('emails-table', data);
    showAlert('emails-alert', 'success', 'E-posta listesi başarıyla yüklendi.');
  } catch (e) {
    showAlert('emails-alert', 'danger', 'E-postalar yüklenemedi.');
  }
}
async function getEmailsByUser() {
  const userId = document.getElementById('emails-user-id').value.trim();
  if (!userId) return showAlert('emails-alert', 'warning', 'Kullanıcı ID giriniz.');
  try {
    const res = await fetch(`${API_BASE}/emails/assigned/${userId}`);
    const data = await res.json();
    renderTable('emails-table', data);
    showAlert('emails-alert', 'success', `Kullanıcı (${userId}) için e-postalar yüklendi.`);
  } catch (e) {
    showAlert('emails-alert', 'danger', 'E-postalar yüklenemedi.');
  }
}
document.getElementById('email-create-form').onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const body = {
    subject: form.subject.value,
    body: form.body.value,
    assigned_to: form.assigned_to.value,
    created_by: form.created_by.value,
    due_date: form.due_date.value ? new Date(form.due_date.value).toISOString() : undefined,
    status: form.status.value
  };
  try {
    const res = await fetch(`${API_BASE}/emails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) {
      showAlert('email-create-alert', 'success', 'E-posta başarıyla oluşturuldu.');
      getEmails();
      form.reset();
    } else {
      showAlert('email-create-alert', 'danger', data.message || 'E-posta oluşturulamadı.');
    }
  } catch {
    showAlert('email-create-alert', 'danger', 'E-posta oluşturulamadı.');
  }
};
document.getElementById('fill-email-btn').onclick = () => {
  const f = document.getElementById('email-create-form');
  f.subject.value = 'Örnek E-posta';
  f.body.value = 'Bu bir örnek e-posta içeriğidir.';
  f.assigned_to.value = '1';
  f.created_by.value = '2';
  f.due_date.value = new Date(Date.now() + 259200000).toISOString().slice(0,16);
  f.status.value = 'unread';
};

// USERS
async function getUsers() {
  try {
    const res = await fetch(`${API_BASE}/users`);
    const data = await res.json();
    renderTable('users-table', data);
    showAlert('users-alert', 'success', 'Kullanıcı listesi başarıyla yüklendi.');
  } catch (e) {
    showAlert('users-alert', 'danger', 'Kullanıcılar yüklenemedi.');
  }
} 