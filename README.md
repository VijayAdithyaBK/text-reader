# 🎙️ Text Reader - Advanced Text-to-Speech Platform

<div align="center">

**A modern, feature-rich Text-to-Speech web application with multi-format file support, voice customization, and real-time audio controls.**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Report Bug](mailto:vijayadithyak@gmail.com) • [Request Feature](mailto:vijayadithyak@gmail.com)

</div>

---

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#key-features">Key Features</a></li>
      </ul>
    </li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#architecture">Architecture</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

---

## 🌟 About The Project

This project demonstrates **full-stack development expertise** with a focus on modern web technologies, user experience, and real-time audio processing. It is built as a portfolio piece to showcase:

- 🎨 **Modern UI/UX Design** - Clean, intuitive interface with smooth animations powered by Framer Motion.
- 🏗️ **Full-Stack Architecture** - Robust React/TypeScript frontend paired with a high-performance Python FastAPI backend.
- 🎵 **Real-time Audio Processing** - Custom waveform visualization and seamless playback controls.
- 📄 **Multi-Format Support** - Intelligent parsing of PDF, DOCX, TXT, and Markdown files.
- 🎭 **Voice Customization** - Diverse voice options with adjustable pitch, rate, and presets.
- ⚡ **Performance Optimized** - Lightning-fast development and production builds using Vite.

> *[Add screenshots of your application here to showcase the UI]*

### ✨ Key Features

#### 🎤 Voice & Audio
- **Voice Gallery** - Browse and select from a wide range of TTS voices.
- **Custom Voice Presets** - Pre-configured celebrity/character voices with optimized settings.
- **Real-time Controls** - Adjust speech rate and pitch on the fly.
- **Waveform Visualization** - Visual feedback during playback.
- **Audio Download** - Export generated speech as MP3 files.

#### 📁 File Processing
- **Multi-Format Support** - PDF, DOCX, TXT, Markdown.
- **Smart Text Extraction** - Preserves formatting and structure.
- **Drag & Drop Upload** - Intuitive file handling.
- **Direct Text Input** - Type or paste text directly.

#### 🎨 User Experience
- **Responsive Design** - Works seamlessly on desktop and mobile.
- **Modern UI Components** - Glassmorphism, smooth animations, and vibrant colors.
- **Real-time Feedback** - Loading states and progress indicators.
- **Keyboard Shortcuts** - Efficient workflow for power users.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React features with functional components
- **TypeScript** - Type-safe development
- **Vite** - Next-generation build tool
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready animation library
- **Lucide React** - Beautiful icon system

### Backend
- **FastAPI** - High-performance Python web framework
- **Edge-TTS** - Microsoft Edge's TTS engine integration
- **Uvicorn** - Lightning-fast ASGI server

### Libraries & Tools
- **PDF.js** - PDF parsing and rendering
- **Mammoth.js** - DOCX to HTML conversion
- **Marked** - Markdown parser
- **ESLint** - Code quality and consistency

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **npm** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VijayAdithyaBK/text-reader.git
   cd text-reader
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### Running the Application

**Option 1: Using the startup script (Windows)**
```bash
./start_server.bat
```

**Option 2: Manual startup**

1. Start the backend server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

2. In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

---

## ⚡ Usage

### 🚦 API Endpoints

| Method | Endpoint  | Description                |
| ------ | --------- | -------------------------- |
| `GET`  | `/voices` | Fetch available TTS voices |
| `POST` | `/tts`    | Generate speech from text  |

**Request Body for `/tts`:**
```json
{
  "text": "Hello, world!",
  "voice": "en-US-GuyNeural",
  "rate": "+0%",
  "pitch": "+0Hz"
}
```

### 🔧 Configuration

The application can be customized through:
- **Voice Presets** (`src/data/voicePresets.ts`) - Add custom voice configurations
- **Backend URL** (`src/App.tsx`) - Configure API endpoint
- **Tailwind Config** - Customize design tokens

---

## 🏗️ Architecture

### 📂 Project Structure

```
text-reader/
├── src/
│   ├── components/          # React components
│   │   ├── Controls.tsx     # Audio control components
│   │   ├── FileUploader.tsx # File upload handling
│   │   ├── TextInput.tsx    # Text input component
│   │   ├── VoiceGallery.tsx # Voice selection UI
│   │   └── WaveformPlayer.tsx # Audio visualization
│   ├── utils/
│   │   └── fileParsers.ts   # Multi-format file parsers
│   ├── data/
│   │   └── voicePresets.ts  # Voice configuration
│   └── App.tsx              # Main application
├── backend/
│   ├── main.py              # FastAPI server
│   └── requirements.txt     # Python dependencies
├── package.json
└── vite.config.ts
```

### 🎯 Technical Achievements

- **Separation of Concerns** - Clean frontend/backend architecture.
- **Type Safety** - Full TypeScript coverage for maintainability.
- **API Design** - RESTful API with clear endpoints.
- **State Management** - React hooks for efficient state handling.
- **Performance Optimizations** - Lazy loading components, efficient blob handling, and tree-shaking.
- **Code Quality** - ESLint integration, modular component architecture, and graceful error handling.

### 📊 Performance Metrics

- **Build Size**: Optimized production bundle
- **First Contentful Paint**: <1s
- **Time to Interactive**: <2s
- **Lighthouse Score**: (Add your scores here)

---

## 🔜 Roadmap

- [ ] Multi-language support with i18n
- [ ] User authentication and saved preferences
- [ ] Cloud storage integration
- [ ] Batch processing for multiple files
- [ ] Advanced audio effects (reverb, echo, etc.)
- [ ] Voice cloning capabilities
- [ ] Progressive Web App (PWA) support
- [ ] Real-time collaboration features

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## � License

This project is available for portfolio demonstration purposes.

---

## 👨‍💻 Contact

**Vijay Adithya B K**

- 📧 Email: [vijayadithyak@gmail.com](mailto:vijayadithyak@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/vijayadithyabk](https://www.linkedin.com/in/vijayadithyabk/)
- 🌐 Portfolio: [vijayadithyabk.github.io/data-nexus/](https://vijayadithyabk.github.io/data-nexus/)
- 🐙 GitHub: [@VijayAdithyaBK](https://github.com/VijayAdithyaBK)

---

## 🙏 Acknowledgments

- Microsoft Edge TTS for voice synthesis
- The React and FastAPI communities

---

<div align="center">

**⭐ If you find this project interesting, please consider giving it a star! ⭐**

</div>

<p align="center">
  <i>⚡ Crafted by Vijay Adithya B K</i>
</p>
