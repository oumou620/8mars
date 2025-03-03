
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UserType } from '@/contexts/AuthContext';

interface ProfileFormContentProps {
  name: string;
  setName: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  user: any;
  userType: UserType;
  isSubmitting: boolean;
  primaryBgColor: string;
  primaryHoverColor: string;
}

const ProfileFormContent: React.FC<ProfileFormContentProps> = ({
  name,
  setName,
  bio,
  setBio,
  user,
  userType,
  isSubmitting,
  primaryBgColor,
  primaryHoverColor
}) => {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
        <Input 
          id="email" 
          value={user?.email} 
          disabled 
          className="bg-gray-50"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-700 font-medium">Nom complet</Label>
        <Input 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Votre nom complet"
          className="border-gray-300 focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-gray-700 font-medium">Bio</Label>
        <Input 
          id="bio" 
          value={bio} 
          onChange={(e) => setBio(e.target.value)} 
          placeholder={userType === 'mentor' ? "Parlez de votre expérience professionnelle" : "Parlez de votre parcours d'apprentissage"}
          className="border-gray-300 focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
          required
        />
      </div>
      
      {userType === 'mentor' && (
        <div className="p-4 bg-purple-50 rounded-md border border-purple-100 shadow-sm">
          <p className="text-sm text-purple-800">
            En tant que mentor, vous pourrez partager votre expertise et guider les apprenants dans leur parcours.
          </p>
        </div>
      )}
      
      {userType === 'learner' && (
        <div className="p-4 bg-orange-50 rounded-md border border-orange-100 shadow-sm">
          <p className="text-sm text-orange-800">
            En tant qu'apprenant, vous aurez accès à nos ressources d'apprentissage et pourrez être guidé par nos mentors.
          </p>
        </div>
      )}

      <div className="mt-6">
        <Button 
          type="submit" 
          className={`w-full ${primaryBgColor} ${primaryHoverColor} transition-colors shadow-sm`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileFormContent;
