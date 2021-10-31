const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/.netlify/functions/app', router);
const port = 3001;

const mbi = require('./functions');

module.exports = app;
module.exports.handler = serverless(app);

app.listen(port, () => console.log(`MBI Example app listening at http://localhost:${port}`));

router.get('/', (_request, response) => response.json('Hello World'));

router.get('/generateMBI', (_request, response) => response.json({ mbi: mbi.generateMBI() }));

router.post('/verifyMBI', (request, response) => {
	response.json( {isValidMBI: mbi.verifyMBI(request.body.mbi)} );
});