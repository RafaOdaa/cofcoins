
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Coins, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserBalance {
  id: number;
  name: string;
  balance: number;
  spent: number;
}

interface EditUserBalanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserBalance | null;
}

const EditUserBalanceDialog: React.FC<EditUserBalanceDialogProps> = ({
  open,
  onOpenChange,
  user
}) => {
  const [newBalance, setNewBalance] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (user && open) {
      setNewBalance(user.balance.toString());
      setReason("");
    }
  }, [user, open]);

  if (!user) return null;

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Saldo atualizado",
        description: `O saldo de ${user.name} foi atualizado com sucesso.`,
      });
      
      setIsConfirmOpen(false);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o saldo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBalanceNum = Number(newBalance);
    
    if (isNaN(newBalanceNum) || newBalanceNum < 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, insira um valor válido para o saldo.",
        variant: "destructive",
      });
      return;
    }
    
    if (!reason.trim()) {
      toast({
        title: "Motivo obrigatório",
        description: "Por favor, informe o motivo da alteração do saldo.",
        variant: "destructive",
      });
      return;
    }
    
    // Open confirmation dialog
    setIsConfirmOpen(true);
  };
  
  const balanceChange = Number(newBalance) - user.balance;
  const isIncrease = balanceChange > 0;
  const isDifference = balanceChange !== 0;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <Coins className="h-5 w-5 mr-2 text-cofcoin-orange" />
              Editar Saldo de CofCoins
            </DialogTitle>
            <DialogDescription>
              Altere o saldo de CofCoins do usuário
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-4">
                <User className="h-5 w-5 text-cofcoin-purple" />
                <span className="font-bold text-lg">{user.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Saldo Atual</Label>
                  <div className="flex items-center h-10 px-4 bg-gray-100 rounded-md mt-1">
                    <Coins className="h-4 w-4 text-cofcoin-orange mr-2" />
                    <span className="font-medium">{user.balance}</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="newBalance">Novo Saldo</Label>
                  <div className="relative mt-1">
                    <Coins className="absolute left-3 top-2.5 h-4 w-4 text-cofcoin-orange" />
                    <Input
                      id="newBalance"
                      type="number"
                      min="0"
                      value={newBalance}
                      onChange={(e) => setNewBalance(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
              
              {isDifference && (
                <div className={`py-2 px-4 rounded-md mt-2 ${isIncrease ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  <span className="text-sm font-medium">
                    {isIncrease ? "Adicionando" : "Subtraindo"}{" "}
                    <span className="font-bold">{Math.abs(balanceChange)}</span> CofCoins
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Motivo da alteração</Label>
              <Textarea
                id="reason"
                placeholder="Descreva o motivo para alterar o saldo..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[80px]"
              />
              <p className="text-sm text-gray-500">
                Este registro ficará salvo no histórico de alterações
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark"
              >
                Salvar Alteração
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar alteração de saldo</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a {isIncrease ? "adicionar" : "remover"}{" "}
              <span className="font-bold">{Math.abs(balanceChange)}</span> CofCoins{" "}
              {isIncrease ? "ao" : "do"} saldo de {user.name}.
              <br /><br />
              Motivo: <span className="italic">{reason}</span>
              <br /><br />
              Esta ação será registrada no histórico do sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSave}
              disabled={isSubmitting}
              className={`${isIncrease ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Processando...
                </div>
              ) : (
                `Confirmar Alteração`
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditUserBalanceDialog;
