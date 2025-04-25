
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConfirmationDialog from "@/components/ConfirmationDialog";

interface User {
  id: number;
  name: string;
  balance: number;
  spent: number;
}

interface EditUserBalanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onBalanceEditComplete?: (userId: number, previousBalance: number, newBalance: number, reason: string) => void;
}

const EditUserBalanceDialog = ({
  open,
  onOpenChange,
  user,
  onBalanceEditComplete,
}: EditUserBalanceDialogProps) => {
  const { toast } = useToast();
  const [newBalance, setNewBalance] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setNewBalance(user.balance.toString());
    }
  }, [user]);

  if (!user) return null;

  const balanceDifference = parseInt(newBalance) - user.balance;
  const isBalanceIncreased = balanceDifference > 0;
  const isBalanceDecreased = balanceDifference < 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBalance || parseInt(newBalance) < 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, informe um valor válido para o novo saldo.",
        variant: "destructive",
      });
      return;
    }

    if (!reason.trim()) {
      toast({
        title: "Motivo obrigatório",
        description: "Por favor, informe o motivo da alteração de saldo.",
        variant: "destructive",
      });
      return;
    }

    setConfirmDialogOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-cofcoin-orange" />
              Editar Saldo de CofCoins
            </DialogTitle>
            <DialogDescription>
              Altere o saldo de CofCoins do colaborador
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Colaborador</div>
                <div className="font-medium text-lg">{user.name}</div>
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="text-sm text-gray-600">Saldo atual:</div>
                  <div className="font-medium">{user.balance} CofCoins</div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newBalance">Novo Saldo</Label>
                <div className="relative">
                  <Coins className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="newBalance"
                    type="number"
                    min="0"
                    value={newBalance}
                    onChange={(e) => setNewBalance(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {(isBalanceIncreased || isBalanceDecreased) && (
                <div className={`p-3 rounded-lg ${
                  isBalanceIncreased ? 'bg-green-50 border border-green-100' : 'bg-orange-50 border border-orange-100'
                }`}>
                  <div className={`text-sm ${isBalanceIncreased ? 'text-green-700' : 'text-orange-700'}`}>
                    <span className="font-medium">
                      {isBalanceIncreased ? 'Adicionando' : 'Removendo'} {Math.abs(balanceDifference)} CofCoins
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo da Alteração</Label>
                <Textarea
                  id="reason"
                  placeholder="Descreva o motivo da alteração de saldo..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="min-h-[80px]"
                />
                <p className="text-sm text-gray-500">
                  Esta informação será registrada no histórico de alterações
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button 
                type="submit"
                disabled={isSubmitting || !newBalance || parseInt(newBalance) === user.balance}
                className="w-full sm:w-auto bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
              >
                Salvar Alterações
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        onConfirm={() => {
          setIsSubmitting(true);
          if (onBalanceEditComplete) {
            onBalanceEditComplete(user.id, user.balance, parseInt(newBalance), reason);
          }
          setIsSubmitting(false);
          setConfirmDialogOpen(false);
          onOpenChange(false);
        }}
        title="Confirmar Alteração de Saldo"
        description={`Tem certeza que deseja ${isBalanceIncreased ? 'adicionar' : 'remover'} ${Math.abs(balanceDifference)} CofCoins ${isBalanceIncreased ? 'ao' : 'do'} saldo de ${user.name}?`}
        confirmText="Confirmar"
        variant={isBalanceDecreased ? "destructive" : "default"}
      />
    </>
  );
};

export default EditUserBalanceDialog;
