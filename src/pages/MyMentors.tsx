
import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { fetchMentors, fetchStudentsForMentor } from '@/integrations/supabase/client';
import { Mentor } from '@/components/mentors/MentorCard';
import MentorSkeleton from '@/components/mentors/MentorSkeleton';
import MentorsSearchBar from '@/components/mentors/MentorsSearchBar';
import MentorGrid from '@/components/mentors/MentorGrid';
import { Student } from '@/components/mentors/StudentCard';

const MyMentors = () => {
  const { t } = useLanguage();
  const { user, userType } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { 
    data: mentors, 
    isLoading: isMentorsLoading, 
    error: mentorsError 
  } = useQuery({
    queryKey: ['mentors'],
    queryFn: fetchMentors,
    enabled: userType === 'learner'
  });
  
  const {
    data: students,
    isLoading: isStudentsLoading,
    error: studentsError
  } = useQuery({
    queryKey: ['students', user?.id],
    queryFn: () => fetchStudentsForMentor(user?.id || ''),
    enabled: !!user && userType === 'mentor'
  });
  
  useEffect(() => {
    if (mentorsError) {
      toast.error(`${t('mentors.error_loading')}: ${(mentorsError as Error).message}`);
    }
    
    if (studentsError) {
      toast.error(`${t('mentors.error_loading_students')}: ${(studentsError as Error).message}`);
    }
  }, [mentorsError, studentsError, t]);
  
  const filteredMentors = mentors?.filter(mentor => 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.company.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  const filteredStudents = students?.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  const isLoading = (userType === 'learner' && isMentorsLoading) || 
                   (userType === 'mentor' && isStudentsLoading);
  
  console.log({
    user,
    userType,
    mentorsCount: mentors?.length || 0,
    studentsCount: students?.length || 0,
    isLoading
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Users className="h-8 w-8 text-orange-600" />
                {userType === 'mentor' ? t('pages.my_students') : t('pages.my_mentors')}
              </h1>
              <p className="text-gray-600 mt-2">
                {userType === 'mentor' 
                  ? t('mentors.students_description') 
                  : t('mentors.description')}
              </p>
            </div>
            
            <MentorsSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <MentorSkeleton key={i} />
              ))
            ) : (
              <MentorGrid 
                isLoading={isLoading}
                filteredMentors={filteredMentors}
                filteredStudents={filteredStudents}
              />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyMentors;
