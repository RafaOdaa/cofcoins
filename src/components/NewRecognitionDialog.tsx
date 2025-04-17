
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, Coins, UserRound, Lightbulb, Users, BookOpen, Send, User, Gift, Shield, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Category {
  id: number;
  name: string;
  description: string;
  icon: React.ElementType;
}

interface NewRecognitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  isAdmin?: boolean;
}

const defaultCategories: Category[] = [
  { 
    id: 1, 
    name: "Fora da Caixa", 
    description: "Pra quem sempre surpreende com soluções e ideias que ninguém tinha pensado",
    icon: Lightbulb
  },
  { 
    id: 2, 
    name: "O Quebra Galho", 
    description: "Praquele parceiro que aparece rapidinho e resolve o problema sem enrolação",
    icon: Send
  },
  { 
    id: 3, 
    name: "Aqui é MedCof!", 
    description: "Pra quem age como se a empresa fosse sua casa",
    icon: User
  },
  { 
    id: 4, 
    name: "Mestre do Improviso", 
    description: "Pra aquele que, mesmo sem planejar, sempre acha um jeito de resolver",
    icon: Gift
  },
  { 
    id: 5, 
    name: "Segurador de Rojão", 
    description: "Para aquele colega que chega na hora certa para domar situações explosivas",
    icon: Shield
  },
  { 
    id: 6, 
    name: "O Vidente", 
    description: "Praquele que identifica e resolve perrengues antes mesmo de acontecerem",
    icon: Eye
  }
];

// Special categories that are only shown in special recognitions
const specialCategories: Category[] = [
  { 
    id: 7, 
    name: "Aprendeu por si, falou por todos", 
    description: "Leu, refletiu, conectou com a realidade e compartilhou algo que virou aprendizado coletivo.",
    icon: BookOpen
  }
];

const NewRecognitionDialog = ({ open, onOpenChange, categories = defaultCategories, isAdmin = false }: NewRecognitionDialogProps) => {
  const { toast } = useToast();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('50');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSpecialRecognition, setIsSpecialRecognition] = useState(false);

  // Determine which categories to show based on the recognition type
  const displayCategories = isSpecialRecognition ? specialCategories : defaultCategories;
  const coinOptions = isAdmin ? [50, 100, 150, 200] : [50, 100, 150];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields only on actual submission attempt
    if (isSubmitting) return;
    
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
    setIsSpecialRecognition(false);
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" />
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Award className="mr-2 h-5 w-5 text-cofcoin-purple" />
            Novo Reconhecimento
          </DialogTitle>
          <DialogDescription>
            Reconheça um colega pelo trabalho excepcional
          </DialogDescription>
        </DialogHeader>

        {/* Toggle between regular and special recognition */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                !isSpecialRecognition
                  ? "bg-cofcoin-purple text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => setIsSpecialRecognition(false)}
            >
              Reconhecimento Normal
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                isSpecialRecognition
                  ? "bg-cofcoin-purple text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => setIsSpecialRecognition(true)}
            >
              Reconhecimento Especial
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex gap-2">
                {coinOptions.map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={amount === String(value) ? "default" : "outline"}
                    className={`flex-1 ${amount === String(value) ? "bg-cofcoin-purple hover:bg-cofcoin-purple-dark" : ""}`}
                    onClick={() => setAmount(String(value))}
                  >
                    <Coins className="h-4 w-4 mr-1" />
                    {value}
                  </Button>
                ))}
              </div>
            </div>

            {/* Category selection */}
            <div className="space-y-2">
              <Label>Motivo do Reconhecimento</Label>
              <RadioGroup value={selectedCategory?.toString()} onValueChange={(value) => setSelectedCategory(parseInt(value))}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {displayCategories.map(category => {
                    const Icon = category.icon;
                    return (
                      <div
                        key={category.id}
                        className={`border rounded-md p-4 cursor-pointer transition-colors ${
                          selectedCategory === category.id 
                            ? "border-cofcoin-purple bg-cofcoin-purple/10" 
                            : "border-gray-200 hover:border-cofcoin-purple/50"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem
                            value={category.id.toString()}
                            id={`category-${category.id}`}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center">
                              <Icon className="h-4 w-4 mr-2 text-cofcoin-purple" />
                              <Label 
                                htmlFor={`category-${category.id}`} 
                                className="font-medium cursor-pointer"
                              >
                                {category.name}
                              </Label>
                            </div>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-3">{category.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                className="min-h-[100px] resize-none"
              />
              <p className="text-xs text-gray-500">
                Explique o motivo do reconhecimento e como isso ajudou a equipe ou empresa
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit"
              className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white w-full sm:w-auto"
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
