
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Award, Star, CheckCircle, Users } from 'lucide-react';

interface NewRecognitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAdmin?: boolean;
}

const categories = [
  { id: 1, name: "Colaboração Excepcional", description: "Reconheça quem vai além para ajudar os outros", icon: Award },
  { id: 2, name: "Inovação Constante", description: "Para quem traz ideias e soluções criativas", icon: Star },
  { id: 3, name: "Compromisso com Qualidade", description: "Destaque para excelência no trabalho", icon: CheckCircle },
  { id: 4, name: "Liderança Inspiradora", description: "Reconheça quem inspira e guia a equipe", icon: Users },
];

const NewRecognitionDialog: React.FC<NewRecognitionDialogProps> = ({
  open,
  onOpenChange,
  isAdmin = false
}) => {
  const { toast } = useToast();
  const [recipient, setRecipient] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coins, setCoins] = useState<number>(25);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!recipient || !category || !description) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Reconhecimento enviado",
      description: `Reconhecimento para ${recipient} enviado com sucesso!`
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Reconhecimento</DialogTitle>
          <DialogDescription>
            Reconheça o trabalho excepcional de um colega
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient">Colega</Label>
              <Select onValueChange={setRecipient}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um colega" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lucas Mendes">Lucas Mendes</SelectItem>
                  <SelectItem value="Amanda Oliveira">Amanda Oliveira</SelectItem>
                  <SelectItem value="Pedro Henrique">Pedro Henrique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      <div className="flex items-center gap-2">
                        <cat.icon className="h-4 w-4" />
                        <span>{cat.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isAdmin && (
              <div>
                <Label htmlFor="coins">Quantidade de CofCoins</Label>
                <Input
                  id="coins"
                  type="number"
                  value={coins}
                  onChange={(e) => setCoins(Number(e.target.value))}
                  min="0"
                />
              </div>
            )}

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                placeholder="Descreva o motivo do reconhecimento..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-cofcoin-purple hover:bg-cofcoin-purple-dark">
            Enviar Reconhecimento
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRecognitionDialog;
