const { v4: uuidv4 } = require('uuid');

const Subcategory = require('../models/subcategory');

async function index(request, response) {
    const { trip } = request.params;

    try {
        const subcategories = await Subcategory.findAll({
            where: { trip },
        });

        return response.status(200).json(subcategories);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function create(request, response) {
    const id = uuidv4();
    const { description, category, trip } = request.body;

    try {
        const subcategory = await Subcategory.create({
            id, description, category, trip,
        });

        return response.status(200).json(subcategory);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function read(request, response) {
    const { id } = request.params;

    try {
        const subcategory = await Subcategory.findByPk(id);

        if (!subcategory) {
            return response.status(404).json({
                message: 'Subcategoria não encontrada!',
            });
        }
        
        return response.status(200).json(subcategory);
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function edit(request, response) {
    const { id } = request.params;
    const { description, category } = request.body;

    try {
        const subcategory = await Subcategory.update({
            description,
            category,
        }, {
            where: { id },
        });

        if (subcategory[0] === 0) {
            return response.status(404).json({
                message: 'Subcategoria não encontrada!',
            });
        }
        
        return response.status(200).json({
            data: subcategory[0],
            message: 'Subcategoria atualizada com sucesso!',
        });
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

async function remove(request, response) {
    const { id } = request.params;

    try {
        const subcategory = await Subcategory.destroy({
            where: { id },
        });

        if (subcategory === 0) {
            return response.status(404).json({
                message: 'Subcategoria não encontrada!',
            });
        }
        
        return response.status(200).json({
            data: subcategory,
            message: 'Subcategoria apagada com sucesso!',
        });
    } catch (error) {
        /* istanbul ignore next */
        return response.status(500).json({ message: error });
    }
};

module.exports = { index, create, read, edit, remove };
