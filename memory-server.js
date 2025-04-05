// all required imports for npm packages go up here
const express = require('express');
const fs = require('fs');

// my const here stores a 'mock' data directory
const DATA_DIR = 'aedb_data';

const app = express();
app.use(express.json());

// these are my single-file REST endpoints
// they're event-listeners waiting for HTTP network protocol
// this would be an exmaple of a WRITE data endpoint (in systems-design STORAGE terminology)
app.post('/memory/:key', (req, res) => {
    hashtable[req.params.key] = req.body.data;
    res.send();
});

// this is a READ data endpoint
app.get('/memory/:key', (req, res) => {
    const key = req.params.key;
    if (key in hashtable) {
        res.send(hashtable[key]);
        return;
    }
    res.send('null');
})