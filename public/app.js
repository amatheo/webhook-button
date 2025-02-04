document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('triggerBtn');
    const messageDiv = document.getElementById('message');
    let isRequestPending = false;

    const updateMessage = (text, isError = false) => {
        messageDiv.textContent = text;
        messageDiv.style.color = isError ? '#dc3545' : '#28a745';
    };

    const triggerWebhook = async () => {
        if (isRequestPending) return;

        isRequestPending = true;
        btn.disabled = true;
        updateMessage('Sending request...');

        try {
            console.log('Sending request... to ' + window.WEBHOOK_URL);
            const response = await fetch(window.WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    timestamp: Date.now(),
                    source: 'webhook-button'
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            updateMessage('Success! Webhook triggered');
        } catch (error) {
            console.error('Error:', error);
            updateMessage(`Error: ${error.message}`, true);
        } finally {
            isRequestPending = false;
            btn.disabled = false;
        }
    };

    btn.addEventListener('click', triggerWebhook);
});