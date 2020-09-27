//update entries
const handleEntries = (req, res, db) => {
    db('users')
    .where('id', '=', req.body.id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(() => res.status(400).json('entries update failed'))
}

module.exports = {
    handleEntries
};