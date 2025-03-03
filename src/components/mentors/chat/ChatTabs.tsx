
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MessageSquare, Mic, Video } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TextChatTab from './TextChatTab';
import AudioChatTab from './AudioChatTab';
import VideoChatTab from './VideoChatTab';
import { Message } from '@/hooks/useMentorshipMessages';

interface ChatTabsProps {
  messages: Message[];
  loading: boolean;
  sending: boolean;
  mentorshipActive: boolean;
  mentorName: string;
  sendMessage: (content: string) => Promise<void>;
}

const ChatTabs: React.FC<ChatTabsProps> = ({
  messages,
  loading,
  sending,
  mentorshipActive,
  mentorName,
  sendMessage
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('text');
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isAudioCall, setIsAudioCall] = useState(false);

  return (
    <Tabs defaultValue="text" className="flex-1 flex flex-col" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="text">
          <MessageSquare className="h-4 w-4 mr-2" />
          {t('chat.text')}
        </TabsTrigger>
        <TabsTrigger value="audio">
          <Mic className="h-4 w-4 mr-2" />
          {t('chat.audio')}
        </TabsTrigger>
        <TabsTrigger value="video">
          <Video className="h-4 w-4 mr-2" />
          {t('chat.video')}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="text" className="flex-1 overflow-hidden flex flex-col">
        <TextChatTab 
          messages={messages}
          loading={loading}
          sending={sending}
          mentorshipActive={mentorshipActive}
          onSendMessage={sendMessage}
        />
      </TabsContent>
      
      <TabsContent value="audio" className="flex-1">
        <AudioChatTab 
          mentorName={mentorName}
          isAudioCall={isAudioCall}
          isRecording={isRecording}
          setIsAudioCall={setIsAudioCall}
          setIsRecording={setIsRecording}
        />
      </TabsContent>
      
      <TabsContent value="video" className="flex-1">
        <VideoChatTab 
          isVideoCall={isVideoCall}
          setIsVideoCall={setIsVideoCall}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ChatTabs;
