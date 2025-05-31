
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface EditUserDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: number;
    name: string;
    department: string;
  } | null;
  onSave: (userId: number, department: string, squad: string, approvalLeaders: string[]) => void;
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

const approvalLeaders = [
  "Ana Silva",
  "Carlos Mendes", 
  "Maria Oliveira",
  "Pedro Santos",
  "Juliana Costa",
  "Bruno Almeida",
  "Fernanda Lima",
  "Gabriel Costa",
  "Mariana Santos",
  "Ricardo Pereira"
];

const EditUserDataDialog = ({ open, onOpenChange, user, onSave }: EditUserDataDialogProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSquad, setSelectedSquad] = useState('');
  const [selectedApprovalLeaders, setSelectedApprovalLeaders] = useState<string[]>([]);

  useEffect(() => {
    if (user && open) {
      setSelectedDepartment(user.department);
      setSelectedSquad('Nenhum'); // Default squad
      setSelectedApprovalLeaders([]); // Default empty approval leaders
    }
  }, [user, open]);

  const handleAddApprovalLeader = (leader: string) => {
    if (!selectedApprovalLeaders.includes(leader)) {
      setSelectedApprovalLeaders([...selectedApprovalLeaders, leader]);
    }
  };

  const handleRemoveApprovalLeader = (leader: string) => {
    setSelectedApprovalLeaders(selectedApprovalLeaders.filter(l => l !== leader));
  };

  const handleSave = () => {
    if (user && selectedDepartment && selectedSquad) {
      onSave(user.id, selectedDepartment, selectedSquad, selectedApprovalLeaders);
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

          <div className="space-y-2">
            <Label htmlFor="approvalLeaders" className="text-sm font-medium text-gray-700">
              Líder de Aprovação
            </Label>
            <Select onValueChange={handleAddApprovalLeader}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione os líderes de aprovação" />
              </SelectTrigger>
              <SelectContent>
                {approvalLeaders
                  .filter(leader => !selectedApprovalLeaders.includes(leader))
                  .map((leader) => (
                    <SelectItem key={leader} value={leader}>
                      {leader}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            
            {selectedApprovalLeaders.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedApprovalLeaders.map((leader) => (
                  <Badge 
                    key={leader} 
                    variant="secondary" 
                    className="flex items-center gap-1"
                  >
                    {leader}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-red-500" 
                      onClick={() => handleRemoveApprovalLeader(leader)}
                    />
                  </Badge>
                ))}
              </div>
            )}
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
