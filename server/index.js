require('newrelic')
const app = require('./app');
require('dotenv').config();

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
