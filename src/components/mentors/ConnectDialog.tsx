
import React, { useState } from 'react';
import { Handshake } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ConnectDialogProps {
  mentor: {
    id: string;
    name: string;
    specialty: string;
    image: string;
  };
}

const ConnectDialog = ({ mentor }: ConnectDialogProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleConnect = async () => {
    // Check if user is logged in
    if (!user) {
      setIsDialogOpen(false);
      toast.error("Connexion requise", {
        description: "Vous devez être connecté pour envoyer une demande de mentorat",
        duration: 5000,
      });
      // Redirect to login page
      navigate('/auth');
      return;
    }
    
    // Make sure the user is not trying to connect with themselves
    if (user.id === mentor.id) {
      setIsDialogOpen(false);
      toast.error("Vous ne pouvez pas vous envoyer une demande à vous-même", {
        description: "Vous êtes le mentor pour ce profil",
        duration: 5000,
      });
      return;
    }
    
    setIsConnecting(true);
    
    try {
      console.log("Sending mentoring request:", {
        mentor_id: mentor.id,
        learner_id: user.id,
        message: message,
        status: 'pending'
      });
      
      // Create a mentoring request in the database
      const { error } = await supabase
        .from('mentoring_requests')
        .insert({
          mentor_id: mentor.id,
          learner_id: user.id,
          message: message,
          status: 'pending'
        });
      
      if (error) {
        throw error;
      }
      
      setIsConnecting(false);
      setIsDialogOpen(false);
      setMessage('');
      
      // Show success toast
      toast.success(t('mentors.connect_success', { mentor: mentor.name }), {
        description: t('mentors.connect_details'),
        duration: 5000,
      });
    } catch (error) {
      console.error('Error creating mentoring request:', error);
      setIsConnecting(false);
      
      // Show error toast
      toast.error("Erreur lors de l'envoi de la demande", {
        description: "Veuillez réessayer plus tard",
        duration: 5000,
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2 bg-orange-600 hover:bg-orange-700 text-white transition-all">
          <Handshake className="h-4 w-4" />
          {t('mentors.connect')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('mentors.connect_title')}</DialogTitle>
          <DialogDescription>
            {t('mentors.connect_description', { mentor: mentor.name })}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center gap-4 mb-4">
            <img src={mentor.image} alt={mentor.name} className="h-16 w-16 rounded-full object-cover" />
            <div>
              <h4 className="text-sm font-medium">{mentor.name}</h4>
              <p className="text-sm text-gray-500">{mentor.specialty}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {t('mentors.connect_info')}
          </p>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message pour {mentor.name}
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Expliquez pourquoi vous souhaitez être mentoré(e) par ce mentor..."
              className="resize-none"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t('common.cancel')}</Button>
          <Button 
            className="gap-2 bg-orange-600 hover:bg-orange-700 text-white"
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-opacity-25 border-t-white"></div>
                {t('mentors.connecting')}
              </>
            ) : (
              <>
                <Handshake className="h-4 w-4" />
                {t('mentors.confirm_connect')}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectDialog;
