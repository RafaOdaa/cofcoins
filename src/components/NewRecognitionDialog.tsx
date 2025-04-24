
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const users = [
  { value: "lucas.mendes", label: "Lucas Mendes" },
  { value: "amanda.oliveira", label: "Amanda Oliveira" },
  { value: "pedro.henrique", label: "Pedro Henrique" },
  { value: "julia.santos", label: "Julia Santos" },
  { value: "carlos.silva", label: "Carlos Silva" },
];

const categories = [
  { 
    id: 1, 
    name: "Fora da Caixa", 
    description: "Sempre surpreende com soluções e ideias que ninguém tinha pensado, mudando o jogo e dando aquele toque criativo que faz toda a diferença.", 
    icon: "💡",
    color: "bg-blue-100" 
  },
  { 
    id: 2, 
    name: "O Quebra Galho", 
    description: "Parceiro que aparece rapidinho e resolve o problema sem enrolação. Quando você precisa, ele tá lá para fazer tudo se ajeitar.", 
    icon: "🔧",
    color: "bg-green-100" 
  },
  { 
    id: 3, 
    name: "Aqui é MedCof!", 
    description: "Age como se a empresa fosse sua casa: cuida, propõe melhorias e não deixa nada no \"deixa pra depois\".", 
    icon: "🏠",
    color: "bg-purple-100" 
  },
  { 
    id: 4, 
    name: "Mestre do Improviso", 
    description: "Mesmo sem planejar, sempre acha um jeito de resolver a situação e sair da enrascada.", 
    icon: "⭐",
    color: "bg-yellow-100" 
  },
  { 
    id: 5, 
    name: "Segurador de Rojão", 
    description: "Aquele colega que chega na hora certa para domar situações explosivas e manter a paz com muita habilidade e leveza.", 
    icon: "🛡️",
    color: "bg-red-100" 
  },
  { 
    id: 6, 
    name: "O Vidente", 
    description: "Com sensibilidade estratégica e faro aguçado, detecta riscos, evita dores de cabeça e propõe soluções antes de qualquer chamado.", 
    icon: "👁️",
    color: "bg-indigo-100" 
  }
];

// Additional category for admin recognition
const adminCategories = [
  ...categories,
  { 
    id: 7, 
    name: "Leu por si, falou por todos", 
    description: "Leu, refletiu, conectou com a realidade e compartilhou algo que virou aprendizado coletivo.", 
    icon: "📚",
    color: "bg-teal-100" 
  }
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
  const [searchQuery, setSearchQuery] = useState("");

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
      description: `Reconhecimento para ${users.find(u => u.value === recipient)?.label} enviado com sucesso!`
    });
    
    onOpenChange(false);
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{isAdmin ? "Novo Reconhecimento Especial" : "Novo Reconhecimento"}</DialogTitle>
          <DialogDescription>
            Reconheça o trabalho excepcional de um colega
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-3">
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
                      <CommandInput 
                        placeholder="Procurar colega..." 
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                      />
                      <CommandEmpty>Nenhum colega encontrado.</CommandEmpty>
                      <CommandGroup>
                        {filteredUsers.map((user) => (
                          <CommandItem
                            key={user.value}
                            value={user.value}
                            onSelect={(currentValue) => {
                              setRecipient(currentValue === recipient ? "" : currentValue);
                              setOpenCombobox(false);
                              setSearchQuery("");
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

              {isAdmin ? (
                <div className="space-y-2">
                  <Label htmlFor="coins">Quantidade de CofCoins</Label>
                  <input
                    type="number"
                    id="coins"
                    value={coins}
                    onChange={(e) => setCoins(Number(e.target.value))}
                    min="0"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Quantidade de CofCoins</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[50, 100, 150].map((amount) => (
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
                <Label>Categoria</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(isAdmin ? adminCategories : categories).map((cat) => (
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
                      <span className="text-xs text-gray-600 mt-2 text-center">
                        {cat.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o motivo do reconhecimento..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-cofcoin-purple hover:bg-cofcoin-purple-dark">
              Enviar Reconhecimento
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default NewRecognitionDialog;
