//LOGIN ROUTE
const handleLogin = (req, res, db, bcrypt) => {
    db.select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
        if (isValid) {
            db('users')
                .returning('*')
                .where('email', '=', req.body.email)
                .then(user => res.json(user[0]))
                .catch(() => res.status(400).json('invalid email or password'))
        } else {
            res.status(400).json('invalid email or password')
        }
    })
    .catch(() => res.status(400).json('invalid email or password'));
}

//REGISTER ROUTE
const handleRegister = (req, res, db, bcrypt) => {
    const hash = bcrypt.hashSync(req.body.password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: req.body.email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    username: req.body.username,
                    email: loginEmail[0],
                    entries: 0,
                    joined: new Date()
                })
                .then(user => res.json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(() => res.status(400).json('email already exist!'));
}

module.exports = {
    handleLogin: handleLogin,
    handleRegister: handleRegister
}