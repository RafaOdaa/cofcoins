
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditUserBalanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: {
    id: number;
    name: string;
    balance: number;
  };
  // Alternative props for direct values
  userId?: number;
  userName?: string;
  currentBalance?: number;
  onComplete: (userId: number, previousBalance: number, newBalance: number, reason: string) => void;
}

const EditUserBalanceDialog: React.FC<EditUserBalanceDialogProps> = ({
  open,
  onOpenChange,
  user,
  userId,
  userName,
  currentBalance,
  onComplete
}) => {
  // Use either user object properties or direct props
  const actualUserId = user?.id || userId || 0;
  const actualUserName = user?.name || userName || "";
  const actualBalance = user?.balance || currentBalance || 0;
  
  const [newBalance, setNewBalance] = useState(actualBalance.toString());
  const [reason, setReason] = useState("");

  const handleSave = () => {
    const previousBalance = actualBalance;
    const newBalanceValue = parseInt(newBalance, 10);

    if (!isNaN(newBalanceValue)) {
      onComplete(actualUserId, previousBalance, newBalanceValue, reason);
      onOpenChange(false);
    } else {
      alert("Por favor, insira um valor numérico válido para o saldo.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Saldo de Usuário</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" value={actualUserName} className="col-span-3" disabled />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="balance" className="text-right">
              Novo Saldo
            </Label>
            <Input
              type="number"
              id="balance"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reason" className="text-right">
              Motivo
            </Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit" onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserBalanceDialog;
