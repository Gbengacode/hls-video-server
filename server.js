import express from 'express'
import hls from 'hls-server'
import path from 'path'
import fs from 'fs'
import outputVideo from './ffmpeg.js'
const  __dirname = path.resolve()
const app = express()

outputVideo()
app.get('/', (req, res) => {
    return res.status(200).sendFile(`${__dirname}/client.html`);
});
const PORT = 7000

const server = app.listen(PORT, () => {
    console.log( `listening to port ${PORT}`)
})

new hls(server, {
    provider: {
        exists: (req, cb) => {
            const ext = req.url.split('.').pop();

            if (ext !== 'm3u8' && ext !== 'ts') {
                return cb(null, true);
            }

            fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
                if (err) {
                    console.log('File not exist');
                    return cb(null, false);
                }
                cb(null, true);
            });
        },
        getManifestStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        },
        getSegmentStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        }
    }
})

