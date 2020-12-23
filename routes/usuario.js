/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();


router.get('/list', auth.verifyAdministrador, usuarioController.list);
router.post('/login', usuarioController.login);
router.post('/register', usuarioController.register);
router.get('/test', auth.verifyUsuario, function (req, res) {
    res.status(200).json("re")
  })
router.get('/dataTable', function (req, res){
    const result = [
        {
            id: 1,
            name: "jurgen orjuela",
            cost: 25000,
            email: "orjuela91@hotmail.com"
        }
    ];
    res.status(200).json(result);
});

module.exports = router;