const { v4: uuidv4 } = require('uuid');

const Cost = require('../models/cost');
const Debt = require('../models/debt');

async function index(request, response) {
    const { trip, user } = request.params;

    try {
        const cost = await Cost.findAll({
            where: { trip, user },
        });

        return response.status(200).json(cost);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function create(request, response) {
    const id = uuidv4();
    const {
        description,
        value,
        category,
        subcategory,
        dtcost,
        trip,
        user,
        participants,
    } = request.body;

    try {
        const cost = await Cost.create({
            id,
            description,
            value,
            category,
            subcategory,
            dtcost,
            trip,
            user,
        });

        if (participants.length > 0) {
            participants.forEach(async (participant) => {
                await Debt.create({
                    user: participant,
                    cost: cost.id,
                    value: cost.value / (participants.length + 1),
                    settled: false,
                });
            });
        }

        return response.status(200).json(cost);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function read(request, response) {
    const { id } = request.params;

    try {
        const cost = await Cost.findByPk(id);

        if (!cost) {
            return response.status(404).json({
                message: 'Custo não encontrado!',
            });
        }

        const debts = await Debt.findAll({
            where: { cost: cost.id },
        });

        return response.status(200).json({ cost: cost, debts: debts });
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function edit(request, response) {
    const { id } = request.params;
    const {
        description, value, category, subcategory, dtcost, participants,
    } = request.body;

    try {
        const cost = await Cost.findByPk(id);
        
        if (!cost) {
            return response.status(404).json({
                message: 'Custo não encontrado!',
            });
        }

        const debts = await Debt.findAll({
            where: { cost: id, settled: true },
        });

        if (debts.length > 0) {
            return response.status(406).json({
                debts,
                message: 'Custo possui dívidas já pagas e não pode ser alterado!',
            });
        }

        await Debt.destroy({ where: { cost: id }});

        const updatedCost = await Cost.update({
            description,
            value,
            category,
            subcategory,
            dtcost,
        }, {
            where: { id },
        });

        if (participants.length > 0) {
            participants.forEach(async (participant) => {
                await Debt.create({
                    user: participant,
                    cost: id,
                    value: value / (participants.length + 1),
                    settled: false,
                });
            });
        }

        return response.status(200).json({
            data: updatedCost[0],
            message: 'Custo atualizado com sucesso!',
        });
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function remove(request, response) {
    const { id } = request.params;

    try {
        const cost = await Cost.findByPk(id);
        
        if (!cost) {
            return response.status(404).json({
                message: 'Custo não encontrado!',
            });
        }

        const debts = await Debt.findAll({
            where: { cost: id, settled: true },
        });

        if (debts.length > 0) {
            return response.status(406).json({
                debts,
                message: 'Custo possui dívidas já pagas e não pode ser deletado!',
            })
        }

        await Debt.destroy({
            where: { cost: id },
        });
        const deletedCost = await Cost.destroy({
            where: { id },
        });
        
        return response.status(200).json({
            data: deletedCost,
            message: 'Custo apagado com sucesso!',
        });
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

module.exports = { index, create, read, edit, remove };
