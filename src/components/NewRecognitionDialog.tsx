
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Award, Star, CheckCircle, Users, BookOpen } from 'lucide-react';

// Define interfaces
interface Category {
  id: number;
  name: string;
  description?: string;
  icon: any;
}

interface NewRecognitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAdmin?: boolean;
}

const categories: Category[] = [
  { id: 1, name: "Colaboração Excepcional", description: "Reconheça quem vai além para ajudar os outros", icon: Award },
  { id: 2, name: "Inovação Constante", description: "Para quem traz ideias e soluções criativas", icon: Star },
  { id: 3, name: "Compromisso com Qualidade", description: "Destaque para excelência no trabalho", icon: CheckCircle },
  { id: 4, name: "Liderança Inspiradora", description: "Reconheça quem inspira e guia a equipe", icon: Users },
  { id: 5, name: "Aprendeu por si, falou por todos", description: "Reconheça quem compartilha conhecimento", icon: BookOpen }
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
  const [manualCoins, setManualCoins] = useState<number>(0);
  const [isManualMode, setIsManualMode] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!recipient || !category || (!isManualMode && !description)) {
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

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {isAdmin && (
              <div className="flex items-center gap-2">
                <Switch
                  id="manual-mode"
                  checked={isManualMode}
                  onCheckedChange={setIsManualMode}
                />
                <Label htmlFor="manual-mode">Modo Admin (CofCoins manual)</Label>
              </div>
            )}

            <div className="grid gap-2">
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

            <div className="grid gap-2">
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

            {isAdmin && isManualMode ? (
              <div className="grid gap-2">
                <Label htmlFor="coins">Quantidade de CofCoins</Label>
                <Input
                  id="coins"
                  type="number"
                  value={manualCoins}
                  onChange={(e) => setManualCoins(Number(e.target.value))}
                  min="0"
                  className="w-full"
                />
              </div>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  placeholder="Descreva o motivo do reconhecimento..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full"
                />
              </div>
            )}

            <Button type="submit" className="w-full bg-cofcoin-purple hover:bg-cofcoin-purple-dark">
              Enviar Reconhecimento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRecognitionDialog;
