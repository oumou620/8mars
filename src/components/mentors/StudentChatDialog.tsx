
import React, { useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useMentorshipMessages } from '@/hooks/useMentorshipMessages';
import ChatDialogHeader from './chat/ChatDialogHeader';
import InactiveMentorship from './chat/InactiveMentorship';
import ChatTabs from './chat/ChatTabs';

interface StudentChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mentorId: string;
  mentorName: string;
}

const StudentChatDialog: React.FC<StudentChatDialogProps> = ({
  isOpen,
  onClose,
  mentorId,
  mentorName,
}) => {
  const {
    messages,
    loading,
    sending,
    mentorshipActive,
    sendMessage
  } = useMentorshipMessages(mentorId, isOpen);

  // Reset states when the dialog is closed
  useEffect(() => {
    if (!isOpen) {
      // Cleanup will be handled in the individual tab components
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        <ChatDialogHeader 
          mentorName={mentorName}
          mentorshipActive={mentorshipActive}
        />
        
        {mentorshipActive ? (
          <ChatTabs
            messages={messages}
            loading={loading}
            sending={sending}
            mentorshipActive={mentorshipActive}
            mentorName={mentorName}
            sendMessage={sendMessage}
          />
        ) : (
          <InactiveMentorship />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StudentChatDialog;
