const mongoose = require('mongoose');

const Person = mongoose.model('Person');

module.exports = {
	async index(req, res){
		const persons = await Person.find();
		return res.json(persons);
	},

	async show(req, res){
		const person = await Person.findById(req.params.id);
		return res.json(person);
	},

	async store(req, res){
		//const person = await Person.create(req.body);
		Person.create(req.body);
		return res.json({
			"status": "success",
			"message": "Pessoa Física cadastrada com sucesso"
		});
		//return res.json(person);
		//return res.json(req.body);
	},

	async update(req,res){
		const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
		return res.json(person);
	},

	async destroy(req, res){
		await Person.findByIdAndRemove(req.params.id);
		return res.json('Deleted');
	},

	//Consult CPF
	async consultCpf(req, res){
		const person = await Person.find({ 'dados.cpf' : (req.params.cpf) });
		//res.json(person);
		if (person.length == 0){
			//return res.json('CPF NÃO ENCONTRADO');
			return res.json(1);
		}else{
			if (person[0].sistemas.socialMe.password === null || person[0].sistemas.socialMe.password === undefined){
				//return res.json('CPF VÁLIDO E SEM SENHA');
				return res.json(2);
			}else{
				//return res.json('CPF VÁLIDO E COM SENHA');
				return res.json(3);
			}
	
		}
	},

	//Update By CPF
	async updateByCpf(req,res){
		const person = await Person.findOneAndUpdate({ 'dados.cpf' : (req.params.cpf) }, req.body, { new: true });
		return res.json(person);
	},

	//LOGIN
	async login(req, res){
		const person = await Person.find({ 'dados.cpf' : (req.params.cpf), 'sistemas.socialMe.password' : (req.params.password)  });

		if (person.length == 0){
			//return res.json('USUÁRIO NÃO ENCONTRADO');
			return res.json(1);
		}else{
			//return res.json('USUÁRIO ENCONTRADO');
			return res.json(person);
		}
	}

};