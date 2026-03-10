import { useState } from 'react';
import { Home, Sparkles, Send, Bot, User as UserIcon } from 'lucide-react';

interface AIAssistantPageProps {
  onNavigate: (page: string) => void;
}

export const AIAssistantPage = ({ onNavigate }: AIAssistantPageProps) => {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'assistant'; message: string }>>([
    {
      role: 'assistant',
      message: 'Hello! I\'m your InternAI Assistant. I can help you with:\n\n• Finding internships matching your skills\n• Understanding application requirements\n• Career guidance and roadmap advice\n• Resume tips and suggestions\n• Answering questions about companies\n\nHow can I assist you today?'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = query.trim();
    setConversation(prev => [...prev, { role: 'user', message: userMessage }]);
    setQuery('');

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      const lowerQuery = userMessage.toLowerCase();

      if (lowerQuery.includes('internship') || lowerQuery.includes('opportunity')) {
        aiResponse = 'Based on your profile, I recommend checking out our Government and MNC internship listings. You can filter by domain, location, and duration. Would you like me to show you internships in a specific field?';
      } else if (lowerQuery.includes('resume')) {
        aiResponse = 'Great question! For a strong resume:\n\n1. Keep it concise (1-2 pages)\n2. Highlight relevant projects and skills\n3. Use action verbs\n4. Quantify achievements\n5. Tailor it to each application\n\nWould you like specific tips for your domain?';
      } else if (lowerQuery.includes('skill') || lowerQuery.includes('learn')) {
        aiResponse = 'Based on current industry trends, I suggest focusing on:\n\n• Programming languages (Python, JavaScript)\n• Data structures & algorithms\n• Version control (Git)\n• Cloud platforms (AWS, Azure)\n• Soft skills (communication, teamwork)\n\nCheck your Student Dashboard for personalized skill gap analysis!';
      } else if (lowerQuery.includes('career') || lowerQuery.includes('roadmap')) {
        aiResponse = 'Your personalized career roadmap is available in your dashboard! It includes:\n\n• Skills to learn for your domains\n• Recommended courses and certifications\n• Project ideas\n• Timeline for skill development\n\nWould you like to view it now?';
      } else {
        aiResponse = `I understand you're asking about "${userMessage}". Let me help you with that! For the most accurate information, I recommend:\n\n• Checking our internship listings\n• Visiting your Student Dashboard\n• Reviewing our career roadmap feature\n\nCan you provide more details about what you're looking for?`;
      }

      setConversation(prev => [...prev, { role: 'assistant', message: aiResponse }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                <Bot className="size-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Assistant</h2>
                <p className="text-purple-100 text-sm">Your personal career guide</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition-all flex items-center gap-2"
            >
              <Home className="size-5" />
              <span className="text-sm font-medium">Home</span>
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50">
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="size-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="size-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{msg.message}</p>
              </div>
              {msg.role === 'user' && (
                <div className="size-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserIcon className="size-5 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything about internships, careers, or skills..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2"
            >
              <Send className="size-5" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
