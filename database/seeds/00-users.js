exports.seed = function(knex) {
  // Template for inserting seed entries --> I just removed the intitial return function
  return knex('table_name').insert([
    { id: 1, colName: 'rowValue1' }, //change these to whatever matches our schema
    { id: 2, colName: 'rowValue2' },
    { id: 3, colName: 'rowValue3' }
  ]);
};
