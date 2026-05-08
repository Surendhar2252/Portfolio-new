import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const knowledgeBase = [
  {
    keywords: ['name'],
    response:
      'I am Surendhar M S, AI Engineer and final-year AIML engineering student at K.S. Rangasamy College of Technology (KSR CT).',
  },
  {
    keywords: ['role', 'job', 'title'],
    response:
      'I work as an AI Engineer and I am a final-year AIML engineering student at KSR CT.',
  },
  {
    keywords: ['location', 'where', 'tamil', 'india', 'tirupur'],
    response: 'I am based in Tirupur, Tamil Nadu, India.',
  },
  {
    keywords: ['skills', 'interest', 'interests', 'machine learning', 'artificial intelligence', 'python', 'devops', 'jenkins', 'ansible', 'pygame', 'game', '2d'],
    response:
      'My key interests and skills include Artificial Intelligence, Machine Learning, Python, 2D game development with Pygame, DevOps, CI/CD, Jenkins, and Ansible.',
  },
  {
    keywords: ['brain tumor', 'cnn', 'brain', 'tumor', 'model'],
    response:
      'One featured project is a CNN-based deep learning model for brain tumor detection.',
  },
  {
    keywords: ['agricast', 'agri', 'agriculture', 'prediction'],
    response: 'I built AgriCast, an AI-driven agricultural prediction tool.',
  },
  {
    keywords: ['intelliassist', 'gemini', 'chatbot', 'web-search', 'grounding'],
    response:
      'I worked on IntelliAssist, a Gemini-based chatbot with web-search grounding.',
  },
  {
    keywords: ['contact', 'email', 'reach', 'contact form'],
    response:
      'If you want to connect, please use the contact form on the website or email me directly.',
  },
];

const bubbleClasses = (type) =>
  type === 'user'
    ? 'self-end rounded-3xl rounded-br-none bg-cyan-400/15 text-slate-100 border border-cyan-400/20'
    : 'self-start rounded-3xl rounded-bl-none bg-slate-800/90 text-slate-200 border border-slate-700/70';

function findAnswer(text) {
  const normalized = text.toLowerCase();
  for (const item of knowledgeBase) {
    if (item.keywords.some((keyword) => normalized.includes(keyword))) {
      return item.response;
    }
  }
  return (
    'I only answer questions about Surendhar M S and the details on this portfolio. ' +
    'If you need something else, please use the contact form or send an email through the website.'
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: 'Hi! I am Surendhar’s portfolio assistant. Ask me about his skills, projects or background.',
    },
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      from: 'user',
      text: trimmed,
    };
    const botMessage = {
      id: Date.now() + 1,
      from: 'bot',
      text: findAnswer(trimmed),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <motion.button
        initial={false}
        animate={{ rotate: open ? 45 : 0 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xl font-bold text-slate-950 shadow-2xl shadow-cyan-500/20 border border-white/10"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close chatbot' : 'Open chatbot'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-7 w-7 fill-slate-950">
          <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v9A2.5 2.5 0 0 1 17.5 16H7l-3 3V4.5Zm2.5-.5a.5.5 0 0 0-.5.5v11.7L7.8 16H17.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-11Z" />
        </svg>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="pointer-events-auto w-[340px] max-w-full rounded-[2rem] border border-slate-700/70 bg-slate-950/95 shadow-2xl shadow-slate-950/40 backdrop-blur-xl"
        style={{ display: open ? 'block' : 'none' }}
      >
        <div className="flex items-center justify-between rounded-t-[2rem] border-b border-slate-800/70 bg-slate-900/95 px-4 py-4 text-sm text-slate-200">
          <div>
            <p className="font-semibold text-white">Portfolio Chat</p>
            <p className="text-xs text-slate-400">Ask about Surendhar’s profile</p>
          </div>
          <button
            className="rounded-full bg-slate-800/80 px-2.5 py-1.5 text-slate-300 transition hover:bg-slate-700"
            onClick={() => setOpen(false)}
            aria-label="Close chat window"
          >
            ✕
          </button>
        </div>

        <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-slate-700/70">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] break-words px-4 py-3 text-sm leading-6 ${bubbleClasses(message.from)}`}>
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="rounded-b-[2rem] border-t border-slate-800/70 bg-slate-900/90 px-4 py-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-2xl border border-slate-700/80 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="Ask about Surendhar’s projects, skills, or background..."
            />
            <button
              onClick={handleSend}
              className="rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              Send
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
