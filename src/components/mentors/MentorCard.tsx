
import React, { useState, useEffect } from 'react';
import { Calendar, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ConnectDialog from './ConnectDialog';
import StudentChat from './StudentChat';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Define the Mentor type
export type Mentor = {
  id: string;
  name: string;
  role: string;
  company: string;
  specialty: string;
  image: string;
  bio: string;
  availability: string;
  rating: number;
};

interface MentorCardProps {
  mentor: Mentor;
  showChatButton?: boolean;
}

const MentorCard = ({ mentor, showChatButton = false }: MentorCardProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [hasActiveConnection, setHasActiveConnection] = useState(false);

  useEffect(() => {
    // Check if there's an active mentorship when the component mounts
    const checkMentorshipStatus = async () => {
      if (!user || !mentor.id) return;
      
      try {
        const { data, error } = await supabase
          .from('mentoring_requests')
          .select('*')
          .eq('mentor_id', mentor.id)
          .eq('learner_id', user.id)
          .eq('status', 'accepted')
          .maybeSingle();
        
        if (error) {
          console.error('Error checking mentorship status:', error);
        } else {
          setHasActiveConnection(!!data);
        }
      } catch (err) {
        console.error('Failed to check mentorship status:', err);
      }
    };

    if (showChatButton) {
      checkMentorshipStatus();
    }
  }, [user, mentor.id, showChatButton]);
  
  return (
    <Card className="h-full flex flex-col animate-scale-up transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex gap-4 items-start">
          <img 
            src={mentor.image} 
            alt={mentor.name} 
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <CardTitle className="text-lg">{mentor.name}</CardTitle>
            <CardDescription className="text-sm">
              {mentor.role} {t('mentors.at')} {mentor.company}
            </CardDescription>
            <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              {mentor.specialty}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-gray-600 mb-3">{mentor.bio}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{t('mentors.availability')}: {mentor.availability}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>{mentor.rating}/5</span>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        {showChatButton && hasActiveConnection ? (
          <StudentChat mentor={mentor} />
        ) : (
          <ConnectDialog mentor={mentor} />
        )}
      </CardFooter>
    </Card>
  );
};

export default MentorCard;
