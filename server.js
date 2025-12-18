const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

// Load .env file manually
const env = {};
try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        const data = fs.readFileSync(envPath, 'utf8');
        data.split('\n').forEach(line => {
            const parts = line.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const val = parts.slice(1).join('=').trim();
                env[key] = val;
            }
        });
    }
} catch (err) {
    console.error("Error loading .env file:", err);
}

const server = http.createServer((req, res) => {

    if (req.url === '/config.js') {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        
        const alphaUser = process.env.Alpha_Admin || env.Alpha_Admin || 'Raushan_143';
        const betaUser = process.env.Beta_Admin || env.Beta_Admin || 'Nisha_143';

        const usersConfig = { 
            [alphaUser]: process.env.ALPHA_PASS || env.ALPHA_PASS || '4gh4m01r', 
            [betaUser]: process.env.BETA_PASS || env.BETA_PASS || '4gh4m01r'
        };
        const userNamesConfig = { alpha: alphaUser, beta: betaUser };
        
        let firebaseConfigStr = process.env.FIREBASE_CONFIG || env.FIREBASE_CONFIG;
        let firebaseConfig = {};
        if (firebaseConfigStr) {
            try {
                firebaseConfig = JSON.parse(firebaseConfigStr);
            } catch (e) { console.error("Error parsing FIREBASE_CONFIG:", e.message); }
        }

        const dbUrl = process.env.DATABASE_URL || env.DATABASE_URL;
        if (dbUrl) firebaseConfig.databaseURL = dbUrl;

        res.end(`const envUsers = ${JSON.stringify(usersConfig)}; const envUserNames = ${JSON.stringify(userNamesConfig)}; const envFirebaseConfig = ${JSON.stringify(firebaseConfig)};`);
        return;
    }

    let filePath = '.' + decodeURI(req.url);
    if (filePath === './') {
        filePath = './milbaat.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    
    // Check Firebase Connection
    let firebaseConfig = null;
    if (process.env.FIREBASE_CONFIG) {
        try { firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG); } catch(e) {}
    } else if (env.FIREBASE_CONFIG) {
        try { firebaseConfig = JSON.parse(env.FIREBASE_CONFIG); } catch(e) {}
    }

    const dbUrl = process.env.DATABASE_URL || env.DATABASE_URL || (firebaseConfig ? firebaseConfig.databaseURL : null);

    if (dbUrl) {
        const checkUrl = dbUrl.endsWith('/') ? `${dbUrl}.json` : `${dbUrl}/.json`;
        https.get(checkUrl, (res) => {
            if (res.statusCode === 200 || res.statusCode === 401) {
                console.log("Firebase connected successfully..");
            } else {
                console.log(`Warning: Firebase Database returned status ${res.statusCode}`);
            }
        }).on('error', (e) => console.error("Error connecting to Firebase:", e.message));
    }
});