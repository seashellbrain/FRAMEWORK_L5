const Router = require('../framework/router'); 
const router = new Router();

const soldierController = require('../controllers/soldierController');
const unitController = require('../controllers/unitController');


router.get('/soldiers', soldierController.getAll);
router.get('/soldiers/:id', soldierController.getById);
router.post('/soldiers', soldierController.create);
router.put('/soldiers/:id', soldierController.update);
router.patch('/soldiers/:id', soldierController.patch);
router.delete('/soldiers/:id', soldierController.remove);

router.get('/units', unitController.getAll);
router.get('/units/:id', unitController.getById);
router.post('/units', unitController.create);
router.put('/units/:id', unitController.update);
router.patch('/units/:id', unitController.patch);
router.delete('/units/:id', unitController.remove);

module.exports = router;
