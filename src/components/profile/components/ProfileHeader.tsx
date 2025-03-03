
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ProfilePicture from './ProfilePicture';
import { UserType } from '@/contexts/AuthContext';

interface ProfileHeaderProps {
  profilePicture: string | null;
  setProfilePicture: (url: string | null) => void;
  userType: UserType;
  bgGradient: string;
  borderColor: string;
  secondaryBgColor: string;
  secondaryTextColor: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profilePicture,
  setProfilePicture,
  userType,
  bgGradient,
  borderColor,
  secondaryBgColor,
  secondaryTextColor
}) => {
  return (
    <CardHeader className={`${bgGradient} border-b ${borderColor}`}>
      <div className="flex flex-col items-center mb-2">
        <ProfilePicture
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          secondaryBgColor={secondaryBgColor}
          secondaryTextColor={secondaryTextColor}
        />
        <CardTitle className="text-2xl font-bold text-center">Mon Profil</CardTitle>
      </div>
      <CardDescription className="text-center">
        {userType === 'mentor' ? 'Profil Mentor' : 'Profil Apprenant'}
      </CardDescription>
    </CardHeader>
  );
};

export default ProfileHeader;
