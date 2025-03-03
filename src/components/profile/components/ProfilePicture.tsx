
import React, { useState } from 'react';
import { UserCircle2, Camera } from 'lucide-react';
import { toast } from 'sonner';

interface ProfilePictureProps {
  profilePicture: string | null;
  setProfilePicture: (url: string | null) => void;
  secondaryBgColor: string;
  secondaryTextColor: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  profilePicture,
  setProfilePicture,
  secondaryBgColor,
  secondaryTextColor
}) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // In a real implementation, you would upload the file to a storage service
        // and then store the URL in the user's profile
        setProfilePicture(reader.result as string);
        setIsUploading(false);
        toast.success("Photo de profil mise à jour avec succès");
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="relative group mb-3">
      <div className={`w-24 h-24 rounded-full overflow-hidden ${secondaryBgColor} flex items-center justify-center relative`}>
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <UserCircle2 className={`h-16 w-16 ${secondaryTextColor}`} />
        )}
        
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
          </div>
        )}
        
        <label htmlFor="profile-picture" className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100">
          <Camera className="h-8 w-8 text-white" />
          <input 
            type="file" 
            id="profile-picture" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>
      <div className="text-sm text-center mt-1 text-gray-500">Cliquez pour changer</div>
    </div>
  );
};

export default ProfilePicture;
