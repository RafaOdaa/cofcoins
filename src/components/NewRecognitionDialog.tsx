
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { LucideIcon } from 'lucide-react';

// Definição da interface para categorias
interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: LucideIcon;
}

interface NewRecognitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAdmin?: boolean;
  categories?: Category[];
}

const NewRecognitionDialog: React.FC<NewRecognitionDialogProps> = ({
  open,
  onOpenChange,
  isAdmin = false,
  categories = []
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
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reconhecimento enviado",
      description: `Reconhecimento para ${recipient} na categoria ${category} enviado com sucesso!`,
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
          <div className="grid gap-4 py-4">
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
                <SelectTrigger id="recipient">
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
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))
                  ) : (
                    <>
                      <SelectItem value="Colaboração Excepcional">Colaboração Excepcional</SelectItem>
                      <SelectItem value="Inovação Constante">Inovação Constante</SelectItem>
                      <SelectItem value="Compromisso com Qualidade">Compromisso com Qualidade</SelectItem>
                      <SelectItem value="Aprendeu por si, falou por todos">Aprendeu por si, falou por todos</SelectItem>
                    </>
                  )}
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
                  max="1000"
                />
              </div>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  placeholder="Descreva o reconhecimento"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            )}

            <Button type="submit" className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white">
              Enviar Reconhecimento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRecognitionDialog;
