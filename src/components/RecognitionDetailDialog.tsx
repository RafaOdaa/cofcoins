
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Award, CheckCircle, Coins, Calendar, UserRound, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export interface Recognition {
  id: number;
  reporter?: string;
  recipient?: string;
  amount: number;
  category: string;
  description: string;
  status: "pendente" | "concluída" | "cancelada";
  date: Date;
  icon: React.ReactNode;
  approver?: string | null;
}

interface RecognitionDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recognition: Recognition | null;
  showActions?: boolean;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

const RecognitionDetailDialog = ({
  open,
  onOpenChange,
  recognition,
  showActions = false,
  onApprove,
  onReject,
}: RecognitionDetailDialogProps) => {
  if (!recognition) return null;

  const getStatusColor = (status: "pendente" | "concluída" | "cancelada") => {
    switch(status) {
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "concluída": return "bg-green-100 text-green-800";
      case "cancelada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            {recognition.icon || <Award className="mr-2 h-5 w-5 text-cofcoin-purple" />}
            <span className="ml-2">Detalhes do Reconhecimento</span>
          </DialogTitle>
          <DialogDescription>
            Informações completas sobre este reconhecimento
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <Badge variant="outline" className={getStatusColor(recognition.status)}>
                {recognition.status}
              </Badge>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">Valor</p>
              <div className="flex items-center text-cofcoin-orange font-bold text-2xl">
                <Coins className="mr-1 h-5 w-5" />
                {recognition.amount}
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Categoria</p>
            <p className="text-lg font-medium">{recognition.category}</p>
          </div>

          {recognition.reporter && (
            <div>
              <p className="text-sm font-medium text-gray-500">De</p>
              <div className="flex items-center">
                <UserRound className="mr-2 h-4 w-4 text-gray-600" />
                <p className="text-lg">{recognition.reporter}</p>
              </div>
            </div>
          )}

          {recognition.recipient && (
            <div>
              <p className="text-sm font-medium text-gray-500">Para</p>
              <div className="flex items-center">
                <UserRound className="mr-2 h-4 w-4 text-gray-600" />
                <p className="text-lg">{recognition.recipient}</p>
              </div>
            </div>
          )}

          {recognition.approver && (
            <div>
              <p className="text-sm font-medium text-gray-500">Aprovado por</p>
              <div className="flex items-center">
                <UserRound className="mr-2 h-4 w-4 text-gray-600" />
                <p className="text-lg">{recognition.approver}</p>
              </div>
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-gray-500">Data</p>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-600" />
              <p>{format(recognition.date, "dd/MM/yyyy 'às' HH:mm")}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Descrição</p>
            <p className="mt-1 whitespace-pre-line">{recognition.description}</p>
          </div>
        </div>

        {showActions && onApprove && onReject && (
          <DialogFooter className="flex justify-between sm:justify-end gap-2">
            <Button
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => {
                onReject(recognition.id);
                onOpenChange(false);
              }}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Rejeitar
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                onApprove(recognition.id);
                onOpenChange(false);
              }}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Aprovar
            </Button>
          </DialogFooter>
        )}

        {!showActions && (
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Fechar</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecognitionDetailDialog;
