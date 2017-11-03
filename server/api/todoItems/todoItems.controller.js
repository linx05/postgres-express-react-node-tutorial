const TodoItem = require('../../models').TodoItem;

const create = (req, res) => {
	console.log(req.params);
	return TodoItem.create({
		content: req.body.content,
		todoId: req.params.todoId
	})
	.then(todoItem => res.status(201).send(todoItem))
	.catch(err => errorHandler(err, res));
};

const update = (req, res) => {
	return TodoItem
	.find({
		where: {
			id: req.params.todoItemId,
			todoId: req.params.todoId,
		},
	})
	.then(todoItem => {
		if (!todoItem) {
			return res.status(404).send({
				message: 'TodoItem Not Found',
			});
		}

		return todoItem
		.update({
			content: req.body.content || todoItem.content,
			complete: req.body.complete || todoItem.complete,
		})
	})
	.then(updatedTodoItem => res.status(200).send(updatedTodoItem))
	.catch(error => res.status(400).send(error));
};

const destroy = (req, res) => {
	return TodoItem
	.find({
		where: {
			id: req.params.todoItemId,
			todoId: req.params.todoId,
		},
	})
	.then(todoItem => {
		if (!todoItem) {
			return res.status(404).send({
				message: 'TodoItem Not Found',
			});
		}
		return todoItem
		.destroy()
	})
	.then(() => res.status(204).send())
	.catch(error => res.status(400).send(error));
};

const errorHandler = (err, res, code = 400) => {
	console.log('Error: ', JSON.stringify(err, null, 2));
	return res.status(code).send(JSON.stringify(err, null, 2));
};

module.exports = {
	create,
	update,
	destroy
};