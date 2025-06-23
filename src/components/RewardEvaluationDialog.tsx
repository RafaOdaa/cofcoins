
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle, XCircle, Clock } from 'lucide-react';

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
  onPending?: (id: number) => void;
  isEditing?: boolean;
}

const RewardEvaluationDialog = ({ 
  reward, 
  open, 
  onOpenChange, 
  onApprove,
  onReject,
  onPending,
  isEditing = false
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

  const handlePending = () => {
    if (onPending) {
      onPending(reward.id);
      onOpenChange(false);
    }
  };

  const getAvailableActions = () => {
    if (!isEditing) {
      return (
        <>
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
        </>
      );
    }

    // Editing mode - show available status changes
    const currentStatus = reward.status.toLowerCase();
    const actions = [];

    if (currentStatus !== 'pendente') {
      actions.push(
        <Button
          key="pending"
          variant="outline"
          onClick={handlePending}
          className="border-yellow-200 text-yellow-600 hover:bg-yellow-50"
        >
          <Clock className="h-4 w-4 mr-1" />
          Pendente
        </Button>
      );
    }

    if (currentStatus !== 'aprovado') {
      actions.push(
        <Button
          key="approve"
          onClick={handleApprove}
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          Aprovar
        </Button>
      );
    }

    if (currentStatus !== 'reprovado') {
      actions.push(
        <Button
          key="reject"
          variant="outline"
          onClick={handleReject}
          className="border-red-200 text-red-600 hover:bg-red-50"
        >
          <XCircle className="h-4 w-4 mr-1" />
          Recusar
        </Button>
      );
    }

    return actions;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-cofcoin-purple" />
            {isEditing ? 'Editar Status da Recompensa' : 'Avaliar Solicitação de Recompensa'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Altere o status da solicitação' : 'Analise os detalhes da solicitação abaixo'}
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

          {isEditing && (
            <div>
              <h4 className="text-sm font-medium mb-1">Status Atual</h4>
              <p className="text-sm text-gray-600 capitalize">{reward.status}</p>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium mb-1">Descrição</h4>
            <p className="text-sm text-gray-600">{reward.description}</p>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-6">
          {getAvailableActions()}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RewardEvaluationDialog;
