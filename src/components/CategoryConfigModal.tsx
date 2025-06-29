
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';

interface CategoryItem {
  id?: number;
  title: string;
  description: string;
  icon: string;
  areas: string[];
}

interface CategoryConfigModalProps {
  open: boolean;
  category?: CategoryItem | null;
  onOpenChange: (open: boolean) => void;
  onSave: (category: CategoryItem) => void;
}

const areas = [
  "Desenvolvimento",
  "Marketing", 
  "Vendas",
  "Design",
  "Atendimento",
  "Financeiro",
  "Recursos Humanos"
];

const CategoryConfigModal: React.FC<CategoryConfigModalProps> = ({
  open,
  category,
  onOpenChange,
  onSave
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CategoryItem>({
    title: '',
    description: '',
    icon: 'Tag',
    areas: []
  });

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({
        title: '',
        description: '',
        icon: 'Tag',
        areas: []
      });
    }
  }, [category, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Erro",
        description: "O título é obrigatório.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: "Erro", 
        description: "A descrição é obrigatória.",
        variant: "destructive"
      });
      return;
    }

    if (formData.areas.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma área.",
        variant: "destructive"
      });
      return;
    }

    onSave(formData);
  };

  const handleAreaChange = (area: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        areas: [...prev.areas, area]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        areas: prev.areas.filter(a => a !== area)
      }));
    }
  };

  const handleSelectAllAreas = () => {
    const allSelected = formData.areas.length === areas.length;
    if (allSelected) {
      setFormData(prev => ({ ...prev, areas: [] }));
    } else {
      setFormData(prev => ({ ...prev, areas: [...areas] }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {category ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
          </DialogTitle>
          <DialogDescription>
            {category ? 'Edite os dados da categoria de reconhecimento.' : 'Crie uma nova categoria de reconhecimento.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ex: Liderança"
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Ex: Reconhecimentos relacionados a capacidade de liderança e gestão"
                rows={3}
              />
            </div>

            <div>
              <Label>Áreas Disponibilizadas *</Label>
              <div className="mt-2 space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
                <div className="flex items-center space-x-2 pb-2 border-b">
                  <Checkbox
                    id="select-all"
                    checked={formData.areas.length === areas.length}
                    onCheckedChange={handleSelectAllAreas}
                  />
                  <Label htmlFor="select-all" className="font-medium">
                    Selecionar todas as áreas
                  </Label>
                </div>
                {areas.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={formData.areas.includes(area)}
                      onCheckedChange={(checked) => handleAreaChange(area, checked as boolean)}
                    />
                    <Label htmlFor={area}>{area}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark">
              {category ? 'Salvar Alterações' : 'Criar Categoria'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryConfigModal;
