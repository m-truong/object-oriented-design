// all required imports for npm packages go up here
const express = require('express');
// fs is a built-in FileSystem module Node.js file-system reader
const fs = require('fs');

// my const here stores a 'mock' data directory
const DATA_DIR = 'aedb_data';

const app = express();
app.use(express.json());

// these are my single-file REST endpoints
// they're event-listeners waiting for HTTP network protocol
// this would be an exmaple of a WRITE data endpoint (in systems-design STORAGE terminology)

// =========================================================>
//  these REST endpoitn listeners are examples of RAM storage
// =========================================================>
// this is a WRITE data endpoint
app.post('/memory/:key', (req, res) => {
    hashtable[req.params.key] = req.body.data;
    res.send();
});

// this is a READ data endpoint
app.get('/memory/:key', (req, res) => {
    const key = req.params.key;
    if (key in hashtable) {
        // the express library will send back a response using the hashTable key:value pair
        res.send(hashtable[key]);
        return;
    }
    res.send('null');
})

// =========================================================>
// these REST endpoint listeners are examples of DISK storage
// =========================================================>

// this is a WRITE disk endpoint
app.post('/disk/:key', (req, res) => {
    const destinationFile = `${DATA_DIR}/${req.params.key}`;
    // this is a FileSystem write using the interpolated string with the request-data
    fs.writeFileSync(destinationFile, req.body.data);
    // probably under-the-hood this sends a default HTTP-packet response with 200
    res.send();
})

// this endpoint is a READ disk endpoint
app.get('/disk/:key', (req, res) => {
    // this is the same destination file, but notice that it's not stored at the top-level, but kept within scope of my JS block
    const destinationFile = `${DATA_DIR}/${req.params.key}`;

    // notices that I have a try-catch block when trying to QUERY the data from DISK
    try {
        const data = fs.readFileSync(destinationFile);
        res.send(data);
    } catch (e) {
        res.send('null');
    }

    // TODO: add more ntoes breaking down this entire code file
})

app.listen(1991, () => {
    console.log(`one long river of song on 1991`);
})