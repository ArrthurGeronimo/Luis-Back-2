const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('Person');

const secret = 'XXX';

module.exports = {
    async authenticate(req, res) {
        //res.json(req.body);
        const {login, senha} = req.body;
        //res.json(senha);
        User.findOne(
            {$or: [
                    {"dados.cpf": login},
                    {"dados.cnpj": login}
                ]},
            // {"dado.email": login},
            function (err, user) {
            if (err) {
                console.error(err);
                res.status(500)
                    .json({
                        error: 'Internal error please try again'
                    });
            } else if (!user) {
                res.status(401)
                    .json({
                        error: 'Incorrect email or password'
                    });
            } else {
                user.isCorrectPassword(senha, function (err, same) {
                    if (err) {
                        res.status(500)
                            .json({
                                status: "error",
                                code: "XXXX-XX-XX",
                                message: 'Internal error please try again'
                            });
                    } else if (!same) {
                        res.status(401)
                            .json({
                                error: 'Incorrect email or password'
                            });
                    } else {
                        // Issue token
                        const payload = {login};
                        const token = jwt.sign(payload, secret, {
                            // expiresIn: '20s'
                            expiresIn: '12h'
                        });

                        return res.cookie('token', token, {httpOnly: true}).status(200).json({
                            "status": "success",
                            "message": "Login efetuado",
                            "token":token,
                            //"user": "empresa",
                            "user": user
                        });
                        //res.json(token);
                    }
                });
            }
        });
    },
    async checkToken(req, res) {

        jwt.verify(req.body.token, secret, function(err, decoded) {
            if (err) {
                res.status(401).json('Unauthorized: Invalid token');
            } else {
                //console.log(decoded);
                User.findOne(
                    {$or: [
                            {"dados.cpf": decoded.login},
                            {"dados.cnpj": decoded.login}
                        ]},
                    // {"dado.email": login},
                    function (err, user) {
                        if (err) {
                            console.error(err);
                            res.status(500)
                                .json({
                                    error: 'Internal error please try again'
                                });
                        } else if (!user) {
                            res.status(401)
                                .json({
                                    error: 'Incorrect email or password'
                                });
                        } else {
                            return res.status(200).json({
                                "status": "success",
                                "message": "Token Valido",
                                "user": "empresa",
                                "empresa": user
                            });
                        }
                    });



            }
        });

        //res.sendStatus(200);
    }


};