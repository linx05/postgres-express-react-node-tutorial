const router = require('express').Router({ mergeParams : true });
const controller = require('./todoItems.controller');

router.post('/', controller.create);
router.post('/:todoItemId', controller.update);
router.delete('/:todoItemId', controller.destroy);

module.exports = router;