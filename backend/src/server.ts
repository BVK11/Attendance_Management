import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import './db.js';
import { router } from './routes.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use('/api', router);

app.get('/', (_req, res) => {
  res.json({ status: 'Attendance Management backend', version: '1.0.0' });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
