
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditUserDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: number;
    name: string;
    department: string;
  } | null;
  onSave: (userId: number, department: string, squad: string) => void;
}

const departments = [
  "Tecnologia",
  "Marketing", 
  "Produto",
  "RH",
  "Vendas",
  "Financeiro",
  "Operações",
  "Atendimento"
];

const squads = [
  "Nenhum",
  "PR Mafia",
  "MedCode", 
  "TIP",
  "CodeTroopers",
  "Intranetando"
];

const EditUserDataDialog = ({ open, onOpenChange, user, onSave }: EditUserDataDialogProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSquad, setSelectedSquad] = useState('');

  useEffect(() => {
    if (user && open) {
      setSelectedDepartment(user.department);
      setSelectedSquad('Nenhum'); // Default squad
    }
  }, [user, open]);

  const handleSave = () => {
    if (user && selectedDepartment && selectedSquad) {
      onSave(user.id, selectedDepartment, selectedSquad);
      onOpenChange(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Dados do Usuário</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Usuário
            </Label>
            <div className="p-2 bg-gray-50 rounded-md text-sm text-gray-900">
              {user.name}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-medium text-gray-700">
              Departamento
            </Label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o departamento" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="squad" className="text-sm font-medium text-gray-700">
              Squad
            </Label>
            <Select value={selectedSquad} onValueChange={setSelectedSquad}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o squad" />
              </SelectTrigger>
              <SelectContent>
                {squads.map((squad) => (
                  <SelectItem key={squad} value={squad}>
                    {squad}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!selectedDepartment || !selectedSquad}
            className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark"
          >
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDataDialog;
