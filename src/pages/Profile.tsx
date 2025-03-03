
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import MentorDashboard from '@/components/profile/mentor/MentorDashboard';
import LearnerDashboard from '@/components/profile/learner/LearnerDashboard';
import RequestDetailsDialog from '@/components/profile/mentor/RequestDetailsDialog';
import { useProfileData } from '@/hooks/useProfileData';
import { useMentorRequests } from '@/hooks/useMentorRequests';

const Profile = () => {
  const { user, userType, signOut } = useAuth();
  const navigate = useNavigate();
  
  const {
    name, setName,
    bio, setBio,
    profilePicture, setProfilePicture,
    isSubmitting,
    isLoading,
    hasMentorProfile,
    handleSubmit
  } = useProfileData();
  
  const {
    mentoringRequests,
    loadingRequests,
    selectedRequest,
    showRequestDialog,
    setShowRequestDialog,
    loadMentoringRequests,
    handleRequestAction,
    openRequestDetails
  } = useMentorRequests();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (userType === 'mentor' && hasMentorProfile) {
      loadMentoringRequests();
    }
  }, [user, userType, hasMentorProfile, navigate, loadMentoringRequests]);

  const onSubmitProfile = async (e: React.FormEvent) => {
    const success = await handleSubmit(e);
    if (success) {
      return success;
    }
  };

  const handleRequest = async (requestId: string, status: "accepted" | "rejected") => {
    return handleRequestAction(requestId, status);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {userType === 'mentor' ? (
          <MentorDashboard 
            hasMentorProfile={hasMentorProfile}
            name={name}
            setName={setName}
            bio={bio}
            setBio={setBio}
            isSubmitting={isSubmitting}
            handleSubmit={onSubmitProfile}
            userType={userType}
            mentoringRequests={mentoringRequests}
            loadingRequests={loadingRequests}
            openRequestDetails={openRequestDetails}
            handleRequestAction={handleRequest}
            isLoading={isLoading}
            user={user}
            signOut={signOut}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
          />
        ) : (
          <LearnerDashboard 
            name={name}
            setName={setName}
            bio={bio}
            setBio={setBio}
            isSubmitting={isSubmitting}
            handleSubmit={onSubmitProfile}
            userType={userType}
            isLoading={isLoading}
            user={user}
            signOut={signOut}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
          />
        )}
        
        <RequestDetailsDialog 
          showRequestDialog={showRequestDialog}
          setShowRequestDialog={setShowRequestDialog}
          selectedRequest={selectedRequest}
          handleRequestAction={handleRequestAction}
        />
      </div>
    </div>
  );
};

export default Profile;
