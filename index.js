const express = require('express');
const app = express();
const port = 8080;


function requestLogger(request, response, next){
    console.log(`Request Method: ${request.method}, URL: ${request.url}`);
    next();
}

app.use(requestLogger);
app.get('/', (request, response) => {
    response.send('Hello World');
});


app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});

