const express = require('express');
const { StatusCodes } = require('http-status-codes');

const projects = require('./database');

const checkProjectIdExists = require('./middlewares/local/checkProjectIdExists');
const checkTitleNotNull = require('./middlewares/local/checkTitleNotNull');
const checkTaskExists = require('./middlewares/local/checkTaskExists');

const routes = express.Router();

//RF01 - POST /projects: A rota deve receber id e title dentro do corpo e cadastrar um novo projeto dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] }; Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com aspas duplas.
routes.post('/projects', checkTitleNotNull, (req, res) => {

  const { title } = req.body;

  const project = {
    id: projects.length + 1,
    title,
    tasks: []
  };
  
  projects.push(project);
  return res.status(StatusCodes.CREATED).json(project);
});

routes.get('/projects', (req, res) => {
  return res.json(projects);
});

routes.put('/projects/:id', checkProjectIdExists, checkTitleNotNull, (req, res) => {
  
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  
  project.title = title;
  
  return res.status(StatusCodes.OK).json(project);
});

routes.delete('/projects/:id', checkProjectIdExists, (req, res) => {
  const { id } = req.params;
  projects.splice(id, 1);
  return res.sendStatus(StatusCodes.NO_CONTENT);
});

routes.post('/projects/:id/tasks', checkProjectIdExists, checkTitleNotNull, checkTaskExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);
  project.tasks.push(title);
  return res.status(StatusCodes.CREATED).json(project);
});

module.exports = routes;