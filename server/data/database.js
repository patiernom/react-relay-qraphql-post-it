import crypto from 'crypto';
import low from 'lowdb';
import Memory from 'lowdb/adapters/Memory';

class User {
  constructor(id, firstName, lastName, username, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
  }
}

class Entry {
  constructor(id, userId, timestamp, text) {
    this.id = id;
    this.userId = userId;
    this.timestamp = timestamp;
    this.text = text;
  }
}

const db = low(new Memory());
const defaultUser = new User('1', 'Marco', 'Patierno', 'patiernom', 'marco_patienro@msn.com');
const defaultEntries = [
  new Entry('1', '1', 1513542244724, 'dsasda sdasd asdas'),
  new Entry('2', '1', 1513542245598, 'dsasda sdasd asdas'),
  new Entry('3', '1', 1513542246300, 'dsasda sdasd asdas')
];
/*
* Add feature in memory
*/

db
  .defaults({ entries: defaultEntries, users: [defaultUser] })
  .write();

const getUser = async (id) => {
  return db
    .get('users')
    .find(user => user.id === id)
    .value();
};

const addEntry = async (userId, text) => {
  return db.get('entries')
    .push({ userId, text })
    .last()
    .assign({
      id: crypto.randomBytes(10).toString('hex'),
      timestamp: Date.now()
    })
    .write();
};

const modifyEntry = async (id, text) => {
  return db.get('entries')
    .find(entry => entry.id === id)
    .assign({ text })
    .write();
};

const getEntry = async (id) => {
  return db.get('entries')
    .find(entry => entry.id === id)
    .value();
};

const removeEntry = async (id) => {
  return db.get('entries')
    .remove(entry => entry.id === id)
    .write();
};

const getEntries = async (userId) => {
  return db
    .get('entries')
    .filter(entry => entry.userId === userId)
    .sortBy('timestamp')
    .reverse()
    .value();
};

export {
  User,
  Entry,
  getUser,
  getEntry,
  addEntry,
  getEntries,
  removeEntry,
  modifyEntry
};
