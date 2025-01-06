from flask import Flask, request, send_file, jsonify
import openai
import os
from faster_whisper import WhisperModel
from sentence_transformers import SentenceTransformer
from collections import defaultdict
from flask_cors import CORS
from dotenv import load_dotenv
import time  # To use for unique file names

# Flask app setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

load_dotenv()

# Set your OpenAI API Key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Load Sentence Transformer Model for semantic similarity
semantic_model = SentenceTransformer('all-MiniLM-L6-v2')

# Initialize Whisper model for speech-to-text transcription
device = "cpu"
model = WhisperModel("base", device=device, compute_type="int8")

# Global dictionary to store user sessions and questions
sessions = defaultdict(lambda: {"questions_asked": 0, "candidate_name": None, "interview_data": []})

# Folder to store the audio files
AUDIO_FOLDER = './audio_files'
if not os.path.exists(AUDIO_FOLDER):
    os.makedirs(AUDIO_FOLDER)

# Transcribe speech to text using Whisper model
def speech_to_text(audio_file_path):
    try:
        segments, info = model.transcribe(audio_file_path)
        text_output = ' '.join(segment.text for segment in segments)
        return text_output
    except Exception as e:
        print(f"Error transcribing audio file {audio_file_path}: {e}")
        return ""

# Updated generate_question function
def generate_question(topic, candidate_name):
    prompt = f"""
    Only Generate a complex interview question (within 1 line, no more than 20 words) for an AI engineer named {candidate_name} about {topic} and use {candidate_name} for personal touch while asking the question.
    Step 1: Understanding the Purpose
    Goal:
    Recognize that the primary objective is to assess the candidate's foundational knowledge.
    Focus on evaluating the candidate’s grasp of basic principles and theories relevant to their field.
    Step 2: Question Structure
    Depth of Understanding:
    Design questions that probe the depth of the candidate's understanding rather than surface-level knowledge.
    Ensure questions are formulated to require detailed explanations and comprehensive responses.
    Core Principles and Terminologies:
    Include questions that ask candidates to define or explain core principles and terminologies.
    Avoid vague or overly broad questions; be specific in what you are asking.
    Step 3: Concise and Clear
    Ensure the question is concise (no more than 20 words) and fits within 1-2 lines.
    Examples:
    Incorporate examples in the questions where applicable to illustrate the concept being assessed.
    Examples help candidates relate to practical applications of the principles.
    Step 4: Consistency and Precision
    Strict Adherence to Structure:
    Follow the defined structure strictly to maintain consistency across all questions.
    Ensure each question aligns with the purpose of assessing foundational knowledge.
    Relevance and Alignment:
    Ensure questions are relevant to the candidate’s field and aligned with the foundational principles they need to know.
    Avoid questions that deviate from the core objective.
    """

    # Use the new ChatCompletion method for chat-based responses
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful interviewer."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=50,
        temperature=0.6
    )
    return response['choices'][0]['message']['content']

# Endpoint for transcribing audio
@app.route('/transcribe_audio', methods=['POST'])
def transcribe_audio():
    # Check if audio file is present in the request
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file found"}), 400
    
    # Save the audio file in the audio_files folder with a unique name
    audio_file = request.files['audio']
    timestamp = int(time.time())
    audio_file_path = os.path.join(AUDIO_FOLDER, f'user_audio_{timestamp}.wav')
    audio_file.save(audio_file_path)

    # Transcribe audio to text
    print(f"Processing audio file: {audio_file_path}")
    transcript_text = speech_to_text(audio_file_path)
    print(f"Transcribed text: {transcript_text}")

    # Return the transcription
    return jsonify({"transcript": transcript_text})

# Endpoint for generating the next question based on user input
@app.route('/generate_question', methods=['POST'])
def generate_next_question():
    data = request.json
    print(data)
    topic = data.get("topic", "")
    candidate_name = data.get("candidate_name", "Candidate")

    # Check if a valid session is active
    # if candidate_name not in sessions:
    #     return jsonify({"error": "Invalid session. Please start a new session."}), 400

    # Generate a new question based on the topic
    next_question = generate_question(topic, candidate_name)

    # Update session information
    sessions[candidate_name]["questions_asked"] += 1

    return jsonify({"question": next_question})

# Endpoint to start a new interview session
@app.route('/start_session', methods=['POST'])
def start_session():
    data = request.json
    candidate_name = data.get("candidate_name", "Candidate")

    # Initialize session data
    sessions[candidate_name] = {"questions_asked": 0, "candidate_name": candidate_name, "interview_data": []}

    # Initial greeting question
    initial_question = "What specific topic or domain are you well-versed in?"
    return jsonify({"question": initial_question, "candidate_name": candidate_name})

# Run the Flask app
if __name__ == '__main__':
    app.run(port=5000, debug=True)