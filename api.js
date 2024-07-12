const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

const venvPath = '../venv';
const pythonScript = 'crawler.py';


app.get('/api/tokenscan', (req, res) => {
    // Spawn Python process within virtual environment
    const pythonProcess = spawn(path.join(venvPath, 'bin', 'python'), [pythonScript]);

    // Handle stdout data from Python script
    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        // Send response back to the client
        res.send(`stdout: ${data}`);
    });

    // Handle stderr data from Python script
    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        // Send error response back to the client
        res.status(500).send(`stderr: ${data}`);
    });

    // Handle Python script exit
    pythonProcess.on('close', (code) => {
        console.log(`Python script process exited with code ${code}`);
    });
});

app.use(
    cors({
        origin: "*",
        methods: ["GET"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Access-Control-Allow-Origin",
        ],
    })
);

app.get('/', (req, res) => {
    res.send('Hello from Node API!');
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
