
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatDialogHeaderProps {
  mentorName: string;
  mentorshipActive: boolean;
}

const ChatDialogHeader: React.FC<ChatDialogHeaderProps> = ({
  mentorName,
  mentorshipActive
}) => {
  const { t } = useLanguage();

  return (
    <DialogHeader>
      <DialogTitle>{t('chat.title_with_name', { name: mentorName })}</DialogTitle>
      <DialogDescription>
        {mentorshipActive 
          ? t('chat.description') 
          : t('chat.not_active')}
      </DialogDescription>
    </DialogHeader>
  );
};

export default ChatDialogHeader;
