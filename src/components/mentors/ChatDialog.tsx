
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMentorChat } from '@/hooks/useMentorChat';
import ChatTabs from './chat/ChatTabs';
import { MessageCircle } from 'lucide-react';

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
  mentorId: string;
}

const ChatDialog: React.FC<ChatDialogProps> = ({
  isOpen,
  onClose,
  studentId,
  studentName,
  mentorId,
}) => {
  const { t } = useLanguage();
  
  const {
    messages,
    loading,
    sending,
    mentorshipId,
    sendMessage
  } = useMentorChat(studentId, mentorId, isOpen);

  const mentorshipActive = !!mentorshipId;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col overflow-hidden border-purple-100 shadow-lg">
        <DialogHeader className="p-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-purple-100">
          <DialogTitle className="text-xl font-semibold flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-purple-600" />
            {t('chat.with')} {studentName}
          </DialogTitle>
        </DialogHeader>
        
        {!mentorshipActive ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center bg-purple-50 p-6 rounded-lg border border-purple-100 shadow-sm max-w-sm">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <p className="text-purple-800 font-medium mb-2">Aucun mentorat actif</p>
              <p className="text-gray-600 text-sm">
                {t('chat.no_active_mentorship')}
              </p>
            </div>
          </div>
        ) : (
          <ChatTabs
            messages={messages}
            loading={loading}
            sending={sending}
            mentorshipActive={mentorshipActive}
            mentorName={studentName}
            sendMessage={sendMessage}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
