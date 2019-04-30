const db = require('../data/db');

module.exports = {
  get,
  insert,
  getById,
  update,
  deleteItem,
  find,
  withUserId
};

function find() {
  return db('rounds');
}

function withUserId(queryBuilder, user_id) {
  return queryBuilder
    .select('rounds.*')
    .leftJoin('games', 'games.id', '=', 'rounds.game_id')
    .where('games.user_id', user_id);
}

async function get() {
  const rounds = await db('rounds');
  return rounds;
}

async function getById(id) {
  const round = await db('rounds')
    .where({ id })
    .first();
  return round;
}

async function insert(round) {
  return await db('rounds')
    .insert(round, 'id')
    .then(ids => getById(ids[0]));
}

async function update(id, changes) {
  return await db('rounds')
    .where({ id })
    .update(changes)
    .then(() => getById(id));
}

async function deleteItem(id) {
  return await db('rounds')
    .where({ id })
    .del();
}
