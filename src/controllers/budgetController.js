const { v4: uuidv4 } = require('uuid');

const Budget = require('../models/budget');

async function index(request, response) {
    const { trip } = request.params;

    try {
        const budget = await Budget.findAll({
            where: { trip },
        });

        return response.status(200).json(budget);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function create(request, response) {
    const id = uuidv4();
    const { description, value, category, dtbudget, trip } = request.body;

    try {
        const budget = await Budget.create({
            id, description, value, category, dtbudget, trip,
        });

        return response.status(200).json(budget);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function read(request, response) {
    const { id } = request.params;

    try {
        const budget = await Budget.findByPk(id);

        if (!budget) {
            return response.status(404).json({
                message: 'Orçamento não encontrado!',
            });
        }
        
        return response.status(200).json(budget);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function edit(request, response) {
    const { id } = request.params;
    const {
        description, value, category, subcategory, dtbudget
    } = request.body;

    try {
        const budget = await Budget.update({
            description, value, category, subcategory, dtbudget,
        }, {
            where: { id },
        });

        if (budget[0] === 0) {
            return response.status(404).json({
                message: 'Orçamento não encontrado!',
            });
        }

        return response.status(200).json({
            data: budget[0],
            message: 'Orçamento atualizado com sucesso!',
        });

    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function remove(request, response) {
    const { id } = request.params;

    try {
        const budget = await Budget.destroy({
            where: { id },
        });

        if (budget === 0) {
            return response.status(404).json({
                message: 'Orçamento não encontrado!',
            });
        }

        return response.status(200).json({
            data: budget,
            message: 'Orçamento apagado com sucesso!',
        });
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

module.exports = { index, create, read, edit, remove };
