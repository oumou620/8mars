
import React from 'react';
import { MessageSquareOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const InactiveMentorship: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center">
        <MessageSquareOff className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-500 text-lg font-medium">{t('chat.no_mentorship')}</p>
        <p className="text-gray-400 mt-2 text-sm">{t('chat.request_mentorship')}</p>
      </div>
    </div>
  );
};

export default InactiveMentorship;
