
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
import { useToast } from "@/hooks/use-toast";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { 
    id: 1, 
    name: "Colaboração Excepcional", 
    description: "Reconheça quem vai além para ajudar os outros", 
    icon: "🤝",
    color: "bg-blue-100" 
  },
  { 
    id: 2, 
    name: "Inovação Constante", 
    description: "Para quem traz ideias e soluções criativas", 
    icon: "💡",
    color: "bg-purple-100" 
  },
  { 
    id: 3, 
    name: "Compromisso com Qualidade", 
    description: "Destaque para excelência no trabalho", 
    icon: "⭐",
    color: "bg-yellow-100" 
  },
  { 
    id: 4, 
    name: "Liderança Inspiradora", 
    description: "Reconheça quem inspira e guia a equipe", 
    icon: "👑",
    color: "bg-green-100" 
  },
  { 
    id: 5, 
    name: "Aprendizado Contínuo", 
    description: "Para quem busca sempre aprender e evoluir", 
    icon: "📚",
    color: "bg-red-100" 
  }
];

const users = [
  { value: "lucas.mendes", label: "Lucas Mendes" },
  { value: "amanda.oliveira", label: "Amanda Oliveira" },
  { value: "pedro.henrique", label: "Pedro Henrique" },
  { value: "julia.santos", label: "Julia Santos" },
  { value: "carlos.silva", label: "Carlos Silva" },
];

interface NewRecognitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAdmin?: boolean;
}

const NewRecognitionDialog: React.FC<NewRecognitionDialogProps> = ({
  open,
  onOpenChange,
  isAdmin = false
}) => {
  const { toast } = useToast();
  const [recipient, setRecipient] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coins, setCoins] = useState<number>(isAdmin ? 25 : 50);
  const [openCombobox, setOpenCombobox] = useState(false);

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

  const coinOptions = isAdmin ? undefined : [50, 100, 150];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isAdmin ? "Novo Reconhecimento Especial" : "Novo Reconhecimento"}</DialogTitle>
          <DialogDescription>
            Reconheça o trabalho excepcional de um colega
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Colega</Label>
              <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCombobox}
                    className="w-full justify-between"
                  >
                    {recipient
                      ? users.find((user) => user.value === recipient)?.label
                      : "Selecione um colega..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Procurar colega..." />
                    <CommandEmpty>Nenhum colega encontrado.</CommandEmpty>
                    <CommandGroup>
                      {users.map((user) => (
                        <CommandItem
                          key={user.value}
                          value={user.value}
                          onSelect={(currentValue) => {
                            setRecipient(currentValue === recipient ? "" : currentValue);
                            setOpenCombobox(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              recipient === user.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {user.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Categoria</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.name)}
                    className={cn(
                      "flex flex-col items-center p-3 rounded-lg border transition-all",
                      category === cat.name 
                        ? "border-cofcoin-purple bg-purple-50 shadow-sm" 
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                      cat.color
                    )}
                  >
                    <span className="text-2xl mb-2">{cat.icon}</span>
                    <span className="text-sm font-medium text-center">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {isAdmin ? (
              <div className="space-y-2">
                <Label htmlFor="coins">Quantidade de CofCoins</Label>
                <Input
                  id="coins"
                  type="number"
                  value={coins}
                  onChange={(e) => setCoins(Number(e.target.value))}
                  min="0"
                  className="w-full"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Quantidade de CofCoins</Label>
                <div className="grid grid-cols-3 gap-3">
                  {coinOptions?.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setCoins(amount)}
                      className={cn(
                        "py-2 px-4 rounded-lg border transition-all text-center",
                        coins === amount 
                          ? "border-cofcoin-purple bg-purple-50 text-cofcoin-purple font-medium" 
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      {amount} CofCoins
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
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
