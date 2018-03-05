exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('builds', function(table) {
      table.increments('uid').primary()
      table.string('name').notNullable()
      table.enu('os', ['Android', 'iOS']).notNullable()
      table.string('shortversion').notNullable()
      table.string('longversion').notNullable()
      table.timestamp('release_time')
      table.enu('status', ['On time', 'Delayed', 'No build']).notNullable(),
      table.boolean('latest')
      table.timestamps(false, true)
    }),
    knex.schema.raw('ALTER TABLE builds CHANGE COLUMN release_time release_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;'),
    knex.schema.raw('ALTER TABLE builds ALTER COLUMN release_time DROP DEFAULT;')
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('builds')
  ])
}
