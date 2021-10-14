const application = require('./app');

const port = 3000;

application.listen(port, () => console.log(`Server up and running on port ${port}`));