import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';


export async function textToSpeech(text, outputFile = 'output.mp3', voice = 'en_GB-semaine-medium') {
    try {
        const response = await axios.post(
            'https://api.piper.tts/v1/speak',
            { 
                text,
                voice
            },
            { responseType: 'arraybuffer' }
        );

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
            
        const filePath = path.join(__dirname, outputFile);

        fs.writeFileSync(filePath, response.data);
        console.log(`Audio saved to ${filePath}`);
    } catch (error) {
        console.error('Error generating TTS:', error.message);
    }
}
