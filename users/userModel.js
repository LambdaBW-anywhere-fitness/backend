const db = require('../database/dbConfig');

module.exports = {
  //export helper functions to 'authRouter'
  getUsers,
  getUserById
};

//getUsers --> get all 'users'
function getUsers() {
  return db('users');
}

//getUserById --> get a single user by their 'id'
function getUserById(id) {
  return db('users')
    .where('id', id)
    .first();
}
