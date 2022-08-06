const Cost = require('../models/cost');
const Debt = require('../models/debt');

async function myDebts(request, response) {
    const { trip, user } = request.params;

    try {
        const costs = await Cost.findAll({ where: { trip }});
        const debts = await Debt.findAll({
            where: { user, cost: costs.map(({id}) => id) },
        });

        return response.status(200).json(debts);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function myCredits(request, response) {
    const { trip, user } = request.params;

    try {
        const costs = await Cost.findAll({ where: { user, trip }});
        const credits = await Debt.findAll({
            where: { cost: costs.map(({id}) => id) },
        });

        return response.status(200).json(credits);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function read(request, response) {
    const { cost, user } = request.params;

    try {
        const debt = await Debt.findOne({
            where: { cost, user },
        });

        if (!debt) {
            return response.status(404).json({
                message: 'Dívida não encontrada!',
            });
        }

        return response.status(200).json(debt);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function edit(request, response) {
    const { cost, user } = request.params;
    const { value, settled } = request.body;

    try {
        const debt = await Debt.update({
            value, settled
        }, {
            where: { cost, user }
        });

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
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function remove(request, response) {
    const { cost, user } = request.params;

    try {
        const debt = await Debt.destroy({
            where: { cost, user },
        });

        if (debt === 0) {
            return response.status(404).json({
                message: 'Dívida não encontrada!',
            });
        }

        return response.status(200).json({
            data: debt,
            message: 'Dívida apagada com sucesso!',
        });
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

module.exports = { myDebts, myCredits, read, edit, remove };
