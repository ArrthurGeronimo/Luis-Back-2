const express = require('express');
const routes = express.Router();
const withAuth = require('./middleware');

const AuthController = require('./controllers/AuthController');
routes.post('/checkToken', withAuth, AuthController.checkToken);
routes.post('/logar', AuthController.authenticate);

const PersonController = require('./controllers/PersonController');
routes.get('/persons', PersonController.index);
routes.get('/person/:id', PersonController.show);
routes.post('/person', PersonController.store);
routes.put('/person/:id', PersonController.update);
routes.delete('/person/:id', PersonController.destroy);
//Consult CPF
routes.get('/person_consult_cpf/:cpf', PersonController.consultCpf);
routes.put('/person_update_by_cpf/:cpf', PersonController.updateByCpf);
routes.get('/person_login/:cpf/:password', PersonController.login);

const InstitutionController = require('./controllers/InstitutionController');
routes.get('/institutions', InstitutionController.index);
routes.get('/institution/:id', InstitutionController.show);
routes.post('/institution', InstitutionController.store);
routes.put('/institution/:id', InstitutionController.update);
routes.delete('/institution/:id', InstitutionController.destroy);
//Consult CNPJ
routes.get('/institution_consult_cnpj/:cnpj', InstitutionController.consultCnpj);
routes.put('/institution_update_by_cnpj/:cnpj', InstitutionController.updateByCnpj);
routes.get('/institution_login/:cnpj/:password', InstitutionController.login);

module.exports = routes;