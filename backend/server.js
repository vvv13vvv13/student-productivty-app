// ...existing code...
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = __dirname + '/users.json';

function readUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}


// Înregistrare
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  let users = readUsers();
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  users.push({ username, password, tasks: [], activity: [] });
  writeUsers(users);
  res.json({ success: true });
});

// Obține taskurile unui user
app.get('/api/tasks', (req, res) => {
  const { username } = req.query;
  let users = readUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ tasks: user.tasks || [] });
});

// Salvează taskurile unui user
app.post('/api/tasks', (req, res) => {
  const { username, tasks } = req.body;
  let users = readUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.tasks = tasks;
  writeUsers(users);
  res.json({ success: true });
});

// Loghează activitatea unui user
app.post('/api/activity', (req, res) => {
  const { username, activity } = req.body;
  let users = readUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.activity = user.activity || [];
  user.activity.push(activity);
  writeUsers(users);
  res.json({ success: true });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  let users = readUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ success: true, username });
});

app.listen(4000, () => console.log('Backend pornit pe http://localhost:4000'));
