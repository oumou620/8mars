
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserType } from '@/contexts/AuthContext';
import ProfileHeader from './components/ProfileHeader';
import ProfileFormContent from './components/ProfileFormContent';
import ProfileFooter from './components/ProfileFooter';

interface ProfileFormProps {
  name: string;
  setName: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<boolean>;
  userType: UserType;
  isLoading: boolean;
  user: any;
  signOut: () => Promise<void>;
  profilePicture: string | null;
  setProfilePicture: (url: string | null) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ 
  name, 
  setName, 
  bio, 
  setBio, 
  isSubmitting, 
  handleSubmit, 
  userType,
  isLoading,
  user,
  signOut,
  profilePicture,
  setProfilePicture
}) => {
  // Define theme colors based on user type
  const isLearner = userType === 'learner';
  const bgGradient = isLearner 
    ? 'bg-gradient-to-r from-orange-50 to-orange-100'
    : 'bg-gradient-to-r from-purple-50 to-purple-100';
  
  const borderColor = isLearner ? 'border-orange-100' : 'border-purple-100';
  const primaryBgColor = isLearner ? 'bg-orange-600' : 'bg-purple-600';
  const primaryHoverColor = isLearner ? 'hover:bg-orange-700' : 'hover:bg-purple-700';
  const secondaryBgColor = isLearner ? 'bg-orange-50' : 'bg-purple-50';
  const secondaryTextColor = isLearner ? 'text-orange-800' : 'text-purple-800';
  
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(e);
  };
  
  return (
    <Card className={`shadow-lg ${borderColor}`}>
      <ProfileHeader
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
        userType={userType}
        bgGradient={bgGradient}
        borderColor={borderColor}
        secondaryBgColor={secondaryBgColor}
        secondaryTextColor={secondaryTextColor}
      />
      
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className={`h-8 w-8 animate-spin rounded-full border-4 ${borderColor} border-t-transparent`}></div>
          </div>
        ) : (
          <form onSubmit={onFormSubmit}>
            <ProfileFormContent
              name={name}
              setName={setName}
              bio={bio}
              setBio={setBio}
              user={user}
              userType={userType}
              isSubmitting={isSubmitting}
              primaryBgColor={primaryBgColor}
              primaryHoverColor={primaryHoverColor}
            />
          </form>
        )}
      </CardContent>
      
      <ProfileFooter signOut={signOut} />
    </Card>
  );
};

export default ProfileForm;
