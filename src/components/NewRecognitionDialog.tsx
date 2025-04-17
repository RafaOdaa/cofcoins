
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, Coins, UserRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

// Add the new categories
const defaultCategories: Category[] = [
  { 
    id: 1, 
    name: "Inovação", 
    description: "Ideias criativas que trouxeram melhorias" 
  },
  { 
    id: 2, 
    name: "Colaboração", 
    description: "Trabalho em equipe excepcional" 
  },
  { 
    id: 3, 
    name: "Toque de Midas", 
    description: "Uma dica de leitura, uma reflexão de curso ou uma simples conversa que muda o dia de alguém. Está sempre lapidando o que toca." 
  },
  { 
    id: 4, 
    name: "Resenha de Livro ou Curso", 
    description: "Transforma capítulos em insights e ideias em ação. A mente curiosa que lê por todos nós. A leitura é individual, mas o impacto é coletivo." 
  },
];

const NewRecognitionDialog = ({ open, onOpenChange, categories = defaultCategories }: NewRecognitionDialogProps) => {
  const { toast } = useToast();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('50');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only validate fields when the form is actually submitted
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
    setRecipient('');
    setAmount('50');
    setSelectedCategory(null);
    setDescription('');
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // Reset form when dialog is closed
      resetForm();
    }
    onOpenChange(open);
  };

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

        <form onSubmit={handleSubmit} className="space-y-6 py-2">
          <div className="space-y-4">
            {/* Recipient field */}
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
            </div>

            {/* Amount field */}
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
              <p className="text-xs text-gray-500">
                Escolha quantos CofCoins você gostaria de enviar (máximo: 100)
              </p>
            </div>

            {/* Category selection */}
            <div className="space-y-2">
              <Label>Motivo do Reconhecimento</Label>
              <RadioGroup value={selectedCategory?.toString()} onValueChange={(value) => setSelectedCategory(parseInt(value))}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map(category => (
                    <div
                      key={category.id}
                      className={`border rounded-md p-3 cursor-pointer transition-colors ${
                        selectedCategory === category.id 
                          ? "border-cofcoin-purple bg-cofcoin-purple/10" 
                          : "border-gray-200 hover:border-cofcoin-purple/50"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem
                          value={category.id.toString()}
                          id={`category-${category.id}`}
                          className="mt-1"
                        />
                        <div>
                          <Label 
                            htmlFor={`category-${category.id}`} 
                            className="font-medium cursor-pointer"
                          >
                            {category.name}
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Description field */}
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva por que você está reconhecendo essa pessoa..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-gray-500">
                Explique o motivo do reconhecimento e como isso ajudou a equipe ou empresa
              </p>
            </div>
          </div>

          <DialogFooter>
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRecognitionDialog;
