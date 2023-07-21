const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
}
);

