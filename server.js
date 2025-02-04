const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const webhookUrl = process.env.WEBHOOK_URL;

if (!webhookUrl) {
    console.error('WEBHOOK_URL environment variable is required');
    process.exit(1);
}

// Generate client config
const configContent = `window.WEBHOOK_URL = '${webhookUrl}';`;
fs.writeFileSync(path.join(__dirname, 'public', 'config.js'), configContent);

// Serve static files
app.use(express.static('public'));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Webhook URL set to: ${webhookUrl}`);
});