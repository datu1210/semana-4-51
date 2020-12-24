const { Articulo } = require('../models/');
const { Categoria } = require('../models/');


module.exports = {

    list: async (req, res, next) => {

        try {
            let result = [];
            const re = await Articulo.findAll();
            const cat = await Categoria.findAll();

            re.map( (articulo) => {
                cat.map( (categoria) => {
                    if(articulo.categoriaId == categoria.id){
                        
                        let objAux = {
                            id: articulo.id,
                            nombre: articulo.nombre,
                            descripcion: articulo.descripcion,
                            estado: articulo.estado,
                            url: articulo.url,
                            categoriaId: articulo.categoriaId,
                            nombreCategoria: categoria.nombre
                        }

                        result.push(objAux);
                    }
                });
            });
           
            res.status(200).json(result);
            
        } catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)
        }

    },
    add: async (req, res, next) =>  {

        try {
            
            const re = await Articulo.create(req.body)
            res.status(200).json(re)

        } catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)
        }

    },
    update: async (req, res, next) => {

        try {

            const re = await Articulo.update({nombre: req.body.nombre, description: req.body.description, codigo: req.body.codigo , categoriaId: req.body.categoriaId},{where:{id: req.body.id}})
            res.status(200).json(re)
            
        } catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)
        }

    },
    activate: async (req, res, next) => {

        try {

            const re = await Articulo.update({estado:1},{where:{id: req.body.id}})
            res.status(200).json(re)
            
        } catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)
        }

    },
    deactivate: async (req, res, next) => {

        try {

            const re = await Articulo.update({estado:0},{where:{id: req.body.id}})
            res.status(200).json(re)    
            
        } catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)
        }

    }

    
}


