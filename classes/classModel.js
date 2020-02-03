const db = require('../database/dbConfig');

module.exports = {
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
  getClassByUserId
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


// update class

function updateClass(id, changes){
  return db('classes').where({id}).update(changes)
}


// delete a class

function deleteClass(id){
  return db('classes').where({id}).del()
}

function getClassByUserId(userid){
  return db('classes as c')
  .join('attendees as a', 'c.id', 'a.class_id')
  .join('users as u', 'u.id', 'a.user_id')
  .select('c.class_name', 'u.username', 'c.class_city', 'c.start_time', 'class_duration', 'u.id as user_id', 'class_date')
  .where('u.id', userid)
  
}