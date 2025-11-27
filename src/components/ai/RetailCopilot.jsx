import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../shared/GlassCard';

export function RetailCopilot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your Retail Copilot. Ask me anything about your store.", sender: 'agent' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        // Simulate AI response
        setTimeout(() => {
            let responseText = "I'm not sure about that.";
            const lowerInput = userMsg.text.toLowerCase();

            if (lowerInput.includes('sales')) {
                responseText = "Sales are up 20% today compared to yesterday! Top category: Footwear.";
            } else if (lowerInput.includes('stock') || lowerInput.includes('inventory')) {
                responseText = "You have 3 items running low on stock. Check the dashboard for details.";
            } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                responseText = "Hi there! Ready to help you manage your store.";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: responseText, sender: 'agent' }]);
        }, 1000);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 z-50"
                    >
                        <GlassCard className="flex flex-col h-[500px] bg-white/95 border-white/50 shadow-2xl shadow-blue-500/10">
                            {/* Header */}
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-blue-50/50">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-blue-500" />
                                    <h3 className="font-bold text-slate-800">Retail Copilot</h3>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.sender === 'user'
                                                    ? 'bg-blue-500 text-white rounded-tr-none shadow-sm'
                                                    : 'bg-slate-100 text-slate-700 rounded-tl-none'
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-slate-100">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Ask a question..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-3 text-slate-800 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    />
                                    <button
                                        onClick={handleSend}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-500 rounded-md text-white hover:bg-blue-400 transition-colors"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-50 transition-all ${isOpen
                        ? 'bg-red-500 hover:bg-red-400 rotate-90'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500'
                    }`}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <MessageSquare className="w-6 h-6 text-white" />
                )}
            </motion.button>
        </>
    );
}
