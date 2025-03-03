
import React from 'react';
import ProfileForm from '../ProfileForm';
import { UserType } from '@/contexts/AuthContext';

interface ProfileTabProps {
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

const ProfileTab: React.FC<ProfileTabProps> = ({
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
  return (
    <ProfileForm 
      name={name}
      setName={setName}
      bio={bio}
      setBio={setBio}
      isSubmitting={isSubmitting}
      handleSubmit={handleSubmit}
      userType={userType}
      isLoading={isLoading}
      user={user}
      signOut={signOut}
      profilePicture={profilePicture}
      setProfilePicture={setProfilePicture}
    />
  );
};

export default ProfileTab;
