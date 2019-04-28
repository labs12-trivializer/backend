const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-d9y68pfa.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://lambda-trivializer.herokuapp.com/',
    issuer: 'https://dev-d9y68pfa.auth0.com/',
    algorithms: ['RS256']
});

module.exports = jwtCheck;