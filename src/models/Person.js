const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const rodadasDeSalt = 10;

const PersonSchema = new mongoose.Schema({
    createdAt:{
		type: Date,
		default: Date.now
    },
    updateAt:{
		type: Date,
		default: Date.now
	},
    dados:{
        nome: {
            type: String
        },
        nomeSocial: {
            type: String
        },
        sexo: {
            type: String
        },
        estadoCivil: {
            type: String
        },
        rg: {
            type: String
        },
        cpf: {
            type: String
        },
        cns: {
            type: String
        },
        pis: {
            type: String
        },
        escolaridade: {
            type: String
        },
        profissao: {
            type: String
        },
        telefoneFixo: {
            type: String
        },
        celular: {
            type: String
        },
        email: {
            type: String
        },
        pais: {
            type: String
        },
        estado: {
            type: String
        },
        cidade: {
            type: String
        },
        nascimento: {
            data: {
                type: String
            },
            nacionalidade: {
                type: String,
            },
            pais: {
                type: String
            },
            estado: {
                type: String
            },
            cidade: {
                type: String
            },
        },
        falecimento: {
            data: {
                type: String
            },
            pais: {
                type: String
            },
            estado: {
                type: String
            },
            cidade: {
                type: String
            },
            causa: {
                type: String
            }
        }    
    },
    beneficiaria: {
        status:{
            type: Boolean
        }
    },
    doadora: {
        status:{
            type: Boolean
        }
    },
    fornecedora: {
        status:{
            type: Boolean
        }
    },
    situacao: {
        // Gestante
        // Cancer
    },
    relacionamento: {
        // RELACIONAMENTOS
    },
    programas: {
        // PROGRAMAS QUE PARTICIPA
        // SITUAÇÃO NO PROGRAMA
    },
    atividades: {
        // Gatilho Atividade_has_Pessoas
    },
    sistemas : {
        socialMe: {
            password: {
                type: String
            }
        }
        //NomeSistema:{
            //idCadastro
            //idUsuario
        //}
    },
    maisInformacoes: {
        type: String
    }
});

PersonSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('sistemas.socialMe.password')) {
        const person = this;
        bcrypt.hash(this.sistemas.socialMe.password, rodadasDeSalt, function (err, senhaCriptografada) {
            if (err) {
                next(err);
            } else {
                person.sistemas.socialMe.password = senhaCriptografada;
                next();
            }
        });
    } else {
        next();
    }
});

//isCorrectPassword
PersonSchema.methods.isCorrectPassword = function (senha, callback) {
    bcrypt.compare(senha, this.sistemas.socialMe.password, function (err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
};

const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;