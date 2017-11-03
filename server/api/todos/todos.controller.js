const Todo = require('../../models').Todo;
const TodoItem = require('../../models').TodoItem;

const index = (req, res) => {
	return Todo.findAll({
		include: [{
			model: TodoItem,
			as: 'TodoItems'
		}]
	})
	.then(todos => res.status(200).send(todos))
	.catch(err => errorHandler(err, res));
};

const get = (req, res) => {
	return Todo.findById(req.params.todoId, {
		include: [{
			model: TodoItem,
			as: 'TodoItems',
		}]
	})
	.then(todo => {
		if (!todo) {
			return errorHandler({message: 'Todo Not Found'}, res, 404);
		}
		return res.status(200).send(todo);
	})
};

const create = (req, res) => {
	return Todo.create({
		title: req.body.title,
	})
	.then(todo => res.status(201).send(todo))
	.catch(err => errorHandler(err, res));
};

const destroy = (req, res) => {
	return Todo.findById(req.params.todoId)
	.then(todo => {
		if (!todo) {
			return errorHandler({message: 'Todo Not Found'}, res, 404);
		}
		return todo.destroy()
	})
	.then(() => res.status(204).send())
	.catch(err => errorHandler(err, res));
};

const update = (req, res) => {
	let savedTodo;
	return Todo.findById(req.params.todoId, {
		include: [{
			model: TodoItem,
			as: 'TodoItems'
		}]
	})
	.then(todo => {
		if (!todo) {
			return errorHandler({message: 'Todo Not Found'}, res, 404);
		}
		savedTodo = todo;
		return todo.update({
			title: req.body.title || todo.title
		})
	})
	.then(() => res.status(200).send(savedTodo))
	.catch(err => errorHandler(err));
};

const errorHandler = (err, res, code = 400) => {
	console.log('Error: ', JSON.stringify(err, null, 2));
	return res.status(code).send(JSON.stringify(err, null, 2));
};

module.exports = {
	create,
	index,
	get,
	destroy,
	update,
};