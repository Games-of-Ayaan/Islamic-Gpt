# 🕌 Islamic GPT

<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Islamic GPT Banner" width="800"/>
  
  **A respectful AI companion for Islamic knowledge based on Quran and Authentic Hadith**
  
  [![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg)](https://vitejs.dev/)
  [![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-4285F4.svg)](https://ai.google.dev/)
</div>

## 📖 About

Islamic GPT is a specialized AI chatbot designed to provide authentic Islamic knowledge from the Holy Quran and Sahih Hadith collections. Built with respect and humility, it offers:

- **Authentic Sources**: Responses based on Quran and verified Hadith (Sahih Bukhari, Sahih Muslim)
- **Proper Citations**: Every verse and hadith includes proper references
- **Respectful Tone**: Maintains Islamic etiquette with greetings and humble language
- **Scholar Guidance**: Directs users to qualified scholars for complex jurisprudential matters

## ✨ Features

- 🤖 **AI-Powered Chat**: Powered by Google's Gemini 2.5 Flash model
- 📚 **Authentic References**: All Quranic verses and Hadith properly cited
- 🎨 **Beautiful UI**: Clean, responsive design with Islamic aesthetics
- ⚡ **Real-time Responses**: Fast, streaming responses with typewriter effect
- 🔄 **Chat History**: Persistent conversation with reset functionality
- 📱 **Mobile Friendly**: Fully responsive design for all devices

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0 + TypeScript
- **Build Tool**: Vite 6.2.0
- **AI Model**: Google Gemini 2.5 Flash
- **Styling**: Tailwind CSS (via classes)
- **Icons**: Lucide React
- **Markdown**: React Markdown for rich text rendering

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- A Google AI Studio API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd islamic-gpt-final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
islamic-gpt-final/
├── components/
│   ├── ChatInterface.tsx    # Main chat component
│   └── MessageBubble.tsx    # Individual message display
├── services/
│   └── geminiService.ts     # Gemini AI integration
├── App.tsx                  # Root component
├── constants.ts             # App constants & system instructions
├── types.ts                 # TypeScript type definitions
├── vite.config.ts          # Vite configuration
├── package.json            # Dependencies & scripts
└── .env.local              # Environment variables (create this)
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🌐 Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Add `GEMINI_API_KEY` in Vercel environment variables
4. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to [Netlify](https://netlify.com)
3. Set environment variables in Netlify dashboard

### Other Platforms
- **Railway**: Supports Node.js apps with environment variables
- **Render**: Similar to Railway for full-stack deployments

> **Note**: GitHub Pages won't work directly as it only serves static files and can't handle environment variables securely.

## 🎯 Key Features Explained

### System Instructions
The AI follows specific guidelines:
- Starts responses with Islamic greetings
- Provides proper citations for all religious texts
- Maintains humble and respectful tone
- Directs complex jurisprudential questions to scholars
- Ends detailed responses with "And Allah knows best"

### Citation Format
- **Quran**: `[Surah Name, Chapter:Verse]`
- **Hadith**: `[Source Book, Hadith #]`

### UI/UX Features
- Emerald green theme reflecting Islamic aesthetics
- Typewriter effect for AI responses
- Proper markdown rendering for formatted text
- Mobile-responsive design
- Loading states and error handling

## 🔒 Security & Privacy

- API keys are handled securely through environment variables
- No user data is stored permanently
- All conversations are client-side only
- Follows Islamic principles of privacy and respect

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Google AI** for the Gemini API
- **Islamic scholars** whose authentic teachings guide this project
- **Open source community** for the amazing tools and libraries

## ⚠️ Disclaimer

This AI assistant is for educational purposes only. For specific religious rulings (fatwas) or complex jurisprudential matters, always consult qualified Islamic scholars or local Imams.

---

<div align="center">
  <p><strong>May Allah accept this humble effort and make it beneficial for the Ummah</strong></p>
  <p><em>Barakallahu feekum (May Allah bless you)</em></p>
</div>