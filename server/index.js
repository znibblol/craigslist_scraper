const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('tiny'));

app.get('/', (request, response) => {
    response.json({
        message: 'Hello World!'
    });
});

app.use((request, response, next) => {
    const error = new Error('404 not found');
    response.status(404);
    next(error);
});

app.use((error, request, response, next) => {
    response.status(response.statusCode || 500);
    response.json({
        message: error.message,
    });
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
});