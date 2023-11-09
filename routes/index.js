/**
 * Configura todas as rotas.
 */

const router = require('express').Router();
const auth = require('./auth');
const role = require('./role');


router.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
router.use('/api/v1.0/auth', auth);
router.use('/api/v1.0/role', role);

module.exports = router;