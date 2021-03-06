/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();


router.get('/list', auth.verifyAdministrador, usuarioController.list);
router.post('/login', usuarioController.login);
router.post('/register', usuarioController.register);

module.exports = router;