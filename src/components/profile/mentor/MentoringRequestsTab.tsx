import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Users, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import RequestDetailsDialog from './RequestDetailsDialog';

interface MentoringRequestsTabProps {
  mentoringRequests: any[];
  loadingRequests: boolean;
  openRequestDetails: (request: any) => void;
  handleRequestAction: (requestId: string, status: 'accepted' | 'rejected') => Promise<void>;
}

const MentoringRequestsTab: React.FC<MentoringRequestsTabProps> = ({ 
  mentoringRequests, 
  loadingRequests, 
  openRequestDetails, 
  handleRequestAction 
}) => {
  const { t } = useLanguage();
  
  if (loadingRequests) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (mentoringRequests.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <Users className="h-12 w-12 mx-auto mb-2 text-purple-400" />
        <p>Vous n'avez pas encore de demandes de mentorat.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {mentoringRequests.map(request => (
        <Card key={request.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{request.learner?.name || 'Étudiant'}</CardTitle>
            <CardDescription>
              <span className={`inline-block px-2 py-1 rounded text-xs ${
                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {request.status === 'pending' ? 'En attente' :
                 request.status === 'accepted' ? 'Acceptée' : 'Refusée'}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                Envoyée le {new Date(request.created_at).toLocaleDateString()}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{request.message}</p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="mr-2"
              onClick={() => openRequestDetails(request)}
            >
              Voir détails
            </Button>
            {request.status === 'pending' && (
              <>
                <Button 
                  variant="outline" 
                  className="mr-2 text-green-600 hover:bg-green-50 hover:text-green-700"
                  onClick={() => handleRequestAction(request.id, 'accepted')}
                >
                  <Check className="h-4 w-4 mr-1" /> Accepter
                </Button>
                <Button 
                  variant="outline" 
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => handleRequestAction(request.id, 'rejected')}
                >
                  <X className="h-4 w-4 mr-1" /> Refuser
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MentoringRequestsTab;
