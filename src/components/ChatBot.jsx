'use client'
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BotMessageSquare } from "lucide-react";

import React, { useState, useEffect, useRef } from "react";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const ChatBot = () => {

    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [chat, setChat] = useState(null);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    const API_KEY = "AIzaSyAUwWD9LQI11_a5sVta0WaDV8F9bwiac6I";
    const MODEL_NAME = "gemini-1.0-pro-001";

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const initChat = async () => {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const newChat = await genAI.getGenerativeModel({ model: MODEL_NAME }).startChat({
                generationConfig: {
                    temperature: 0.9,
                    topK: 1,
                    topP: 1,
                    maxOutputTokens: 2048,
                },
                safetySettings: [
                    {
                        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                    },
                ],
                parts: messages.map((msg) => ({
                    text: msg.text,
                    role: msg.role,
                })),
            });

            setChat(newChat);
        };

        initChat();
    }, [messages]);

    const handleSendMessage = async () => {
        try {
            const userMessage = { text: userInput, role: "user", timestamp: new Date() };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setUserInput("");

            if (chat) {
                const result = await chat.sendMessage(userInput);
                const botMessage = { text: result.response.text(), role: "bot", timestamp: new Date() };

                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }
        } catch (error) {
            setError("Failed to send message");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-[30px] right-7 z-50">
            <Sheet >
                <SheetTrigger asChild>
                    <Button variant="outline" className='rounded-full h-[60px] w-[60px] bg-zinc-100 hover:bg-zinc-200 shadow-2xl border  border-zinc-200'><BotMessageSquare /></Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Ask Me Anything</SheetTitle>
                    </SheetHeader>
                    <SheetContent>
                        <div className="flex flex-col p-6">
                            <div className="flex justify-between items-center mb-6">
                            </div>
                            <div className="flex-1 overflow-y-auto bg-white rounded-lg p-4 shadow-lg">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"} animate-fade-in-up`}>
                                        <span className={`inline-block p-3 rounded-lg shadow-md ${msg.role === "user"
                                            ? "bg-slate-900 text-white transform hover:scale-105 transition-transform duration-300"
                                            : "bg-zinc-200 text-gray-800 bg-opacity-80"
                                            }`}>
                                            {msg.text}
                                        </span>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 opacity-70">
                                            {msg.role === "bot" ? "Bot" : "You"} - {msg.timestamp.toLocaleTimeString()}
                                        </p>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            {error && (
                                <div className="text-red-500 text-sm mb-4 p-2 bg-red-100 border border-red-300 rounded-md">
                                    {error}
                                </div>
                            )}
                            <div className="flex items-center mt-6">
                                <input
                                    type="text"
                                    placeholder="Type your message here..."
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    className="flex-1 p-3 rounded-l-lg border-t border-b border-l focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ease-in-out bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </SheetContent>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default ChatBot