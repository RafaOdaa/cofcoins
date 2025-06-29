
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, Star, CheckCircle, Users, BookOpen, Activity, Gift, Heart, Target, Zap } from 'lucide-react';

export interface CategoryItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  areas: string[];
  active: boolean;
}

interface CategoryConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (category: CategoryItem) => void;
  editingCategory: CategoryItem | null;
}

const iconOptions = [
  { value: 'Award', label: 'Troféu', icon: Award },
  { value: 'Star', label: 'Estrela', icon: Star },
  { value: 'CheckCircle', label: 'Check', icon: CheckCircle },
  { value: 'Users', label: 'Usuários', icon: Users },
  { value: 'BookOpen', label: 'Livro', icon: BookOpen },
  { value: 'Activity', label: 'Atividade', icon: Activity },
  { value: 'Gift', label: 'Presente', icon: Gift },
  { value: 'Heart', label: 'Coração', icon: Heart },
  { value: 'Target', label: 'Alvo', icon: Target },
  { value: 'Zap', label: 'Raio', icon: Zap }
];

const areas = [
  { id: "tech", name: "Tecnologia" },
  { id: "marketing", name: "Marketing" },
  { id: "product", name: "Produto" },
  { id: "hr", name: "RH" },
  { id: "sales", name: "Vendas" },
  { id: "finance", name: "Financeiro" },
  { id: "ops", name: "Operações" }
];

const CategoryConfigModal = ({ open, onOpenChange, onSave, editingCategory }: CategoryConfigModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Award");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (editingCategory) {
      setTitle(editingCategory.title);
      setDescription(editingCategory.description);
      setSelectedIcon(editingCategory.icon);
      setSelectedAreas(editingCategory.areas);
      setActive(editingCategory.active);
    } else {
      setTitle("");
      setDescription("");
      setSelectedIcon("Award");
      setSelectedAreas([]);
      setActive(true);
    }
  }, [editingCategory, open]);

  const handleSave = () => {
    const category: CategoryItem = {
      id: editingCategory?.id || 0,
      title,
      description,
      icon: selectedIcon,
      areas: selectedAreas,
      active
    };
    onSave(category);
    onOpenChange(false);
  };

  const handleAreaToggle = (areaId: string) => {
    setSelectedAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const selectedIconComponent = iconOptions.find(option => option.value === selectedIcon)?.icon || Award;
  const IconComponent = selectedIconComponent;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle>
            {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nome da categoria"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="icon">Ícone</Label>
              <Select value={selectedIcon} onValueChange={setSelectedIcon}>
                <SelectTrigger>
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      {iconOptions.find(option => option.value === selectedIcon)?.label}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {iconOptions.map((option) => {
                    const OptionIcon = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <OptionIcon className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição da categoria"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Áreas Disponíveis</Label>
            <div className="grid grid-cols-2 gap-2">
              {areas.map((area) => (
                <div key={area.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={area.id}
                    checked={selectedAreas.includes(area.id)}
                    onCheckedChange={() => handleAreaToggle(area.id)}
                  />
                  <Label htmlFor={area.id} className="text-sm font-normal">
                    {area.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={active}
              onCheckedChange={(checked) => setActive(checked as boolean)}
            />
            <Label htmlFor="active" className="text-sm font-normal">
              Categoria ativa
            </Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark"
              disabled={!title || !description || selectedAreas.length === 0}
            >
              {editingCategory ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryConfigModal;
