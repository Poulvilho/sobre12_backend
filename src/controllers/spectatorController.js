const Spectator = require('../models/spectator');
const User = require('../models/user');

async function index(request, response) {
    const { trip, spectated } = request.body;

    try {
        const spectators = await Spectator.findAll({
            where: { trip, spectated },
            include: [{
                model: User, as: 'spectator',
            }],
        });

        return response.status(200).json(spectators);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function create(request, response) {
    const { email, trip, spectated } = request.body;

    try {
        const userSpec = await User.findOne({
            where: { email },
        });

        if (userSpec === null) {
            return response.status(404).json({
                message: 'Usuário não encontrado',
            });
        }

        const spectator = await Spectator.create({
            user: userSpec.id,
            trip,
            spectated,
        });

        return response.status(200).json(spectator);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function remove(request, response) {
    const { trip, spectated, user } = request.params;

    try {
        const spectator = await Spectator.destroy({
            where: { user, trip, spectated },
        });

        if (spectator === 0) {
            return response.status(404).json({
                message: 'Espectador não encontrado!',
            });
        }

        return response.status(200).json({
            data: spectator,
            message: 'Espectador apagado com sucesso!',
        });
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

module.exports = { index, create, remove };
