
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle, XCircle } from 'lucide-react';

interface RewardRequest {
  id: number;
  user: string;
  title: string;
  value: number;
  status: string;
  requestDate: Date;
  description: string;
}

interface RewardEvaluationDialogProps {
  reward: RewardRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const RewardEvaluationDialog = ({ 
  reward, 
  open, 
  onOpenChange, 
  onApprove,
  onReject
}: RewardEvaluationDialogProps) => {
  if (!reward) return null;

  const handleApprove = () => {
    onApprove(reward.id);
    onOpenChange(false);
  };

  const handleReject = () => {
    onReject(reward.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-cofcoin-purple" />
            Avaliar Solicitação de Recompensa
          </DialogTitle>
          <DialogDescription>
            Analise os detalhes da solicitação abaixo
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Usuário</h4>
            <p className="text-sm text-gray-600">{reward.user}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-1">Recompensa</h4>
            <p className="text-sm text-gray-600">{reward.title}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-1">Valor</h4>
            <p className="text-sm text-cofcoin-orange font-medium">{reward.value} CofCoins</p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-1">Descrição</h4>
            <p className="text-sm text-gray-600">{reward.description}</p>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            onClick={handleReject}
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <XCircle className="h-4 w-4 mr-1" />
            Recusar
          </Button>
          <Button
            onClick={handleApprove}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Aprovar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RewardEvaluationDialog;
