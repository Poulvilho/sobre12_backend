
function login(request, response) {
    return response.status(200).json(
        request.body
    );
};

module.exports = login
