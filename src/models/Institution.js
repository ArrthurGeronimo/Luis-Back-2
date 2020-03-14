const mongoose = require('mongoose');

const InstitutionSchema = new mongoose.Schema({
    createdAt:{
		type: Date,
		default: Date.now
    },
    updateAt:{
		type: Date,
		default: Date.now
    },
    status:{
        type: Boolean,
        default: true
    },
    vinculoSocialMe:{
        doador:{
            type: Boolean,
        },
        fornecedor:{
            type: Boolean,
        },
    },
    dados:{
        nome: {
            type: String
        },
        descricao: {
            type: String
        },
        enquadramento: {
            type: String
        },
        cnpj: {
            type: String
        },
        razaoSocial: {
            type: String
        },
        registroMunicipal: {
            type: String
        },
        registroEstadual: {
            type: String
        },
        fone: {
            type: String
        },
        email: {
            type: String
        },
        site: {
            type: String
        },
        // Redes Sociais
    },
    sociosVinculados:{
        //PESSOAS VINCULADAS
    },
    programas: {
        // PROGRAMAS QUE PARTICIPA
        // SITUAÇÃO NO PROGRAMA
    },
    sistemas : {
        socialMe: {
            password: {
                type: String
            }
        }
    }
});

mongoose.model('Institution', InstitutionSchema);