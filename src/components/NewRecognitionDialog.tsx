
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Award, Eye, Gift, Search, Shield, User, Wrench } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

interface Category {
  id: number;
  name: string;
  description: string;
  icon?: React.ReactNode;
}

interface NewRecognitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
}

const NewRecognitionDialog: React.FC<NewRecognitionDialogProps> = ({
  open,
  onOpenChange,
  categories
}) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState<'50' | '100'>('50');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !selectedCategory || !description) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Reconhecimento enviado",
        description: "Seu reconhecimento foi enviado com sucesso!",
      });
      
      // Reset form
      setRecipient('');
      setAmount('50');
      setSelectedCategory(null);
      setDescription('');
      
      // Close dialog
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

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Fora da Caixa':
        return <Award className="h-5 w-5 text-blue-600" />;
      case 'O Quebra Galho':
        return <Wrench className="h-5 w-5 text-green-600" />;
      case 'Aqui é MedCof!':
        return <User className="h-5 w-5 text-red-600" />;
      case 'Mestre do Improviso':
        return <Gift className="h-5 w-5 text-amber-600" />;
      case 'Segurador de Rojão':
        return <Shield className="h-5 w-5 text-purple-600" />;
      case 'O Vidente':
        return <Eye className="h-5 w-5 text-indigo-600" />;
      default:
        return <Award className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Award className="mr-2 h-5 w-5 text-cofcoin-purple" />
            Novo Reconhecimento
          </DialogTitle>
          <DialogDescription>
            Reconheça um colega pelo bom trabalho e atribua CofCoins
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Recipient Field */}
          <div className="space-y-2">
            <Label htmlFor="recipient">Destinatário</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="recipient"
                placeholder="Digite o nome do colega"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="pl-8"
              />
            </div>
            <p className="text-sm text-gray-500">
              Insira o nome do colega que você deseja reconhecer
            </p>
          </div>

          {/* Amount Selection */}
          <div className="space-y-2">
            <Label>Valor em CofCoins</Label>
            <RadioGroup
              value={amount}
              onValueChange={(value) => setAmount(value as '50' | '100')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="50" id="amount-50" />
                <Label htmlFor="amount-50" className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-cofcoin-orange/20 flex items-center justify-center mr-1">
                    <span className="text-cofcoin-orange font-bold">50</span>
                  </div>
                  <span>CofCoins</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="100" id="amount-100" />
                <Label htmlFor="amount-100" className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-cofcoin-orange/20 flex items-center justify-center mr-1">
                    <span className="text-cofcoin-orange font-bold">100</span>
                  </div>
                  <span>CofCoins</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <Label>Selecione a Categoria</Label>
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
                  <div className="flex items-center gap-2 mb-1">
                    {category.icon || getCategoryIcon(category.name)}
                    <h4 className="font-medium">{category.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Description Field - New addition */}
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

          <DialogFooter>
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
