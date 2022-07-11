const { v4: uuidv4 } = require('uuid');

const Cost = require('../models/cost');

async function index(request, response) {

    const { trip, user } = request.params;

    try {
        const cost = await Cost.findAll({
            where: { trip, user },
        });

        return response.status(200).json(cost);
    } catch (error) {
        return response.status(500).json(
            message = error,
        );
    }
};

async function create(request, response) {

    const id = uuidv4();
    const { description, value, category, dtcost, trip, user } = request.body;

    try {
        const cost = await Cost.create({
            id,
            description,
            value,
            category,
            dtcost,
            trip,
            user,
        });

        return response.status(200).json(cost);
    } catch (error) {
        return response.status(500).json(
            message = error,
        );
    }
};

async function read(request, response) {

    const { id } = request.params;

    try {
        const cost = await Cost.findByPk(id);

        if (!cost) {
            return response.status(404).json({
                message: 'Viagem não encontrada!',
            });
        }
        return response.status(200).json(cost);

    } catch (error) {
        return response.status(500).json(
            message = error,
        );
    }
};

async function edit(request, response) {

    const { id } = request.params;
    const { description, value, dtcost } = request.body;

    try {
        const cost = await Cost.update({
            description,
            value,
            dtcost,
        }, {
            where: { id },
        });
        if (cost[0] === 0) {
            return response.status(404).json({
                message: 'Viagem não encontrada!',
            });
        }
        return response.status(200).json({
            data: cost[0],
            message: 'Viagem atualizada com sucesso!',
        });

    } catch (error) {
        return response.status(500).json(
            message = error,
        )
    }
};

async function remove(request, response) {

    const { id } = request.params;

    try {
        const cost = await Cost.destroy({
            where: { id },
        });
        if (cost === 0) {
            return response.status(404).json({
                message: 'Viagem não encontrada!',
            });
        }
        return response.status(200).json({
            data: cost[0],
            message: 'Viagem apagada com sucesso!',
        });

    } catch (error) {
        return response.status(500).json(
            message = error,
        )
    }
};

module.exports = {
    index,
    create,
    read,
    edit,
    remove,
};
