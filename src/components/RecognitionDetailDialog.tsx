
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { format } from 'date-fns';
import { Award, Coins } from 'lucide-react';
import { Button } from "@/components/ui/button";

export interface Recognition {
  id: number;
  reporter: string;
  recipient?: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
  status?: string;
}

interface RecognitionDetailDialogProps {
  recognition: Recognition | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showActions?: boolean;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

const RecognitionDetailDialog = ({ 
  recognition, 
  open, 
  onOpenChange, 
  showActions = false,
  onApprove,
  onReject
}: RecognitionDetailDialogProps) => {
  if (!recognition) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-cofcoin-purple" />
            Detalhes do Reconhecimento
          </DialogTitle>
          <DialogDescription>
            {format(recognition.date, 'dd/MM/yyyy HH:mm')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Relator</h4>
            <p className="text-sm text-gray-600">{recognition.reporter}</p>
          </div>

          {recognition.recipient && (
            <div>
              <h4 className="text-sm font-medium mb-2">Destinatário</h4>
              <p className="text-sm text-gray-600">{recognition.recipient}</p>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium mb-2">Categoria</h4>
            <p className="text-sm text-gray-600">{recognition.category}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Quantidade</h4>
            <p className="text-sm text-cofcoin-orange font-medium flex items-center gap-1">
              <Coins className="h-4 w-4" />
              {recognition.amount} CofCoins
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Descrição</h4>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{recognition.description}</p>
          </div>

          {recognition.status && (
            <div>
              <h4 className="text-sm font-medium mb-2">Status</h4>
              <p className={`text-sm font-medium ${
                recognition.status === 'approved' 
                  ? 'text-green-600' 
                  : recognition.status === 'rejected' 
                  ? 'text-red-600' 
                  : 'text-amber-600'
              }`}>
                {recognition.status === 'approved' 
                  ? 'Aprovado' 
                  : recognition.status === 'rejected' 
                  ? 'Rejeitado' 
                  : 'Pendente'}
              </p>
            </div>
          )}
        </div>

        {showActions && onApprove && onReject && (
          <DialogFooter className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => onReject(recognition.id)}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              Rejeitar
            </Button>
            <Button
              onClick={() => onApprove(recognition.id)}
              className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark"
            >
              Aprovar
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecognitionDetailDialog;
