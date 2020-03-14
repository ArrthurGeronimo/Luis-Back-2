const mongoose = require('mongoose');

const Institution = mongoose.model('Institution');

module.exports = {
	async index(req, res){
		const institutions = await Institution.find();
		return res.json(institutions);
	},

	async show(req, res){
		const institution = await Institution.findById(req.params.id);
		return res.json(institution);
	},

	async store(req, res){
		const institution = await Institution.create(req.body);
		return res.json(institution);
		//return res.json(req.body);
	},

	async update(req,res){
		const institution = await Institution.findByIdAndUpdate(req.params.id, req.body, { new: true });
		return res.json(institution);
	},

	async destroy(req, res){
		await Institution.findByIdAndRemove(req.params.id);
		return res.json('Deleted');
	},

	//Consult CNPJ
	async consultCnpj(req, res){
		const institution = await Institution.find({ 'dados.cnpj' : (req.params.cnpj) });

		if (institution.length == 0){
			//return res.json('CPF INVÁLIDO');
			return res.json(1);
		}else{
			if (institution[0].sistemas.socialMe.password > 0){
				//return res.json('CPF VÁLIDO E COM SENHA');
				return res.json(2);
			}else{
				//return res.json('CPF VÁLIDO E SEM SENHA');
				return res.json(3);
			}
	
		}
	},

	//Update By CNPJ
	async updateByCnpj(req,res){
		const institution = await Institution.findOneAndUpdate({ 'dados.cnpj' : (req.params.cnpj) }, req.body, { new: true });
		return res.json(institution);
	},

	//LOGIN
	async login(req, res){
		const institution = await Institution.find({ 'dados.cnpj' : (req.params.cnpj), 'sistemas.socialMe.password' : (req.params.password)  });

		if (institution.length == 0){
			//return res.json('USUÁRIO NÃO ENCONTRADO');
			return res.json(1);
		}else{
			//return res.json('USUÁRIO ENCONTRADO');
			return res.json(institution);
		}
	}

};