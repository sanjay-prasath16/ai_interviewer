import Candidate from "../Models/candidate.js";
import fs from "fs";
import path from "path";
import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const test = () => {
  console.log("testing backend");
}

const storeInterviewData = async (req, res) => {
  const { candidate_name, question, answer } = req.body;
  console.log(candidate_name, question, answer);

  try {
    const candidate = await Candidate.findOne({ name: candidate_name });

    if (!candidate) {
      const newCandidate = new Candidate({
        name: candidate_name,
        interview_data: [{ question, response: answer }],
        questions_asked: 1,
      });
      await newCandidate.save();
      return res.status(200).json({ message: 'Interview data saved successfully', candidate: newCandidate });
    } else {
      const updatedCandidate = await Candidate.findOneAndUpdate(
        { name: candidate_name },
        {
          $push: {
            interview_data: {
              question: question,
              response: answer
            }
          },
          $inc: { questions_asked: 1 },
        },
        { new: true }
      );

      return res.status(200).json({ message: 'Interview data updated successfully', candidate: updatedCandidate });
    }
  } catch (error) {
    console.error('Error saving interview data:', error);
    res.status(500).json({ message: 'Error saving interview data' });
  }
};

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const OUTPUT_FOLDER = path.resolve("./output");
if (!fs.existsSync(OUTPUT_FOLDER)) {
  fs.mkdirSync(OUTPUT_FOLDER);
}

const aitts = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required for TTS." });
    }

    const outputFilePath = path.join(OUTPUT_FOLDER, `output_${Date.now()}.mp3`);

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "echo",
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(outputFilePath, buffer);

    res.sendFile(outputFilePath, (err) => {
      if (err) {
        console.error("Error sending audio file:", err);
        res.status(500).json({ error: "Failed to send audio file." });
      }

      fs.unlink(outputFilePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting audio file:", unlinkErr);
        }
      });
    });
  } catch (error) {
    console.error("Error generating TTS:", error);
    res.status(500).json({ error: "TTS generation failed.", details: error.message });
  }
};

export default {
  test,
  storeInterviewData,
  aitts,
};