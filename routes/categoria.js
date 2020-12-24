const routerx = require('express-promise-router');
const categoriaController = require('../controllers/CategoriaController');
const auth = require('../middlewares/auth');

const router = routerx();


router.get('/list', categoriaController.list);

router.post('/add',auth.verifyAdministrador, categoriaController.add);
router.post('/update', auth.verifyAdministrador, categoriaController.update);
router.post('/activate', auth.verifyAdministrador, categoriaController.activate);
router.post('/deactivate', auth.verifyAdministrador, categoriaController.deactivate);



module.exports = router;