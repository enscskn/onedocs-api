require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const tasksRouter = require('./routes/tasks');
const documentsRouter = require('./routes/documents');
const emailsRouter = require('./routes/emails');
const usersRouter = require('./routes/users');

app.use('/api/tasks', tasksRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/emails', emailsRouter);
app.use('/api/users', usersRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      api: 'healthy',
      database: 'unknown' // Supabase entegrasyonunda güncellenecek
    }
  });
});

// Info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    application: 'OneDocs API',
    version: '1.0.0',
    description: 'Node.js API with Supabase integration',
    endpoints: {
      tasks: '/api/tasks',
      documents: '/api/documents',
      emails: '/api/emails',
      health: '/api/health'
    }
  });
});

// Ana endpoint
app.get('/api', (req, res) => {
  res.send('OneDocs API\'ye hoş geldiniz!');
});

app.listen(PORT, () => {
  console.log(`OneDocs API ${PORT} portunda çalışıyor...`);
}); 