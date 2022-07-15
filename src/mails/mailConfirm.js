const mailConfirm = (id) => {
    return(
`<html>
    <body>
        <button href="locahost:3333/api/user/emailValidation/${id}">
            Clique aqui para validar seu email!
        </button>
    </body>
</html>`
    )};

module.exports = mailConfirm;
