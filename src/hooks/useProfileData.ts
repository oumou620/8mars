
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase, checkMentorProfile } from '@/integrations/supabase/client';

export const useProfileData = () => {
  const { user, userType } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMentorProfile, setHasMentorProfile] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw userError;
        }
        
        if (userData && userData.user && userData.user.user_metadata) {
          const metadata = userData.user.user_metadata;
          setName(metadata.name || '');
          setBio(metadata.bio || '');
          setProfilePicture(metadata.profile_picture || null);
        }

        if (userType === 'mentor') {
          const mentorProfile = await checkMentorProfile();
          setHasMentorProfile(!!mentorProfile);
          if (mentorProfile && mentorProfile.image) {
            setProfilePicture(mentorProfile.image);
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les informations du profil",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserProfile();
  }, [user, toast, userType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return false;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name,
          bio,
          profile_picture: profilePicture,
        }
      });
      
      if (error) throw error;

      // If this is a mentor, also update the mentor profile with the new image
      if (userType === 'mentor' && hasMentorProfile) {
        const { error: mentorError } = await supabase
          .from('mentors')
          .update({ image: profilePicture, bio, name })
          .eq('id', user.id);
          
        if (mentorError) throw mentorError;
      }
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès",
      });
      
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    bio,
    setBio,
    profilePicture,
    setProfilePicture,
    isSubmitting,
    isLoading,
    hasMentorProfile,
    handleSubmit,
  };
};
