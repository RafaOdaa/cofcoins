
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus } from "lucide-react";

interface Area {
  id: string;
  name: string;
}

export interface RewardItem {
  id: number;
  name: string;
  description: string;
  value: number;
  areas: string[];
  stock: number;
  active: boolean;
}

interface RewardConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (reward: RewardItem) => void;
  editingReward?: RewardItem | null;
}

// Sample areas
const areas: Area[] = [
  { id: "tech", name: "Tecnologia" },
  { id: "marketing", name: "Marketing" },
  { id: "product", name: "Produto" },
  { id: "hr", name: "RH" },
  { id: "sales", name: "Vendas" },
  { id: "finance", name: "Financeiro" },
  { id: "ops", name: "Operações" },
];

const RewardConfigModal: React.FC<RewardConfigModalProps> = ({
  open,
  onOpenChange,
  onSave,
  editingReward
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState<number>(100);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [stock, setStock] = useState<number>(10);

  // Reset form or populate with editing data when modal opens
  useEffect(() => {
    if (open) {
      if (editingReward) {
        setName(editingReward.name);
        setDescription(editingReward.description);
        setValue(editingReward.value);
        setSelectedAreas(editingReward.areas);
        setStock(editingReward.stock);
      } else {
        // Reset form for new reward
        setName("");
        setDescription("");
        setValue(100);
        setSelectedAreas(areas.map(area => area.id)); // Select all areas by default for new rewards
        setStock(10);
      }
    }
  }, [open, editingReward]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const rewardData: RewardItem = {
      id: editingReward?.id || Date.now(),
      name,
      description,
      value,
      areas: selectedAreas,
      stock,
      active: editingReward ? editingReward.active : true
    };
    
    onSave(rewardData);
    onOpenChange(false);
  };

  const toggleArea = (areaId: string) => {
    setSelectedAreas(prev => 
      prev.includes(areaId)
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingReward ? "Editar Recompensa" : "Nova Recompensa"}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-3">
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome da recompensa"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva a recompensa"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="value">Valor (CofCoins)</Label>
                <Input
                  id="value"
                  type="number"
                  min={1}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Áreas</Label>
                <div className="grid grid-cols-2 gap-3">
                  {areas.map((area) => (
                    <div key={area.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`area-${area.id}`} 
                        checked={selectedAreas.includes(area.id)}
                        onCheckedChange={() => toggleArea(area.id)}
                      />
                      <Label htmlFor={`area-${area.id}`}>{area.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stock">Estoque</Label>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setStock(prev => Math.max(0, prev - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="stock"
                    type="number"
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="mx-2 text-center"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setStock(prev => prev + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark">
                {editingReward ? "Salvar alterações" : "Adicionar recompensa"}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RewardConfigModal;
