import * as fileService from "../services/fileService"
import * as ttsService from "../services/ttsService"

export const uploadFile = async (req, res, next) =>{
    try{
        //1.check if file exists
        if(!req.file){
            return res.status(400).json({message:"No file uploaded"});
        }

        //2.extract text from file
        const rawText = await fileService.extractText(req.file.path);

        //3.clean and prepare text
        const cleanedText = fileService.cleanText(rawText);

        //4.  convet text to audio
        const audioBuffer = await ttsService.generateAudio({text:cleanedText,voice:"alloy", format:"mp3"});

        //5return audio
        res.set({
            "Content-Type": "audio/mpeg",
            "Content-Length": audioBuffer.length,
        });

        return res.send(audioBuffer);

    }catch (error){
        next(error);
    }
};