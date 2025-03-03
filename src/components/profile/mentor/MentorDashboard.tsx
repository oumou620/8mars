
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Beaker, Users, Calendar, GraduationCap, ChevronRight, BookOpen, Award } from 'lucide-react';
import ProfileForm from '../ProfileForm';
import MentoringRequestsTab from './MentoringRequestsTab';
import MentorProfileCreator from '@/components/mentors/MentorProfileCreator';
import { UserType } from '@/contexts/AuthContext';

interface MentorRequest {
  id: string;
  learner_id: string;
  mentor_id: string;
  status: string;
  message?: string;
  created_at: string;
}

interface MentorDashboardProps {
  hasMentorProfile: boolean;
  name: string;
  setName: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<boolean>;
  userType: UserType;
  mentoringRequests: MentorRequest[];
  loadingRequests: boolean;
  openRequestDetails: (request: MentorRequest) => void;
  handleRequestAction: (requestId: string, status: 'accepted' | 'rejected') => Promise<void>;
  isLoading: boolean;
  user: any;
  signOut: () => Promise<void>;
  profilePicture: string | null;
  setProfilePicture: (url: string | null) => void;
}

const MentorDashboard: React.FC<MentorDashboardProps> = ({
  hasMentorProfile,
  name,
  setName,
  bio,
  setBio,
  isSubmitting,
  handleSubmit,
  userType,
  mentoringRequests,
  loadingRequests,
  openRequestDetails,
  handleRequestAction,
  isLoading,
  user,
  signOut,
  profilePicture,
  setProfilePicture
}) => {
  const [activeTab, setActiveTab] = useState("profile");
  
  if (!hasMentorProfile) {
    return <MentorProfileCreator />;
  }
  
  const pendingRequestsCount = mentoringRequests?.filter(req => req.status === 'pending').length || 0;
  
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg shadow-sm">
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="profile" className="data-[state=active]:bg-purple-100">
            Profil
          </TabsTrigger>
          <TabsTrigger value="requests" className="data-[state=active]:bg-purple-100">
            Demandes
            {pendingRequestsCount > 0 && (
              <Badge variant="destructive" className="ml-2 bg-purple-600">
                {pendingRequestsCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="students" className="data-[state=active]:bg-purple-100">
            Étudiants
          </TabsTrigger>
          <TabsTrigger value="labs" className="data-[state=active]:bg-purple-100">
            Laboratoire
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="requests">
          <MentoringRequestsTab 
            mentoringRequests={mentoringRequests}
            loadingRequests={loadingRequests}
            openRequestDetails={openRequestDetails}
            handleRequestAction={handleRequestAction}
          />
        </TabsContent>
        
        <TabsContent value="students">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mes Étudiants</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-purple-100 rounded-md bg-purple-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sessions de Mentorat</h3>
                    <p className="text-sm text-gray-500">Planifiez des sessions avec vos étudiants</p>
                  </div>
                </div>
                <Button variant="ghost" className="text-purple-600">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-purple-100 rounded-md bg-purple-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center mr-3">
                    <Calendar className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Calendrier des Cours</h3>
                    <p className="text-sm text-gray-500">Gérez votre planning de mentorat</p>
                  </div>
                </div>
                <Button variant="ghost" className="text-purple-600">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-purple-100 rounded-md bg-purple-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center mr-3">
                    <GraduationCap className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Suivi de Progression</h3>
                    <p className="text-sm text-gray-500">Suivez les progrès de vos étudiants</p>
                  </div>
                </div>
                <Button variant="ghost" className="text-purple-600">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="labs">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Laboratoire d'expérimentation</h2>
            <p className="text-gray-600 mb-6">Explorez nos fonctionnalités expérimentales pour améliorer votre expérience de mentorat.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-purple-200 rounded-lg p-5 bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                    <Beaker className="h-5 w-5 text-purple-700" />
                  </div>
                  <h3 className="font-semibold text-lg">Assistant IA</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Utilisez notre IA pour analyser les projets de vos étudiants et générer des feedbacks automatiques.</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Essayer</Button>
              </div>
              
              <div className="border border-purple-200 rounded-lg p-5 bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                    <BookOpen className="h-5 w-5 text-purple-700" />
                  </div>
                  <h3 className="font-semibold text-lg">Analytiques avancées</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Accédez à des métriques détaillées sur l'engagement et la progression de vos étudiants.</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Explorer</Button>
              </div>
              
              <div className="border border-purple-200 rounded-lg p-5 bg-gradient-to-br from-purple-50 to-purple-100 md:col-span-2">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                    <Award className="h-5 w-5 text-purple-700" />
                  </div>
                  <h3 className="font-semibold text-lg">Planification avancée</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Utilisez notre algorithme de planification pour optimiser votre emploi du temps et celui de vos étudiants.</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Découvrir</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorDashboard;
