const Guest = require('../models/guest');
const User = require('../models/user');

async function index(request, response) {
    const { trip } = request.params;

    try {
        const guests = await Guest.findAll({
            where: { trip },
            include: [{ model: User }],
        });

        return response.status(200).json(guests);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function create(request, response) {
    const { trip, email } = request.body;

    try {
        const user = await User.findOne({
            where: { email },
        });

        if (user === null) {
            return response.status(404).json({
                message: 'Usuário não encontrado',
            });
        }

        const guest = await Guest.create({
            user: user.id,
            trip,
        });

        return response.status(200).json(guest);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function remove(request, response) {
    const { trip, user } = request.params;

    try {
        const guest = await Guest.destroy({
            where: { user, trip },
        });

        if (guest === 0) {
            return response.status(404).json({
                message: 'Participante não encontrado!',
            });
        }

        return response.status(200).json({
            data: guest,
            message: 'Participante apagado com sucesso!',
        });
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

module.exports = { index, create, remove };
