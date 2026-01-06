import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    image?: string;
    products?: any[];
}

const Typewriter: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        setDisplayedText(''); // Reset on new text
        const intervalId = setInterval(() => {
            index++;
            setDisplayedText(text.substring(0, index));
            if (index >= text.length) clearInterval(intervalId);
        }, 15); // Adjust speed here (ms)
        return () => clearInterval(intervalId);
    }, [text]);

    return <p className="text-sm leading-relaxed whitespace-pre-wrap">{displayedText}</p>;
};

const AIAssistant: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Xin chào! Tôi là trợ lý thời trang của ClothesDN. Tôi có thể giúp bạn tìm kiếm quần áo, tư vấn phối đồ hoặc nhận diện sản phẩm qua hình ảnh. Bạn đang tìm kiếm điều gì hôm nay?'
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        // Use a small timeout to ensure DOM is updated
        const timer = setTimeout(scrollToBottom, 50);
        return () => clearTimeout(timer);
    }, [messages, loading]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSend = async () => {
        if (!input.trim() && !selectedImage) return;

        const userMessage: Message = {
            role: 'user',
            content: input,
            image: selectedImage || undefined
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        const currentImage = selectedImage;
        setSelectedImage(null);
        setLoading(true);

        try {
            // Prepare history for AI
            const history = messages.map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                content: m.content
            }));

            const response = await api.post('/ai/chat', {
                messages: [...history, { role: 'user', content: userMessage.content }],
                image: currentImage ? { data: currentImage, mimeType: 'image/jpeg' } : undefined
            });

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response.data.data
            }]);
        } catch (error) {
            console.error('AI Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Xin lỗi, tôi đang gặp chút sự cố kỹ thuật. Vui lòng thử lại sau giây lát!'
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 h-[calc(100vh-120px)] flex flex-col">
            <div className="mb-6 text-center" data-aos="fade-down">
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-brand-orange to-yellow-500 bg-clip-text text-transparent mb-2">
                    DN Fashion AI Assistant
                </h1>
                <p className="text-text-sub">Trải nghiệm mua sắm thông minh cùng trí tuệ nhân tạo</p>
            </div>

            {/* Chat Container */}
            <div className="flex-1 glass rounded-3xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl flex flex-col relative">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl -z-10" />

                {/* Messages area */}
                <div
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-brand-orange/20 scroll-smooth"
                >
                    <AnimatePresence initial={false}>
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold shadow-lg 
                  ${msg.role === 'user' ? 'bg-brand-orange' : 'bg-gradient-to-tr from-gray-700 to-gray-900'}`}>
                                        {msg.role === 'user' ? 'U' : 'AI'}
                                    </div>
                                    <div className={`p-4 rounded-2xl shadow-sm ${msg.role === 'user'
                                        ? 'bg-brand-orange text-white rounded-tr-none'
                                        : 'bg-bg-sub/90 backdrop-blur-md border border-border text-text-main rounded-tl-none'
                                        }`}>
                                        {msg.image && (
                                            <img src={msg.image} alt="User upload" className="max-w-xs rounded-lg mb-3 border border-white/20" />
                                        )}
                                        {msg.role === 'assistant' ? (
                                            <Typewriter text={msg.content} />
                                        ) : (
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {loading && (
                        <div className="flex justify-start">
                            <div className="flex gap-3 items-center bg-bg-sub/50 backdrop-blur-md p-4 rounded-2xl rounded-tl-none border border-border">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" />
                                </div>
                                <span className="text-xs text-text-sub italic">AI đang suy nghĩ...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div className="p-4 bg-bg-sub/40 backdrop-blur-xl border-t border-border">
                    {selectedImage && (
                        <div className="mb-3 relative inline-block">
                            <img src={selectedImage} alt="Selected" className="h-20 w-20 object-cover rounded-xl border-2 border-brand-orange" />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-3 rounded-xl hover:bg-white/20 transition-colors text-text-sub hover:text-brand-orange"
                            title="Tải lên hình ảnh"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </button>
                        <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Hỏi về thời trang, tìm sản phẩm..."
                            className="flex-1 bg-bg-main/50 border border-border rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all text-sm text-text-main"
                            disabled={loading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading || (!input.trim() && !selectedImage)}
                            className="bg-brand-orange text-white p-3 rounded-xl hover:bg-brand-orange/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-orange/20 transition-all"
                        >
                            <svg className="w-6 h-6 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
