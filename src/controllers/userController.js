
let userBackend = {
    email: 'usuario@inicial.com',
    password: 'pw13579',
};

function register(request, response) {

    const { user } = request.body;
    console.log(user);

    userBackend = user;

    console.log(userBackend);

    return response.status(200).json(
        userBackend
    );
};

function login(request, response) {

    return response.status(200).json(userBackend);
};

module.exports = {
    login,
    register
};
