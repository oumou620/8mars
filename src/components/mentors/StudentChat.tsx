
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mentor } from '@/components/mentors/MentorCard';
import StudentChatDialog from './StudentChatDialog';

interface StudentChatProps {
  mentor: Mentor;
}

const StudentChat: React.FC<StudentChatProps> = ({ mentor }) => {
  const { t } = useLanguage();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setChatOpen(true)}
        className="gap-2 w-full"
      >
        <MessageCircle className="h-4 w-4" />
        {t('mentors.chat')}
      </Button>
      
      <StudentChatDialog 
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        mentorId={mentor.id}
        mentorName={mentor.name}
      />
    </>
  );
};

export default StudentChat;
