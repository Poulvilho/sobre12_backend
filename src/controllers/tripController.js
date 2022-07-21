const { Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Trip = require('../models/trip');
const Guest = require('../models/guest');

async function index(request, response) {
    const { user } = request.params;
    
    try {
        const sharedTrips = await Guest.findAll({
            where: { user },
        });

        const trip = await Trip.findAll({
            where: Sequelize.or(
                { user },
                { id: sharedTrips.map(({ trip }) => trip) },
            ),
        });

        return response.status(200).json(trip);
    } catch (error) {
        return response.status(500).json({ message: error });
    }
};

async function create(request, response) {
    const id = uuidv4();
    const { name, description, dtstart, dtend, user } = request.body;

    try {
        const trip = await Trip.create({
            id, name, description, dtstart, dtend, user,
        });

        return response.status(200).json(trip);
    } catch (error) {
        return response.status(500).json({ message: error });
    }
};

async function read(request, response) {
    const { id } = request.params;

    try {
        const trip = await Trip.findByPk(id);

        if (!trip) {
            return response.status(404).json({
                message: 'Viagem não encontrada!',
            });
        }
        
        return response.status(200).json(trip);
    } catch (error) {
        return response.status(500).json({ message: error });
    }
};

async function edit(request, response) {
    const { id } = request.params;
    const { name, description, dtstart, dtend } = request.body;

    try {
        const trip = await Trip.update({
            name, description, dtstart, dtend,
        }, {
            where: { id },
        });

        if (trip[0] === 0) {
            return response.status(404).json({
                message: 'Viagem não encontrada!',
            });
        }
        
        return response.status(200).json({
            data: trip[0],
            message: 'Viagem atualizada com sucesso!',
        });
    } catch (error) {
        return response.status(500).json({ message: error });
    }
};

async function remove(request, response) {
    const { id } = request.params;

    try {
        const trip = await Trip.destroy({
            where: { id },
        });
        
        if (trip === 0) {
            return response.status(404).json({
                message: 'Viagem não encontrada!',
            });
        }
        
        return response.status(200).json({
            data: trip[0],
            message: 'Viagem apagada com sucesso!',
        });
    } catch (error) {
        return response.status(500).json({ message: error });
    }
};

module.exports = { index, create, read, edit, remove };
