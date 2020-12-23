const { Usuario } = require('../models/');
const bcrypt = require('bcryptjs');
const servToken = require('../services/token');
const { Op } = require("sequelize");


module.exports = {

    list: async (req, res, next) => {
        try {

            const re = await Usuario.findAll({
                where:{
                    rol:{
                        [Op.ne]:"Administrador"
                    }
                }
            })
            res.status(200).json(re)
            
        } catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)
        }
    },

    register : async (req, res, next) => {
        try {

            req.body.password = bcrypt.hashSync(req.body.password, 20);
            const re = await Usuario.create(req.body)
            res.status(200).json(re)
            
        } catch (error) {
            res.status(500).json({ 'error' : 'Oops paso algo' })
            next(error)
            
        }
       

    },

    login : async (req, res, next) => {

        try {
            const user = await Usuario.findOne({ where: { email: req.body.email } })
            if (user) {
                // Evaluar contraseña
                const contrasenhaValida = bcrypt.compareSync(req.body.password, user.password)
                if (contrasenhaValida) {
                    const token = await servToken.encode(user.id, user.rol)
                    let userReturn = {
                        rol: "",
                        nombre: "",
                        email: "",
                    }
                    
                    userReturn.rol = user.rol;
                    userReturn.nombre = user.nombre;
                    userReturn.email = user.email;

                    res.status(200).send({
                        auth: true,
                        tokenReturn: token,
                        user: userReturn,
                    })

                } else {
                    res.status(401).send({ auth: false, tokenReturn: null, reason: 'Invalid Password!' })
                }

            } else {
                res.status(404).send('Usuario no existe')
            }

        } catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)
        }


    }

}


