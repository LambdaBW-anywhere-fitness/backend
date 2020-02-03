const db = require('../database/dbConfig');

module.exports = {
  getClasses,
  getClassById
};

//getClasses --> get a list of all 'classes' --> from endpoint --> /api/classes
function getClasses() {
  return db('classes');
}

//getClassById --> gets a list a single 'class' by 'id' --> from endpoint --> /api/classes/:id
function getClassById(id) {
  return db('classes')
    .where('id', id)
    .first();
}
