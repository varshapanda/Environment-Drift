require('dotenv').config();
const express = require('express');
const healthRouter = require('./routes/health');

const app = express();

// Port is hardcoded here — should read from process.env.PORT
const port = 3000;

app.use(express.json());

app.use('/health', healthRouter);

app.get('/auth-check', (req, res) => {
  const secret = process.env.JWT_SECRET;
  if (secret && secret.length > 0) {
    return res.json({ secret_configured: true });
  }
  return res.json({ secret_configured: false });
});

// No startup validation — the server starts even if DATABASE_URL or JWT_SECRET are missing
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
