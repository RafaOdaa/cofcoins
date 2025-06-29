
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Award, Star, CheckCircle, Users, BookOpen, Activity, Gift, Heart, Target, Zap,
  Trophy, Medal, Crown, Gem, Sparkles, Shield, Rocket, Coffee, Cake, Pizza,
  GameController2, Music, Camera, Palette, Brush, Lightbulb, Brain, Glasses,
  Headphones, Microphone, Watch, Smartphone, Laptop, Car, Plane, MapPin,
  Home, Building, Store, ShoppingCart, CreditCard, DollarSign, TrendingUp,
  Calendar, Clock, Timer, Bell, Flag, Mountain, Sun, Moon, Umbrella,
  Flower, Tree, Leaf, Apple, Grape, Cherry, IceCream, Donut
} from 'lucide-react';

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
  // Achievement & Recognition
  { value: 'Award', label: 'Troféu', icon: Award, color: 'text-yellow-500' },
  { value: 'Trophy', label: 'Taça', icon: Trophy, color: 'text-yellow-600' },
  { value: 'Medal', label: 'Medalha', icon: Medal, color: 'text-amber-500' },
  { value: 'Crown', label: 'Coroa', icon: Crown, color: 'text-yellow-400' },
  { value: 'Star', label: 'Estrela', icon: Star, color: 'text-yellow-500' },
  { value: 'Sparkles', label: 'Brilho', icon: Sparkles, color: 'text-purple-400' },
  { value: 'CheckCircle', label: 'Check', icon: CheckCircle, color: 'text-green-500' },
  { value: 'Target', label: 'Alvo', icon: Target, color: 'text-red-500' },
  { value: 'Flag', label: 'Bandeira', icon: Flag, color: 'text-blue-500' },

  // People & Team
  { value: 'Users', label: 'Usuários', icon: Users, color: 'text-blue-600' },
  { value: 'Heart', label: 'Coração', icon: Heart, color: 'text-red-500' },
  { value: 'Shield', label: 'Escudo', icon: Shield, color: 'text-blue-700' },

  // Learning & Development
  { value: 'BookOpen', label: 'Livro', icon: BookOpen, color: 'text-emerald-600' },
  { value: 'Brain', label: 'Cérebro', icon: Brain, color: 'text-pink-500' },
  { value: 'Lightbulb', label: 'Lâmpada', icon: Lightbulb, color: 'text-yellow-400' },
  { value: 'Glasses', label: 'Óculos', icon: Glasses, color: 'text-gray-600' },

  // Wellness & Lifestyle
  { value: 'Activity', label: 'Atividade', icon: Activity, color: 'text-green-500' },
  { value: 'Coffee', label: 'Café', icon: Coffee, color: 'text-amber-700' },
  { value: 'Sun', label: 'Sol', icon: Sun, color: 'text-orange-400' },
  { value: 'Moon', label: 'Lua', icon: Moon, color: 'text-indigo-400' },
  { value: 'Umbrella', label: 'Guarda-chuva', icon: Umbrella, color: 'text-blue-500' },

  // Food & Treats
  { value: 'Cake', label: 'Bolo', icon: Cake, color: 'text-pink-400' },
  { value: 'Pizza', label: 'Pizza', icon: Pizza, color: 'text-orange-500' },
  { value: 'Apple', label: 'Maçã', icon: Apple, color: 'text-red-500' },
  { value: 'Grape', label: 'Uva', icon: Grape, color: 'text-purple-500' },
  { value: 'Cherry', label: 'Cereja', icon: Cherry, color: 'text-red-400' },
  { value: 'IceCream', label: 'Sorvete', icon: IceCream, color: 'text-pink-300' },
  { value: 'Donut', label: 'Rosquinha', icon: Donut, color: 'text-amber-400' },

  // Entertainment & Fun
  { value: 'GameController2', label: 'Controle', icon: GameController2, color: 'text-indigo-500' },
  { value: 'Music', label: 'Música', icon: Music, color: 'text-purple-500' },
  { value: 'Camera', label: 'Câmera', icon: Camera, color: 'text-gray-700' },
  { value: 'Headphones', label: 'Fone', icon: Headphones, color: 'text-gray-800' },
  { value: 'Microphone', label: 'Microfone', icon: Microphone, color: 'text-gray-600' },

  // Creative & Art
  { value: 'Palette', label: 'Paleta', icon: Palette, color: 'text-rainbow' },
  { value: 'Brush', label: 'Pincel', icon: Brush, color: 'text-orange-600' },

  // Technology & Innovation
  { value: 'Rocket', label: 'Foguete', icon: Rocket, color: 'text-blue-500' },
  { value: 'Zap', label: 'Raio', icon: Zap, color: 'text-yellow-400' },
  { value: 'Smartphone', label: 'Celular', icon: Smartphone, color: 'text-gray-700' },
  { value: 'Laptop', label: 'Notebook', icon: Laptop, color: 'text-gray-600' },
  { value: 'Watch', label: 'Relógio', icon: Watch, color: 'text-gray-800' },

  // Travel & Adventure
  { value: 'Car', label: 'Carro', icon: Car, color: 'text-red-600' },
  { value: 'Plane', label: 'Avião', icon: Plane, color: 'text-blue-600' },
  { value: 'MapPin', label: 'Localização', icon: MapPin, color: 'text-red-500' },
  { value: 'Mountain', label: 'Montanha', icon: Mountain, color: 'text-green-600' },

  // Business & Finance
  { value: 'Building', label: 'Prédio', icon: Building, color: 'text-gray-600' },
  { value: 'Store', label: 'Loja', icon: Store, color: 'text-blue-600' },
  { value: 'ShoppingCart', label: 'Carrinho', icon: ShoppingCart, color: 'text-green-600' },
  { value: 'CreditCard', label: 'Cartão', icon: CreditCard, color: 'text-blue-500' },
  { value: 'DollarSign', label: 'Dólar', icon: DollarSign, color: 'text-green-600' },
  { value: 'TrendingUp', label: 'Crescimento', icon: TrendingUp, color: 'text-green-500' },

  // Time & Planning
  { value: 'Calendar', label: 'Calendário', icon: Calendar, color: 'text-blue-500' },
  { value: 'Clock', label: 'Relógio', icon: Clock, color: 'text-gray-600' },
  { value: 'Timer', label: 'Timer', icon: Timer, color: 'text-orange-500' },
  { value: 'Bell', label: 'Sino', icon: Bell, color: 'text-yellow-500' },

  // Nature & Environment
  { value: 'Flower', label: 'Flor', icon: Flower, color: 'text-pink-400' },
  { value: 'Tree', label: 'Árvore', icon: Tree, color: 'text-green-600' },
  { value: 'Leaf', label: 'Folha', icon: Leaf, color: 'text-green-500' },

  // Special & Premium
  { value: 'Gem', label: 'Gema', icon: Gem, color: 'text-cyan-400' },
  { value: 'Gift', label: 'Presente', icon: Gift, color: 'text-red-500' },
  { value: 'Home', label: 'Casa', icon: Home, color: 'text-blue-600' }
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
  const [showIconSelector, setShowIconSelector] = useState(false);

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

  const handleIconSelect = (iconValue: string) => {
    setSelectedIcon(iconValue);
    setShowIconSelector(false);
  };

  const selectedIconData = iconOptions.find(option => option.value === selectedIcon);
  const IconComponent = selectedIconData?.icon || Award;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
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
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowIconSelector(!showIconSelector)}
                  className="w-full justify-start"
                >
                  <IconComponent className={`h-5 w-5 mr-2 ${selectedIconData?.color || 'text-gray-600'}`} />
                  {selectedIconData?.label || 'Selecionar ícone'}
                </Button>
                
                {showIconSelector && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border rounded-lg shadow-lg p-4 max-h-80 overflow-y-auto">
                    <div className="grid grid-cols-6 gap-3">
                      {iconOptions.map((option) => {
                        const OptionIcon = option.icon;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleIconSelect(option.value)}
                            className={`p-3 rounded-lg border hover:bg-gray-50 flex flex-col items-center gap-1 transition-colors ${
                              selectedIcon === option.value ? 'border-cofcoin-purple bg-cofcoin-purple/10' : 'border-gray-200'
                            }`}
                            title={option.label}
                          >
                            <OptionIcon className={`h-6 w-6 ${option.color}`} />
                            <span className="text-xs text-gray-600 text-center leading-tight">
                              {option.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
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
