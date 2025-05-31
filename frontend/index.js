import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());
app.use(express.static('dist'));

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});

// __dirnameの機能を疑似的に再現
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'app/dist', 'index.html'));
});
