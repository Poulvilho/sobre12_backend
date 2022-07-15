const mailForgotPassword = (password) => {
    return(
`<html>
    <body>
        <p>Sua senha é: ${password}</p>
    </body>
</html>`
    )};

module.exports = mailForgotPassword;
