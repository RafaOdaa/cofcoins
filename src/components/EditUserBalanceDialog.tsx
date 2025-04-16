
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Coins, User } from "lucide-react";
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

    // Open confirmation dialog
    setConfirmDialogOpen(true);
  };

  const handleConfirmEdit = () => {
    setIsSubmitting(true);

    try {
      const parsedNewBalance = parseInt(newBalance);
      
      // Call the callback function
      if (onBalanceEditComplete) {
        onBalanceEditComplete(user.id, user.balance, parsedNewBalance, reason);
      }
      
      // Reset form and close dialog
      setNewBalance("");
      setReason("");
      onOpenChange(false);

    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o saldo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setConfirmDialogOpen(false);
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // Reset form when dialog is closed
      setNewBalance(user ? user.balance.toString() : "");
      setReason("");
    }
    onOpenChange(open);
  };

  const balanceDifference = parseInt(newBalance) - user.balance;
  const isBalanceIncreased = balanceDifference > 0;
  const isBalanceDecreased = balanceDifference < 0;
  const isBalanceUnchanged = balanceDifference === 0;
  
  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Coins className="mr-2 h-5 w-5 text-cofcoin-orange" />
              Editar Saldo de CofCoins
            </DialogTitle>
            <DialogDescription>
              Altere o saldo de CofCoins do colaborador
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Colaborador</Label>
              <div className="flex items-center p-2 bg-gray-50 rounded-md border">
                <User className="h-5 w-5 mr-2 text-gray-500" />
                <span className="font-medium">{user.name}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-balance">Saldo Atual</Label>
                <div className="flex items-center p-2 bg-gray-50 rounded-md border">
                  <Coins className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{user.balance}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-balance">Novo Saldo</Label>
                <div className="relative">
                  <Coins className="absolute left-2.5 top-2.5 h-4 w-4 text-cofcoin-orange" />
                  <Input
                    id="new-balance"
                    type="number"
                    min="0"
                    value={newBalance}
                    onChange={(e) => setNewBalance(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            {!isBalanceUnchanged && newBalance && (
              <div className={`p-2 rounded-md text-sm ${
                isBalanceIncreased ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
              }`}>
                <p className="font-medium">
                  {isBalanceIncreased ? (
                    <>Adicionando {balanceDifference} CofCoins</>
                  ) : (
                    <>Removendo {Math.abs(balanceDifference)} CofCoins</>
                  )}
                </p>
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

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
                disabled={isSubmitting || isBalanceUnchanged}
              >
                Salvar Alterações
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        onConfirm={handleConfirmEdit}
        title="Confirmar Alteração de Saldo"
        description={`Tem certeza que deseja ${isBalanceIncreased ? 'adicionar' : 'remover'} ${Math.abs(balanceDifference)} CofCoins ${isBalanceIncreased ? 'ao' : 'do'} saldo de ${user.name}?`}
        confirmText="Confirmar"
        variant={isBalanceDecreased ? "destructive" : "default"}
      />
    </>
  );
};

export default EditUserBalanceDialog;
