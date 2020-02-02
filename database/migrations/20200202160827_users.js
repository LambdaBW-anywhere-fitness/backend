exports.up = function(knex) {
  // for seeds, make sure this order matches
  // 'clients' table
  return (
    knex.schema
      .createTable(
        'users',
        (tbl = () => {
          tbl.increments();

          tbl
            .string('username', 255)
            .notNullable()
            .unique();

          tbl
            .string('email', 255)
            .notNullable()
            .unique();

          tbl.string('password', 255).notNullable();

          tbl.string('role').notNullable();

          tbl.timestamps(true, true);
        })
      )
      // 'classes' table
      .createTable('classes', tbl => {
        tbl.increments();

        tbl.string('class_name', 255).notNullable();

        tbl.string('class_duration', 255).notNullable();

        tbl.string('class_intensity_level', 25).notNullable();

        tbl.string('class_city', 75).notNullable();

        tbl.date('class_date');

        tbl.datetime('class_timezone');
      })
      //attendees table
      .createTable('attendees', tbl => {
        tbl.increments();

        tbl.string('attendee_name', 255);
        tbl.i;
      })

      // 'client_class' table
      .createTable('users_classes', tbl => {
        tbl.increments();
        tbl
          .integer('users_id')
          .references('id')
          .inTable('users')
          .unsigned()
          .notNullable()
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        tbl
          .integer('classes_id')
          .references('id')
          .inTable('classes')
          .unsigned()
          .notNullable()
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
  );
};

exports.down = function(knex) {
  //make sure to reverser order from above
  return knex.schema
    .dropTableIfExists('client_class')
    .dropTableIfExists('attendees')
    .dropTableIfExists('classes')
    .dropTableIfExists('clients');
};
