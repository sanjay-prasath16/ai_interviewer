const Candidate = require('../Models/candidate');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

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

module.exports = {
  test,
  storeInterviewData,
}