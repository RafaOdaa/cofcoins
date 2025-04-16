
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, Coins, UserRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface NewRecognitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
}

const NewRecognitionDialog = ({ open, onOpenChange, categories }: NewRecognitionDialogProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<'recipient' | 'amount' | 'category' | 'description'>('recipient');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('50');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipient || !amount || !selectedCategory || !description) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Reconhecimento enviado",
        description: "Seu reconhecimento foi enviado com sucesso e aguarda aprovação.",
      });

      // Reset form and close dialog
      resetForm();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar o reconhecimento.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep('recipient');
    setRecipient('');
    setAmount('50');
    setSelectedCategory(null);
    setDescription('');
  };

  const handleBack = () => {
    if (step === 'amount') setStep('recipient');
    else if (step === 'category') setStep('amount');
    else if (step === 'description') setStep('category');
  };

  const handleNext = () => {
    if (step === 'recipient') {
      if (!recipient) {
        toast({
          title: "Destinatário necessário",
          description: "Por favor, informe o destinatário para continuar.",
          variant: "destructive",
        });
        return;
      }
      setStep('amount');
    } else if (step === 'amount') {
      if (!amount || Number(amount) <= 0) {
        toast({
          title: "Valor inválido",
          description: "Por favor, informe um valor válido para continuar.",
          variant: "destructive",
        });
        return;
      }
      setStep('category');
    } else if (step === 'category') {
      if (!selectedCategory) {
        toast({
          title: "Categoria necessária",
          description: "Por favor, selecione uma categoria para continuar.",
          variant: "destructive",
        });
        return;
      }
      setStep('description');
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // Reset form when dialog is closed
      resetForm();
    }
    onOpenChange(open);
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-6">
      <div className="flex items-center space-x-2">
        <div 
          className={`w-2.5 h-2.5 rounded-full ${step === 'recipient' ? 'bg-cofcoin-purple' : 'bg-gray-300'}`}
        />
        <div 
          className={`w-2.5 h-2.5 rounded-full ${step === 'amount' ? 'bg-cofcoin-purple' : 'bg-gray-300'}`}
        />
        <div 
          className={`w-2.5 h-2.5 rounded-full ${step === 'category' ? 'bg-cofcoin-purple' : 'bg-gray-300'}`}
        />
        <div 
          className={`w-2.5 h-2.5 rounded-full ${step === 'description' ? 'bg-cofcoin-purple' : 'bg-gray-300'}`}
        />
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Award className="mr-2 h-5 w-5 text-cofcoin-purple" />
            Novo Reconhecimento
          </DialogTitle>
          <DialogDescription>
            Reconheça um colega pelo trabalho excepcional
          </DialogDescription>
        </DialogHeader>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit} className="space-y-6 py-2">
          {step === 'recipient' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Destinatário</Label>
                <div className="relative">
                  <UserRound className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="recipient"
                    placeholder="Digite o nome do colega"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Selecione o colega que você gostaria de reconhecer
                </p>
              </div>
            </div>
          )}

          {step === 'amount' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Quantidade de CofCoins</Label>
                <div className="relative">
                  <Coins className="absolute left-2.5 top-2.5 h-4 w-4 text-cofcoin-orange" />
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    max="100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Escolha quantos CofCoins você gostaria de enviar (máximo: 100)
                </p>
              </div>
            </div>
          )}

          {step === 'category' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Motivo do Reconhecimento</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map(category => (
                    <div
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`border rounded-md p-3 cursor-pointer transition-colors ${
                        selectedCategory === category.id 
                          ? "border-cofcoin-purple bg-cofcoin-purple/10" 
                          : "border-gray-200 hover:border-cofcoin-purple/50"
                      }`}
                    >
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Selecione a categoria que melhor representa seu reconhecimento
                </p>
              </div>
            </div>
          )}

          {step === 'description' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva por que você está reconhecendo essa pessoa..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-sm text-gray-500">
                  Explique o motivo do reconhecimento e como isso ajudou a equipe ou empresa
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between items-center">
            {step !== 'recipient' ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={isSubmitting}
              >
                Voltar
              </Button>
            ) : (
              <div /> // Empty div to maintain spacing
            )}

            {step !== 'description' ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
              >
                Próximo
              </Button>
            ) : (
              <Button 
                type="submit"
                className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Enviando...
                  </div>
                ) : (
                  "Enviar Reconhecimento"
                )}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRecognitionDialog;
