const { v4: uuidv4 } = require('uuid');

const User = require('../models/user')

async function register(request, response) {

    const id = uuidv4();
    const { email, password } = request.body;

    try {
        const user = await User.create({
            id,
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
            email,
            password,
        })

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
    const { email, password } = request.body;

    try {
        const user = User.update({
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
        return response.status(200).json(user);

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
};
