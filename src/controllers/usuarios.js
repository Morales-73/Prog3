
const { sequelize, Sequelize, user: User } = require('../../models');



const getUsuario = async (req, res) => {
    const lista = await User.findAll({})
    return res.json({data:lista})
}


const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    const usuario = await User.findByPk(id)
    return res.json(usuario)
}



const addUsuario = async (req, res) => {
    let body = req.body; 

    let verificado = body.name && body.pass && body.email;

    if (!verificado){
        return res.status(400).json({info: 'parametro incorrectos'})
    }

    const usuario = await User.create(body)

    return res.status(201).json({
        data: usuario
    })
}

const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await User.findByPk(id)

    try {
        if (!usuario){
            return res.status(404).json({mensaje: 'Usuario no encontrado'})
        }
        await usuario.destroy()
        res.json({mensaje: 'Usuario eliminado'})

    } catch (error){
        res.status(500).json({mensaje: 'Error al eliminar usuario'})
    }
   
}

const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await User.findByPk(id);

    try {
        if (!usuario){
            return res.status(404).json({mensaje: 'Usuario no encontrado'})
        }
        usuario.name = req.body.name
        usuario.email = req.email
        usuario.pass = req.body.pass
        usuario.save()
        res.json({mensaje: 'Usuario actualizado'})

    } catch (error){
        return res.status(500).json({mensaje: 'Error al actualizar usuario'})
    }
}


module.exports = {
    getUsuario,
    getUsuarioById,
    addUsuario,
    deleteUsuario,
    updateUsuario
}