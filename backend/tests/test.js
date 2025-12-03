import { textToSpeech } from '../src/services/ttsService/ttsService.js';

(async () => {
    await textToSpeech('Hello world! This is a test.', 'test.mp3', 'en_GB-semaine-medium');
})();
