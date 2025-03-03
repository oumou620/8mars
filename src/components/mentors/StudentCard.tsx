import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ChatDialog from './ChatDialog';
import { useAuth } from '@/contexts/AuthContext';

export interface Student {
  id: string;
  name: string;
  email: string;
  request_id: string;
  request_date: string;
  status: string;
}

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [chatOpen, setChatOpen] = useState(false);
  
  return (
    <Card className="h-full flex flex-col animate-scale-up transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <div className="flex gap-4 items-start">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
            {student.name.substring(0, 1).toUpperCase()}
          </div>
          <div>
            <CardTitle className="text-lg">{student.name}</CardTitle>
            <CardDescription className="text-sm">
              {student.email}
            </CardDescription>
            <div className="flex items-center text-xs text-gray-500 mt-2">
              <Clock className="h-3 w-3 mr-1" />
              {t('mentors.request_date')}: {new Date(student.request_date).toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {student.status}
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button 
          onClick={() => setChatOpen(true)}
          className="gap-2 w-full"
        >
          <MessageCircle className="h-4 w-4" />
          {t('mentors.chat')}
        </Button>
      </CardFooter>
      
      <ChatDialog 
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        studentId={student.id}
        studentName={student.name}
        mentorId={user?.id || ''}
      />
    </Card>
  );
};

export default StudentCard;
