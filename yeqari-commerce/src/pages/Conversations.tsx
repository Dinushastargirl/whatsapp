import React, { useState } from 'react';
import { Search, Send, CheckCircle2, Sparkles } from 'lucide-react';

const chatList = [
  { id: 1, name: 'Nadeesha', message: 'Is the black dress available?', time: '10:42 AM', unread: true },
  { id: 2, name: 'Amaya', message: 'Can you deliver tomorrow?', time: '09:15 AM', unread: false },
  { id: 3, name: 'Tharushi', message: 'I need size M.', time: 'Yesterday', unread: false },
];

export default function Conversations() {
  const [inputText, setInputText] = useState('');
  const [showAIPanel, setShowAIPanel] = useState(true);

  return (
    <div className="flex h-[calc(100vh-8rem)] -m-6 bg-white border-t border-slate-200">
      
      {/* Chat List (Left) */}
      <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chatList.map((chat) => (
            <div 
              key={chat.id} 
              className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors ${chat.id === 1 ? 'bg-white border-l-4 border-l-brand-500' : ''}`}
            >
              <div className="flex justify-between items-baseline mb-1">
                <h4 className={`text-sm font-semibold ${chat.id === 1 ? 'text-slate-900' : 'text-slate-700'}`}>{chat.name}</h4>
                <span className="text-xs text-slate-500">{chat.time}</span>
              </div>
              <p className={`text-sm truncate ${chat.unread ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                {chat.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window (Middle) */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white shadow-sm z-10">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Nadeesha</h3>
            <p className="text-xs text-green-600 flex items-center mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
              Online
            </p>
          </div>
          <button 
            onClick={() => setShowAIPanel(!showAIPanel)}
            className={`p-2 rounded-lg transition-colors ${showAIPanel ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            <Sparkles className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
          <div className="flex flex-col space-y-2 max-w-md">
            <span className="text-xs text-slate-500 ml-1">Nadeesha • 10:40 AM</span>
            <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-slate-200 text-slate-800 shadow-sm">
              Hi, is the black dress available?
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 max-w-md self-end ml-auto items-end">
            <span className="text-xs text-slate-500 mr-1">You • 10:41 AM</span>
            <div className="bg-brand-600 p-3 rounded-2xl rounded-tr-sm text-white shadow-sm">
              Yes, size M is available.
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 max-w-md">
            <span className="text-xs text-slate-500 ml-1">Nadeesha • 10:42 AM</span>
            <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-slate-200 text-slate-800 shadow-sm">
              I need one in medium.<br/>Can you send to Kandy?
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-sm"
            />
            <button className="p-2.5 rounded-full bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-sm flex-shrink-0">
              <Send className="h-5 w-5 ml-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Panel (Right) */}
      {showAIPanel && (
        <div className="w-80 border-l border-slate-200 bg-white flex flex-col animate-in slide-in-from-right-8 duration-200">
          <div className="p-4 border-b border-slate-200 bg-indigo-50/50 flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <h3 className="font-semibold text-indigo-900 text-sm tracking-wide uppercase">AI Order Detection</h3>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="mb-6 flex items-center justify-between text-xs font-medium text-slate-500 bg-slate-50 px-3 py-2 rounded-lg">
              <span>Confidence</span>
              <span className="text-green-600 flex items-center">
                96% <CheckCircle2 className="h-3 w-3 ml-1" />
              </span>
            </div>
            
            <div className="space-y-4 mb-8">
              <div>
                <span className="block text-xs font-medium text-slate-500 mb-1">Product</span>
                <div className="text-sm font-semibold text-slate-900 bg-white border border-slate-200 rounded-md px-3 py-2">
                  Black Dress
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-medium text-slate-500 mb-1">Variant/Size</span>
                  <div className="text-sm font-semibold text-slate-900 bg-white border border-slate-200 rounded-md px-3 py-2">
                    M
                  </div>
                </div>
                <div>
                  <span className="block text-xs font-medium text-slate-500 mb-1">Quantity</span>
                  <div className="text-sm font-semibold text-slate-900 bg-white border border-slate-200 rounded-md px-3 py-2">
                    1
                  </div>
                </div>
              </div>
              
              <div>
                <span className="block text-xs font-medium text-slate-500 mb-1">Delivery Location</span>
                <div className="text-sm font-semibold text-slate-900 bg-white border border-slate-200 rounded-md px-3 py-2">
                  Kandy
                </div>
              </div>
            </div>
            
            <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center space-x-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Create Order</span>
            </button>
            <p className="text-center text-xs text-slate-400 mt-3">Review details before creating order</p>
          </div>
        </div>
      )}
      
    </div>
  );
}
