# Exercice 1 : Serveur HTTP de Base

> Objectif : Comprendre les bases de la création d'un serveur HTTP avec Node.js.

---

## Instructions :

* Installez Node.js sur votre machine si ce n'est pas déjà fait.
* Créez un fichier `server.js`.
* Utilisez le module http pour créer un serveur qui écoute sur le port 3000.
* Lorsque le serveur reçoit une requête, répondez avec un message "Hello, World!".

---

### Code :

<details>

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Serveur en cours d\'exécution sur http://127.0.0.1:3000/');
});
```
</details>

---

# Exercice 2 : Gestion des Routes

> Objectif : Apprendre à gérer différentes routes dans une application Node.js.

---

## Instructions :

* Reprenez le fichier server.js de l'exercice précédent.
* Modifiez le serveur pour gérer trois routes : /, /about, et /contact.
* Répondez avec un message différent pour chaque route.

---

### Code :

<details>

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  if (req.url === '/') {
    res.end('Bienvenue à la page d\'accueil!\n');
  } else if (req.url === '/about') {
    res.end('À propos de nous.\n');
  } else if (req.url === '/contact') {
    res.end('Contactez-nous à contact@example.com\n');
  } else {
    res.statusCode = 404;
    res.end('Page non trouvée.\n');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Serveur en cours d\'exécution sur http://127.0.0.1:3000/');
});

```

</details>

---

# Exercice 3 : Utilisation d'Express

> Objectif : Découvrir le framework Express pour simplifier la création d'applications web avec Node.js.

---

## Instructions :

* Installez Express (npm install express).
* Créez un nouveau fichier `app.js`.
* Utilisez Express pour créer un serveur qui gère les mêmes routes que dans l'exercice 2.

---

### Code :

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bienvenue à la page d\'accueil!');
});

app.get('/about', (req, res) => {
  res.send('À propos de nous.');
});

app.get('/contact', (req, res) => {
  res.send('Contactez-nous à contact@example.com');
});

app.use((req, res) => {
  res.status(404).send('Page non trouvée.');
});

app.listen(3000, () => {
  console.log('Serveur en cours d\'exécution sur http://localhost:3000/');
});

```

---

# Exercice 4 : Manipulation de Données avec une API REST

> Objectif : Créer une API REST simple pour manipuler des données en mémoire.

---

## Instructions :

* Utilisez Express pour créer une API REST qui gère une liste de tâches.
* Implémentez les routes suivantes :
* GET `/tasks` : Retourne toutes les tâches.
* POST `/tasks` : Ajoute une nouvelle tâche.
* PUT `/tasks/:id` : Modifie une tâche existante.
* DELETE `/tasks/:id` : Supprime une tâche.

---

### Code :

<details>

```js
const express = require('express');
const app = express();
app.use(express.json());

let tasks = [
  { id: 1, title: 'Tâche 1' },
  { id: 2, title: 'Tâche 2' }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = { id: tasks.length + 1, title: req.body.title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Tâche non trouvée.');
  
  task.title = req.body.title;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send('Tâche non trouvée.');
  
  const deletedTask = tasks.splice(taskIndex, 1);
  res.json(deletedTask);
});

app.listen(3000, () => {
  console.log('API en cours d\'exécution sur http://localhost:3000/');
});

```
</details>

---

# Exercice 5 : Interaction avec une Base de Données

> Objectif : Apprendre à interagir avec une base de données MongoDB en utilisant Mongoose.

---

## Instructions :

* Installez MongoDB et Mongoose (npm install mongoose).
* Créez un fichier database.js pour gérer la connexion à la base de données.
* Modifiez l'exercice 4 pour sauvegarder les tâches dans une base de données MongoDB au lieu de les stocker en mémoire.

---

### Code :

<details>

```js
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tasksdb', { useNewUrlParser: true, useUnifiedTopology: true });

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true }
});

const Task = mongoose.model('Task', TaskSchema);

const app = express();
app.use(express.json());

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task({ title: req.body.title });
  await newTask.save();
  res.status(201).json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true });
  if (!task) return res.status(404).send('Tâche non trouvée.');
  res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).send('Tâche non trouvée.');
  res.json(task);
});

app.listen(3000, () => {
  console.log('API en cours d\'exécution sur http://localhost:3000/');
});

```
</details>

---

# Exercice 6 : Authentification Utilisateur avec JWT
> Objectif : Apprendre à implémenter l'authentification des utilisateurs en utilisant JSON Web Tokens (JWT).

---

## Instructions :

* Installez les dépendances nécessaires : `npm install express mongoose bcryptjs jsonwebtoken`.
* Créez un modèle utilisateur avec `Mongoose`.
* Implémentez des routes pour l'inscription (`/register`) et la connexion (`/login`).
* Utilisez `bcryptjs` pour hacher les mots de passe et jsonwebtoken pour générer des tokens JWT.
* Créez une route protégée (`/protected`) qui nécessite un token JWT valide pour l'accès.

---

### Code :

<details>

```js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/authdb', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ error: 'Mot de passe incorrect' });

  const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
  res.json({ token });
});

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Accès refusé' });

  try {
    const verified = jwt.verify(token, 'secretkey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token invalide' });
  }
};

app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'Accès autorisé à la route protégée' });
});

app.listen(3000, () => {
  console.log('Serveur en cours d\'exécution sur http://localhost:3000/');
});


```
</details>

---