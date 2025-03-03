
import React from 'react';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ProfileFooterProps {
  signOut: () => Promise<void>;
}

const ProfileFooter: React.FC<ProfileFooterProps> = ({ signOut }) => {
  const navigate = useNavigate();
  
  return (
    <CardFooter className="flex justify-between pt-4 pb-5 bg-gray-50 border-t border-gray-100">
      <Button 
        variant="outline" 
        className="text-gray-600 border-gray-300 hover:bg-gray-100" 
        onClick={() => navigate('/')}
      >
        Retour
      </Button>
      <Button 
        variant="outline" 
        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700" 
        onClick={signOut}
      >
        Déconnexion
      </Button>
    </CardFooter>
  );
};

export default ProfileFooter;
