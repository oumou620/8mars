
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { createMentorProfile, checkMentorProfile } from '@/integrations/supabase/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UserCircle2, Camera, Upload } from 'lucide-react';

const MentorProfileCreator = () => {
  const { t } = useLanguage();
  const { user, userType } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [bio, setBio] = useState('');
  const [availability, setAvailability] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkProfile = async () => {
      if (!user || userType !== 'mentor') return;
      
      setIsLoading(true);
      try {
        const profile = await checkMentorProfile();
        if (profile) {
          setHasProfile(true);
          setName(profile.name || '');
          setRole(profile.role || '');
          setCompany(profile.company || '');
          setSpecialty(profile.specialty || '');
          setBio(profile.bio || '');
          setAvailability(profile.availability || '');
          setProfileImage(profile.image || null);
        }
      } catch (error) {
        console.error('Error checking mentor profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkProfile();
  }, [user, userType]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // Simulating upload delay for demo purposes
        setTimeout(() => {
          setProfileImage(reader.result as string);
          setIsUploading(false);
          toast.success("Photo de profil chargée avec succès");
        }, 1500);
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Vous devez être connecté pour créer un profil de mentor');
      navigate('/auth');
      return;
    }
    
    if (userType !== 'mentor') {
      toast.error('Vous devez être un mentor pour créer un profil de mentor');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createMentorProfile({
        name,
        role,
        company,
        specialty,
        bio,
        availability,
        image: profileImage || undefined
      });
      
      navigate('/profile');
      toast.success('Votre profil de mentor a été créé avec succès !');
    } catch (error) {
      console.error('Error creating mentor profile:', error);
      toast.error('Une erreur est survenue lors de la création de votre profil de mentor');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-100">
        <div className="flex flex-col items-center">
          <div className="relative group mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-purple-50 flex items-center justify-center relative">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserCircle2 className="h-16 w-16 text-purple-800" />
              )}
              
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
                </div>
              )}
              
              <label htmlFor="mentor-profile-picture" className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100">
                <Camera className="h-8 w-8 text-white" />
                <input 
                  type="file" 
                  id="mentor-profile-picture" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>
            </div>
            <div className="text-sm text-center mt-1 text-gray-500">Ajoutez une photo de profil</div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {hasProfile ? 'Modifier votre profil de mentor' : 'Créer votre profil de mentor'}
          </CardTitle>
        </div>
        <CardDescription className="text-center">
          {hasProfile 
            ? 'Mettez à jour vos informations pour les apprenants' 
            : 'Remplissez ce formulaire pour devenir visible par les apprenants'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Votre nom complet"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Poste / Fonction</Label>
              <Input 
                id="role" 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                placeholder="Développeur senior, Designer, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Entreprise</Label>
              <Input 
                id="company" 
                value={company} 
                onChange={(e) => setCompany(e.target.value)} 
                placeholder="Nom de votre entreprise"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialty">Spécialité</Label>
              <Input 
                id="specialty" 
                value={specialty} 
                onChange={(e) => setSpecialty(e.target.value)} 
                placeholder="React, UI/UX, Backend, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Biographie</Label>
              <Textarea 
                id="bio" 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                placeholder="Parlez de votre expérience et de ce que vous pouvez apporter aux apprenants"
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="availability">Disponibilité</Label>
              <Input 
                id="availability" 
                value={availability} 
                onChange={(e) => setAvailability(e.target.value)} 
                placeholder="2 heures par semaine, Weekends, etc."
                required
              />
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isSubmitting || isUploading}
            >
              {isSubmitting 
                ? "Enregistrement..." 
                : hasProfile 
                  ? "Mettre à jour le profil" 
                  : "Créer mon profil de mentor"
              }
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 border-t border-gray-100">
        <Button 
          variant="outline" 
          className="text-gray-600" 
          onClick={() => navigate('/')}
        >
          Retour
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MentorProfileCreator;
