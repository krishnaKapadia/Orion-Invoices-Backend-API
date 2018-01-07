/* Serve the correct API keys based off wether we are running on heroku or locally
 * in the dev enviroment
*/
// Heroku then use the enviroment variables
if(process.env.NODE_ENV === 'production'){
  module.exports = require('./prod_keys');
}else {
  //Dev enviroment, export dev_keys
  module.exports = require('./dev_keys');
}
