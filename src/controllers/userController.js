const { v4: uuidv4 } = require('uuid');

const User = require('../models/user')

async function register(request, response) {

    const id = uuidv4();
    const { name, email, password } = request.body;

    try {
        const user = await User.create({
            id,
            name,
            email,
            password,
        });

        return response.status(200).json(
            user
        );
    } catch (error) {
        return response.status(500).json(
            message = error
        );
    }
};

async function login(request, response) {

    const { email, password } = request.body;

    try {
        const user = await User.findOne({
            where: {
                email,
                password,
            }
        });

        if (!user) {
            return response.status(404).json({
                message: 'Usuário não encontrado!'
            });
        }
        return response.status(200).json(user);

    } catch (error) {
        return response.status(500).json(
            message = error
        );
    }
};

async function edit(request, response) {

    const { id } = request.params;
    const { name, email, password } = request.body;

    try {
        const user = await User.update({
            name,
            email,
            password,
        }, {
            where: { id }
        });
        if (user[0] === 0) {
            return response.status(404).json({
                message: 'Usuário não encontrado!'
            });
        }
        return response.status(200).json({
            data: user[0],
            message: 'Usuário atualizado com sucesso!'
        });

    } catch (error) {
        return response.status(500).json(
            message = error
        )
    }
};

async function remove(request, response) {

    const { id } = request.params;

    try {
        const user = await User.destroy({
            where: { id }
        });
        if (user === 0) {
            return response.status(404).json({
                message: 'Usuário não encontrado!'
            });
        }
        return response.status(200).json({
            data: user[0],
            message: 'Usuário apagado com sucesso!'
        });

    } catch (error) {
        return response.status(500).json(
            message = error
        )
    }
};

module.exports = {
    login,
    register,
    edit,
    remove,
};
