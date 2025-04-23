
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Coins, Gift, Send, Trash2, Users, Lightbulb, Eye, Shield, Sparkles, BookOpen, UserPlus, UserMinus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import NewRecognitionDialog from '@/components/NewRecognitionDialog';
import UserMenu from '@/components/UserMenu';
import RecognitionDetailDialog from '@/components/RecognitionDetailDialog';
import AnimatedCoinBalance from '@/components/AnimatedCoinBalance';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import EditUserBalanceDialog from '@/components/EditUserBalanceDialog';
import { format } from 'date-fns';

// Mock data for demonstration
const recognitions = [
  { 
    id: 1, 
    reporter: "Ana Silva", 
    recipient: "Carlos Mendes",
    amount: 100, 
    category: "Fora da Caixa", 
    description: "Implementação de nova solução de automação",
    status: "pendente" as const,
    date: new Date("2025-04-10T14:30:00"),
    icon: <Award className="h-4 w-4 text-blue-600" /> 
  },
  { 
    id: 2, 
    reporter: "Carlos Mendes", 
    recipient: "Juliana Costa",
    amount: 50, 
    category: "O Quebra Galho", 
    description: "Auxílio na resolução de problemas técnicos",
    status: "aprovada" as const,
    date: new Date("2025-04-08T09:15:00"),
    icon: <Award className="h-4 w-4 text-green-600" /> 
  },
  { 
    id: 3, 
    reporter: "Maria Oliveira", 
    recipient: "Pedro Santos",
    amount: 100, 
    category: "Segurador de Rojão", 
    description: "Gestão de crise no projeto XYZ",
    status: "rejeitada" as const,
    date: new Date("2025-04-05T16:45:00"),
    icon: <Award className="h-4 w-4 text-purple-600" /> 
  },
];

const users = [
  { id: 1, name: "João Silva", balance: 500, department: "TI", spent: 200 },
  { id: 2, name: "Maria Oliveira", balance: 300, department: "Marketing", spent: 150 },
  { id: 3, name: "Carlos Mendes", balance: 400, department: "Financeiro", spent: 100 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRecognitionDetailOpen, setIsRecognitionDetailOpen] = useState(false);
  const [selectedRecognition, setSelectedRecognition] = useState<null | any>(null);
  const [isEditBalanceOpen, setIsEditBalanceOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | any>(null);
  const [isNewRecognitionOpen, setIsNewRecognitionOpen] = useState(false);
  const [allRecognitions, setAllRecognitions] = useState(recognitions);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: '',
    recognitionId: 0,
  });

  const handleOpenRecognitionDetails = (recognition: any) => {
    setSelectedRecognition(recognition);
    setIsRecognitionDetailOpen(true);
  };

  const handleOpenEditBalance = (user: any) => {
    setSelectedUser(user);
    setIsEditBalanceOpen(true);
  };

  const handleBalanceEditComplete = (userId: number, newBalance: number) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, balance: newBalance } : user
    );
    // You would typically update the state or send this to an API
    toast({
      title: "Saldo atualizado",
      description: `Saldo do usuário ${users.find(u => u.id === userId)?.name} atualizado para ${newBalance} CofCoins.`,
    });
  };

  const handleOpenNewRecognition = () => {
    setIsNewRecognitionOpen(true);
  };

  const handleAction = (action: string, recognitionId: number) => {
    setConfirmDialog({
      open: true,
      action: action,
      recognitionId: recognitionId,
    });
  };

  const handleConfirmAction = () => {
    const { action, recognitionId } = confirmDialog;
    const updatedRecognitions = allRecognitions.map(rec =>
      rec.id === recognitionId ? { ...rec, status: action as "aprovada" | "rejeitada" } : rec
    );
    setAllRecognitions(updatedRecognitions);
    setConfirmDialog({ open: false, action: '', recognitionId: 0 });

    toast({
      title: `Reconhecimento ${action === 'approve' ? 'aprovado' : 'rejeitado'}`,
      description: `O reconhecimento foi ${action === 'approve' ? 'aprovado' : 'rejeitado'} com sucesso.`,
    });
  };

  const getStatusColor = (status: "pendente" | "aprovada" | "rejeitada") => {
    switch(status) {
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "aprovada": return "bg-green-100 text-green-800";
      case "rejeitada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <div className="absolute inset-0 bg-cofcoin-orange rounded-full opacity-20"></div>
                <div className="absolute inset-1 bg-cofcoin-purple rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">CofCoin</span>
            </div>
            
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/rewards')}
                className="text-gray-600 hover:text-cofcoin-purple mr-2 transition-colors duration-300"
              >
                <Gift className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Recompensas</span>
              </Button>
              
              {/* Added user menu component */}
              <UserMenu userName="Admin" isAdmin={true} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Painel do Administrador</h1>
            <p className="text-gray-600">Gerencie os reconhecimentos e usuários</p>
          </div>
          
          {/* Updated with AnimatedCoinBalance component */}
          <AnimatedCoinBalance balance={1000} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="recognitions" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
            <TabsTrigger value="recognitions">Reconhecimentos</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recognitions">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Reconhecimentos</CardTitle>
                <CardDescription>Gerencie os reconhecimentos enviados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Relator</TableHead>
                        <TableHead>Destinatário</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead className="hidden md:table-cell">Categoria</TableHead>
                        <TableHead className="hidden lg:table-cell">Descrição</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allRecognitions.map((recognition) => (
                        <TableRow 
                          key={recognition.id} 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleOpenRecognitionDetails(recognition)}
                        >
                          <TableCell className="font-medium">{recognition.reporter}</TableCell>
                          <TableCell className="font-medium">{recognition.recipient}</TableCell>
                          <TableCell className="text-cofcoin-orange font-medium">{recognition.amount}</TableCell>
                          <TableCell className="hidden md:table-cell">{recognition.category}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span>
                                    {recognition.description.length > 40
                                      ? `${recognition.description.substring(0, 40)}...`
                                      : recognition.description}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">{recognition.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(recognition.status)}>
                              {recognition.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                            {recognition.status === "pendente" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleAction('approve', recognition.id)}
                                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <UserPlus className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleAction('rejeitar', recognition.id)}
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <UserMinus className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                      {allRecognitions.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                            Nenhum reconhecimento encontrado.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Usuários</CardTitle>
                <CardDescription>Gerencie os usuários da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Departamento</TableHead>
                        <TableHead>Saldo</TableHead>
                        <TableHead>Gastos</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell className="text-cofcoin-orange font-medium">{user.balance}</TableCell>
                          <TableCell>{user.spent}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenEditBalance(user)}
                            >
                              Editar Saldo
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {users.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                            Nenhum usuário encontrado.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Dialogs */}
      <RecognitionDetailDialog 
        recognition={selectedRecognition}
        open={isRecognitionDetailOpen}
        onOpenChange={setIsRecognitionDetailOpen}
      />
      
      <EditUserBalanceDialog
        open={isEditBalanceOpen}
        onOpenChange={setIsEditBalanceOpen}
        user={selectedUser || { id: 0, name: "", balance: 0, department: "", spent: 0 }}
        onBalanceChange={handleBalanceEditComplete}
      />
      
      <NewRecognitionDialog 
        open={isNewRecognitionOpen} 
        onOpenChange={setIsNewRecognitionOpen}
        isAdmin={true}
      />
      
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        onConfirm={handleConfirmAction}
        title={confirmDialog.action === 'approve' ? "Confirmar Aprovação" : "Confirmar Rejeição"}
        description={`Tem certeza que deseja ${confirmDialog.action === 'approve' ? 'aprovar' : 'rejeitar'} este reconhecimento?`}
        confirmText={confirmDialog.action === 'approve' ? "Aprovar" : "Rejeitar"}
        variant={confirmDialog.action === 'approve' ? "default" : "destructive"}
      />
    </div>
  );
};

export default AdminDashboard;
