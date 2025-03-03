
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { fetchMentoringRequestsSimple, updateMentoringRequestStatus, supabase } from '@/integrations/supabase/client';

export const useMentorRequests = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [mentoringRequests, setMentoringRequests] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showRequestDialog, setShowRequestDialog] = useState(false);

  const loadMentoringRequests = async () => {
    if (!user) return;
    
    setLoadingRequests(true);
    try {
      const requests = await fetchMentoringRequestsSimple(user.id);
      
      const enrichedRequests = await Promise.all(
        requests.map(async (request) => {
          try {
            const { data: learnerData } = await supabase.auth.admin.getUserById(request.learner_id);
            const learner = learnerData?.user ? {
              id: learnerData.user.id,
              email: learnerData.user.email,
              name: learnerData.user.user_metadata?.name || learnerData.user.email
            } : null;
            
            return {
              ...request,
              learner
            };
          } catch (error) {
            console.error(`Error fetching learner data for ${request.learner_id}:`, error);
            return {
              ...request,
              learner: { name: "Utilisateur inconnu", email: "N/A" }
            };
          }
        })
      );
      
      setMentoringRequests(enrichedRequests);
    } catch (error) {
      console.error('Error loading mentoring requests:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les demandes de mentorat",
        variant: "destructive",
      });
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleRequestAction = async (requestId: string, status: 'accepted' | 'rejected') => {
    const success = await updateMentoringRequestStatus(requestId, status);
    if (success) {
      setMentoringRequests(prevRequests => 
        prevRequests.map(req => 
          req.id === requestId ? { ...req, status } : req
        )
      );
      setShowRequestDialog(false);
    }
  };

  const openRequestDetails = (request: any) => {
    setSelectedRequest(request);
    setShowRequestDialog(true);
  };

  return {
    mentoringRequests,
    loadingRequests,
    selectedRequest,
    showRequestDialog,
    setShowRequestDialog,
    loadMentoringRequests,
    handleRequestAction,
    openRequestDetails
  };
};
