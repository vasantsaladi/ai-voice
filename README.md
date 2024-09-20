# AI Voice Command

AI Voice Command is a web application that allows users to interact with an AI assistant using voice commands. It combines a Next.js frontend with a FastAPI backend to provide a seamless voice-to-text and AI response experience.

## Features

- Voice recording and transcription
- AI-generated responses to voice commands
- Sleek, responsive UI using Tailwind CSS and Daisy UI
- Real-time updates for transcription and AI responses

## Tech Stack

- Frontend:
  - Next.js 13 (React framework)
  - TypeScript
  - Tailwind CSS (for styling)
  - Daisy UI (component library)
- Backend:
  - FastAPI (Python web framework)
  - Google Cloud Speech-to-Text API (for transcription)
- Development:
  - Conda (for environment management)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Python 3.9 or later
- Conda (for managing Python environments)
- Google Cloud account with Speech-to-Text API enabled

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/ai-voice-command.git
   cd ai-voice-command
   ```

2. Set up the frontend:

   ```
   npm install
   ```

3. Set up the backend:

   ```
   conda create --name aivoice python=3.9
   conda activate aivoice
   pip install -r requirements.txt
   ```

4. Set up your Google Cloud credentials:
   - Download your Google Cloud service account key
   - Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of your key file

### Running the Application

1. Start the backend server:

   ```
   conda activate aivoice
   uvicorn api.main:app --reload
   ```

2. In a new terminal, start the frontend development server:

   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Click the "Start Recording" button to begin voice capture.
2. Speak your command or question clearly.
3. Click "Stop Recording" when finished.
4. Wait for the transcription and AI response to appear.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Cloud Speech-to-Text API for transcription services
- OpenAI for AI response generation (if applicable)
- The Next.js and FastAPI communities for their excellent documentation and support
