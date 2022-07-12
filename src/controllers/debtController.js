const { Sequelize } = require('sequelize');

const Cost = require('../models/cost');
const Debt = require('../models/debt');

async function index(request, response) {

    const { trip, user } = request.params;

    try {
        const costs = await Cost.findAll({ where: { trip }});
        const debt = await Debt.findAll({
            where: Sequelize.and(
                { user },
                { cost: costs.map(({id}) => id) },
            ),
        });

        return response.status(200).json(debt);
    } catch (error) {
        return response.status(500).json(
            message = error,
        );
    }
};

async function read(request, response) {

    const { cost, user } = request.params;

    try {
        const debt = await Debt.findOne({ where: { cost, user } });

        return response.status(200).json(debt);
    } catch (error) {
        return response.status(500).json(
            message = error,
        );
    }
};

async function edit(request, response) {

    const { cost, user } = request.params;
    const { value } = request.params;

    try {
        const debt = await Debt.update(
            { value },
            { where: { cost, user } },
        );
        if (debt[0] === 0) {
            return response.status(404).json({
                message: 'Dívida não encontrada!',
            });
        }
        return response.status(200).json({
            data: debt[0],
            message: 'Dívida atualizada com sucesso!',
        });
    } catch (error) {
        return response.status(500).json(
            message = error,
        );
    }
};

async function payDebt(request, response) {

    const { cost, user } = request.params;

    try {
        const debt = await Debt.update(
            { settled: true },
            { where: { cost, user } },
        );
        if (debt[0] === 0) {
            return response.status(404).json({
                message: 'Dívida não encontrada!',
            });
        }
        return response.status(200).json({
            data: debt[0],
            message: 'Dívida atualizada com sucesso!',
        });
    } catch (error) {
        return response.status(500).json(
            message = error,
        );
    }
};

async function remove(request, response) {

    const { cost, user } = request.params;

    try {
        const debt = await Debt.destroy({ where: { cost, user } });
        if (debt[0] === 0) {
            return response.status(404).json({
                message: 'Dívida não encontrada!',
            });
        }
        return response.status(200).json({
            data: debt[0],
            message: 'Dívida apagada com sucesso!',
        });
    } catch (error) {
        return response.status(500).json(
            message = error,
        );
    }
};

module.exports = { index, read, edit, payDebt, remove };
