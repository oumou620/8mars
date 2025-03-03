
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RequestDetailsDialogProps {
  showRequestDialog: boolean;
  setShowRequestDialog: (show: boolean) => void;
  selectedRequest: any;
  handleRequestAction: (requestId: string, status: 'accepted' | 'rejected') => Promise<void>;
}

const RequestDetailsDialog: React.FC<RequestDetailsDialogProps> = ({
  showRequestDialog,
  setShowRequestDialog,
  selectedRequest,
  handleRequestAction
}) => {
  const { t } = useLanguage();
  
  return (
    <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Détails de la demande</DialogTitle>
          <DialogDescription>
            Informations sur la demande de mentorat
          </DialogDescription>
        </DialogHeader>
        
        {selectedRequest && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Étudiant</h4>
              <p>{selectedRequest.learner?.name || 'Nom non disponible'}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Message</h4>
              <p className="text-sm">{selectedRequest.message || 'Aucun message'}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Statut</h4>
              <p className={`${
                selectedRequest.status === 'pending' ? 'text-yellow-600' :
                selectedRequest.status === 'accepted' ? 'text-green-600' :
                'text-red-600'
              }`}>
                {selectedRequest.status === 'pending' ? 'En attente' :
                 selectedRequest.status === 'accepted' ? 'Acceptée' : 'Refusée'}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Date de la demande</h4>
              <p>{new Date(selectedRequest.created_at).toLocaleString()}</p>
            </div>
          </div>
        )}
        
        <DialogFooter className="flex justify-end gap-2 mt-4">
          {selectedRequest && selectedRequest.status === 'pending' && (
            <>
              <Button 
                variant="outline" 
                className="text-green-600 hover:bg-green-50 hover:text-green-700"
                onClick={() => handleRequestAction(selectedRequest.id, 'accepted')}
              >
                <Check className="h-4 w-4 mr-1" /> Accepter
              </Button>
              <Button 
                variant="outline" 
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => handleRequestAction(selectedRequest.id, 'rejected')}
              >
                <X className="h-4 w-4 mr-1" /> Refuser
              </Button>
            </>
          )}
          <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailsDialog;
