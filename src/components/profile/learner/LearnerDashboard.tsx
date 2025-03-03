
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, BookOpen, GraduationCap, Beaker } from 'lucide-react';
import ProfileForm from '../ProfileForm';
import { UserType } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import ProfileTab from './ProfileTab';
import CoursesTab from './CoursesTab';
import LabsTab from './LabsTab';
import ProgressTab from './ProgressTab';

interface LearnerDashboardProps {
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

const LearnerDashboard: React.FC<LearnerDashboardProps> = ({
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
  const { t } = useLanguage();
  
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Profil
        </TabsTrigger>
        <TabsTrigger value="courses" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Mes cours
        </TabsTrigger>
        <TabsTrigger value="labs" className="flex items-center gap-2">
          <Beaker className="h-4 w-4" />
          Laboratoires
        </TabsTrigger>
        <TabsTrigger value="progress" className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          Progression
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <ProfileTab
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
      </TabsContent>
      
      <TabsContent value="courses">
        <CoursesTab />
      </TabsContent>
      
      <TabsContent value="labs">
        <LabsTab />
      </TabsContent>
      
      <TabsContent value="progress">
        <ProgressTab />
      </TabsContent>
    </Tabs>
  );
};

export default LearnerDashboard;
