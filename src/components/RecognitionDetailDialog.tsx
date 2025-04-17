
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from 'date-fns';
import { Award, Coins } from 'lucide-react';

interface Recognition {
  id: number;
  reporter: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
}

interface RecognitionDetailDialogProps {
  recognition: Recognition | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RecognitionDetailDialog = ({ recognition, open, onOpenChange }: RecognitionDetailDialogProps) => {
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
            <p className="text-sm text-gray-600">{recognition.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecognitionDetailDialog;
