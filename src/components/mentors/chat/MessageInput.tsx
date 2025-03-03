
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MessageInputProps {
  onSendMessage: (content: string) => Promise<void>;
  disabled: boolean;
  loading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  disabled, 
  loading 
}) => {
  const { t } = useLanguage();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    if (!newMessage.trim() || disabled) return;
    
    await onSendMessage(newMessage);
    setNewMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t p-3 sticky bottom-0 bg-background z-10">
      <div className="flex gap-2">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('chat.type_message')}
          className="min-h-[50px] max-h-[150px] resize-none"
          maxLength={2000}
          disabled={disabled || loading}
        />
        <Button
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || disabled || loading}
          size="icon"
          className="shrink-0"
        >
          <SendHorizontal />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
