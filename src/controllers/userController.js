const { v4: uuidv4 } = require('uuid');

const mailForgotPassword = require('../mails/forgotPassword');
const mailConfirm = require('../mails/mailConfirm');

const User = require('../models/user');

const sendEmail = require('../services/mailService');

async function index(request, response) {
    try {
        const users = await User.findAll();

        return response.status(200).json(users);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function register(request, response) {
    const id = uuidv4();
    const { name, email, password } = request.body;

    try {
        const user = await User.create({
            id, name, email, password, validated: false,
        });

        mailOptions = {
            to: user.email,
            subject: 'Confirmação de email - Sobre 12',
            text: "Utilize uma plataforma que suporte email HTML",
            html: mailConfirm(id),
        };

        //sendEmail(mailOptions);

        return response.status(200).json({
            message: 'Confirme a criação da conta pelo email!',
        });
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function emailValidation(request, response) {
    const { email } = request.body;

    try {
        const rowsUpdated = await User.update({
            validated: true,
        }, {
            where: { email },
        });

        if (rowsUpdated[0] === 0) {
            return response.status(404).json({
                message: 'Usuário não encontrado!',
            });
        }
        
        return response.status(200).json({
            data: rowsUpdated[0],
            message: 'Usuário validado com sucesso!',
        });
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function login(request, response) {
    const { email, password } = request.body;

    try {
        const user = await User.findOne({
            where: { email, password },
        });

        if (!user) {
            return response.status(404).json({
                message: 'Usuário não encontrado!',
            });
        }

        if(!user.validated) {
            return response.status(401).json({
                message: 'Email não validado!',
            });
        }
        
        return response.status(200).json(user);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function forgotPassword(request, response) {
    const { email } = request.body;

    try {
        const user = await User.findOne({
            attributes: [ 'password' ],
            where: { email },
        });

        if (!user) {
            return response.status(404).json({
                message: 'Usuário não encontrado!',
            });
        }

        mailOptions = {
            to: user.email,
            subject: 'Recuperação de senha',
            text: "Utilize uma plataforma que suporte email HTML",
            html: mailForgotPassword(user.password),
        };

        // sendEmail(mailOptions);

        return response.status(200).json({
            message: 'Senha enviada para o email solicitado!',
        });
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function edit(request, response) {
    const { id } = request.params;
    const { name, email, password } = request.body;

    try {
        const rowsUpdated = await User.update({
            name, email, password,
        }, {
            where: { id },
        });

        if (rowsUpdated[0] === 0) {
            return response.status(404).json({
                message: 'Usuário não encontrado!',
            });
        }

        return response.status(200).json({
            data: rowsUpdated[0],
            message: 'Usuário atualizado com sucesso!',
        });
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function remove(request, response) {
    const { id } = request.params;

    try {
        const rowsUpdated = await User.destroy({
            where: { id },
        });

        if (rowsUpdated === 0) {
            return response.status(404).json({
                message: 'Usuário não encontrado!',
            });
        }
        
        return response.status(200).json({
            data: rowsUpdated[0],
            message: 'Usuário apagado com sucesso!',
        });
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

module.exports = {
    index, register, emailValidation, login, forgotPassword, edit, remove,
};
