import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Trash } from "lucide-react";
import ConfirmationDialog from "./ConfirmationDialog";

interface EditUserDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: number;
    name: string;
    department: string;
  } | null;
  onSave: (userId: number, department: string, squad: string, approvalLeaders: string[], weeklyCoins: number) => void;
  onDelete?: (userId: number) => void;
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

const EditUserDataDialog = ({ open, onOpenChange, user, onSave, onDelete }: EditUserDataDialogProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSquad, setSelectedSquad] = useState('');
  const [selectedApprovalLeaders, setSelectedApprovalLeaders] = useState<string[]>([]);
  const [weeklyCoins, setWeeklyCoins] = useState<number>(100);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (user && open) {
      setSelectedDepartment(user.department);
      setSelectedSquad('Nenhum'); // Default squad
      setSelectedApprovalLeaders([]); // Default empty approval leaders
      setWeeklyCoins(100); // Default weekly coins
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
      onSave(user.id, selectedDepartment, selectedSquad, selectedApprovalLeaders, weeklyCoins);
      onOpenChange(false);
    }
  };

  const handleDelete = () => {
    if (user && onDelete) {
      onDelete(user.id);
      setShowDeleteConfirmation(false);
      onOpenChange(false);
    }
  };

  if (!user) return null;

  return (
    <>
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

            <div className="space-y-2">
              <Label htmlFor="weeklyCoins" className="text-sm font-medium text-gray-700">
                CofCoins Semanais
              </Label>
              <Input
                id="weeklyCoins"
                type="number"
                min="0"
                max="500"
                value={weeklyCoins}
                onChange={(e) => setWeeklyCoins(Math.min(500, Number(e.target.value)))}
                placeholder="Digite a quantidade de CofCoins semanais"
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Quantidade de CofCoins que o usuário receberá semanalmente (máximo: 500)
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <Button 
              variant="destructive" 
              onClick={() => setShowDeleteConfirmation(true)}
              className="flex items-center gap-2"
              disabled={!onDelete}
            >
              <Trash className="h-4 w-4" />
              Excluir Usuário
            </Button>
            
            <div className="flex space-x-2">
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
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        description={`Tem certeza de que deseja excluir o usuário "${user?.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="destructive"
      />
    </>
  );
};

export default EditUserDataDialog;
