
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Calendar, Coins, User } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

export interface Recognition {
  id: number;
  reporter?: string;
  recipient: string;
  amount: number;
  category: string;
  description?: string;
  status: "pendente" | "concluída" | "cancelada";
  date: Date;
  icon?: React.ReactNode;
}

interface RecognitionDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recognition: Recognition | null;
  showActions?: boolean;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

const RecognitionDetailDialog: React.FC<RecognitionDetailDialogProps> = ({
  open,
  onOpenChange,
  recognition,
  showActions = false,
  onApprove,
  onReject
}) => {
  if (!recognition) return null;

  const getStatusColor = (status: "pendente" | "concluída" | "cancelada") => {
    switch (status) {
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "concluída": return "bg-green-100 text-green-800";
      case "cancelada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Award className="h-5 w-5 mr-2 text-cofcoin-purple" />
            Detalhes do Reconhecimento
          </DialogTitle>
          <DialogDescription>
            Informações completas sobre este reconhecimento
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {/* Status Badge */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Status</span>
              <Badge variant="outline" className={getStatusColor(recognition.status)}>
                {recognition.status.charAt(0).toUpperCase() + recognition.status.slice(1)}
              </Badge>
            </div>

            {/* Date */}
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-sm font-medium text-gray-500">Data</span>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{format(recognition.date, 'dd/MM/yyyy HH:mm')}</span>
              </div>
            </div>

            {/* Reporter - only show if available */}
            {recognition.reporter && (
              <div className="flex justify-between items-center border-t pt-2">
                <span className="text-sm font-medium text-gray-500">Relator</span>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-cofcoin-purple" />
                  <span className="font-medium">{recognition.reporter}</span>
                </div>
              </div>
            )}

            {/* Recipient */}
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-sm font-medium text-gray-500">Destinatário</span>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-cofcoin-orange" />
                <span className="font-medium">{recognition.recipient}</span>
              </div>
            </div>

            {/* Category */}
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-sm font-medium text-gray-500">Categoria</span>
              <div className="flex items-center space-x-2">
                {recognition.icon}
                <span>{recognition.category}</span>
              </div>
            </div>

            {/* Amount */}
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-sm font-medium text-gray-500">Quantidade</span>
              <div className="flex items-center space-x-2">
                <Coins className="h-4 w-4 text-cofcoin-orange" />
                <span className="font-bold text-cofcoin-orange">{recognition.amount}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {recognition.description && (
            <div className="border-t pt-4">
              <span className="text-sm font-medium text-gray-500 block mb-2">Descrição</span>
              <div className="bg-gray-50 p-3 rounded-md text-gray-700 text-sm">
                {recognition.description}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-end gap-2 pt-4">
          {showActions && recognition.status === "pendente" ? (
            <>
              <Button 
                variant="outline" 
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => {
                  if (onReject) onReject(recognition.id);
                  onOpenChange(false);
                }}
              >
                Rejeitar
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  if (onApprove) onApprove(recognition.id);
                  onOpenChange(false);
                }}
              >
                Aprovar
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => onOpenChange(false)}
              variant="outline"
            >
              Fechar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecognitionDetailDialog;
