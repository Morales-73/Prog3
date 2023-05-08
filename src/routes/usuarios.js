const express = require('express')
const router = express.Router()
const { getUsuario, getUsuarioById, addUsuario, deleteUsuario, updateUsuario } = require('../controllers/usuarios')



router.get('/', getUsuario);

router.get('/:id', getUsuarioById)

router.post('/', addUsuario)

router.delete('/:id', deleteUsuario)

router.put('/:id', updateUsuario)



module.exports = router;
// export default router;