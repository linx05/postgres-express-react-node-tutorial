module.exports = (app) => {
	app.get('api', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
	}));
	app.use('/api/todos/:todoId/items', require('./todoItems'));
	app.use('/api/todos', require('./todos'));
};