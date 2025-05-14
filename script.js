const startRecordingButton = document.getElementById('start-recording');
const transcriptionElement = document.getElementById('transcription');
const responseElement = document.getElementById('response');

const API_KEY = 'AIzaSyBK933R0dHt8i-NjrRRjKBwWuwIKYICVDs';

startRecordingButton.addEventListener('click', () => {
    // 假設使用 Web Speech API 作為語音輸入的前端實現
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'zh-TW';
    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        transcriptionElement.textContent = `辨識結果: ${transcript}`;

        // 模擬 AI 回應邏輯
        fetch(`https://gemini-api.example.com/recognize?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: transcript }),
        })
            .then((response) => response.json())
            .then((data) => {
                responseElement.textContent = `AI 回應: ${data.response}`;
            })
            .catch((error) => {
                responseElement.textContent = 'AI 回應失敗，請稍後再試';
                console.error('Error:', error);
            });
    };

    recognition.onerror = (event) => {
        transcriptionElement.textContent = '語音辨識失敗，請再試一次';
        console.error('Speech recognition error:', event.error);
    };
});
