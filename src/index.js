const application = require('./app');
require('dotenv/config');

const port = process.env.PORT;

application.listen(port, () => console.log(`Server up and running on port ${port}`));
