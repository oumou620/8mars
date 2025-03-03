
import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Message } from '@/hooks/useMentorshipMessages';

interface TextChatTabProps {
  messages: Message[];
  loading: boolean;
  sending: boolean;
  mentorshipActive: boolean;
  onSendMessage: (content: string) => void;
}

const TextChatTab: React.FC<TextChatTabProps> = ({
  messages,
  loading,
  sending,
  mentorshipActive,
  onSendMessage
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sending) return;
    
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 border rounded-md bg-gray-50 mb-3" 
        style={{ minHeight: '250px', maxHeight: 'calc(100vh - 350px)' }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p>{t('chat.no_messages')}</p>
            <p className="text-sm mt-2">{t('chat.start_conversation')}</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`mb-4 ${msg.sender_id === user?.id ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.sender_id === user?.id 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p>{msg.content}</p>
                  <span className="text-xs opacity-75 block mt-1">
                    {new Date(msg.created_at).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="sticky bottom-0 bg-white py-2 z-10">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('chat.type_message')}
            disabled={!mentorshipActive || sending}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={!mentorshipActive || !message.trim() || sending}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TextChatTab;
