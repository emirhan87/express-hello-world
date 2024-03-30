const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <form action="/generate" method="post">
            <label for="inputText">Enter text:</label><br>
            <input type="text" id="inputText" name="inputText"><br>
            <input type="submit" value="Generate Image">
        </form>
        <img id="outputImage" src="" alt="Generated image will appear here">
    `);
});

app.post('/generate', async (req, res) => {
    const inputText = req.body.inputText;
    try {
        const response = await axios.post('http://your-dalle-api-url.com/generate', {
            prompt: inputText,
            size: "1024x1024",
            quality: "standard",
            n: 1
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
            }
        });
        res.send(`
            <img src="${response.data.data[0].url}" alt="Generated image">
            <a href="/">Back</a>
        `);
    } catch (error) {
        console.error(error);
        res.send('Error generating image.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
