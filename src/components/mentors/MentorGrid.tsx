
import React from 'react';
import { MessageSquareOff, Users, Clock, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import MentorCard, { Mentor } from '@/components/mentors/MentorCard';
import StudentCard, { Student } from '@/components/mentors/StudentCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MentorGridProps {
  isLoading: boolean;
  filteredMentors: Mentor[];
  filteredStudents: Student[];
}

const MentorGrid: React.FC<MentorGridProps> = ({ 
  isLoading, 
  filteredMentors, 
  filteredStudents 
}) => {
  const { t } = useLanguage();
  const { userType } = useAuth();
  
  if (isLoading) {
    return null;
  }
  
  if (userType === 'learner') {
    if (filteredMentors.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <MessageSquareOff className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-4 text-gray-500">{t('mentors.no_results')}</p>
        </div>
      );
    }
    
    return (
      <>
        {filteredMentors.map(mentor => (
          <MentorCard 
            key={mentor.id} 
            mentor={mentor} 
            showChatButton={true}
          />
        ))}
      </>
    );
  }
  
  if (userType === 'mentor') {
    if (filteredStudents.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <Users className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-4 text-gray-500">{t('mentors.no_students')}</p>
        </div>
      );
    }
    
    return (
      <>
        {filteredStudents.map(student => (
          <StudentCard 
            key={student.id} 
            student={student}
          />
        ))}
      </>
    );
  }
  
  return null;
};

export default MentorGrid;
