const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware for JSON
app.use(express.json());

app.get('/', (req, res) => {
    const receivedData = req.query;
    console.log('receivedData:', receivedData);
    
    // result
    res.json({
        message: 'Data successfully received',
        data: receivedData
    });
});

// POST 
app.post('/api/data', (req, res) => {
    const receivedData = req.body;
    console.log('receivedData:', receivedData);
    if ("formId" in receivedData) {
        const submissionId = receivedData.submission.submissionId; // 
        const filePath = `./data/${submissionId}.json`;    
        fs.writeFileSync(filePath, JSON.stringify(receivedData, null, 2)); // Saving data to a file named after the submission ID
    }
    // result
    res.json({
        message: 'Data successfully received',
        data: receivedData
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});