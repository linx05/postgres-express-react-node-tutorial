const router = require('express').Router();
const controller = require('./todos.controller');

router.get('/:todoId', controller.get);
router.get('/', controller.index);
router.post('/', controller.create);
router.post('/:todoId',controller.update);
router.delete('/:todoId', controller.destroy);

module.exports = router;