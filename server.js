const express = require('express');
const cors = require('cors');
const studentsAPI = require('./routes');

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use('/', studentsAPI);
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});