
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Award,
  CheckCircle, 
  Coins,
  Eye,
  Filter,
  Gift,
  Home,
  Plus,
  Search,
  Shield,
  Trophy,
  User,
  Users,
  Wrench,
  XCircle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Mock reward requests data
const rewardRequestsData = [
  { 
    id: 1, 
    user: "Ana Oliveira",
    title: "Vale Café", 
    value: 150, 
    status: "pendente",
    requestDate: new Date('2025-04-15T14:25:00')
  },
  { 
    id: 2, 
    user: "Carlos Mendes",
    title: "Gift Card R$50", 
    value: 500, 
    status: "pendente",
    requestDate: new Date('2025-04-14T09:30:00') 
  },
  { 
    id: 3, 
    user: "Juliana Lima",
    title: "Vale Cinema", 
    value: 300, 
    status: "concluída",
    requestDate: new Date('2025-04-12T16:45:00')
  },
  { 
    id: 4, 
    user: "Rodrigo Almeida",
    title: "Vale Café", 
    value: 150, 
    status: "cancelada",
    requestDate: new Date('2025-04-10T11:20:00')
  },
  { 
    id: 5, 
    user: "Amanda Sousa",
    title: "Gift Card R$50", 
    value: 500, 
    status: "concluída",
    requestDate: new Date('2025-04-08T13:15:00')
  },
];

// Mock approval requests
const approvalRequests = [
  {
    id: 1,
    reporter: "João Silva",
    recipient: "Maria Oliveira",
    amount: 100,
    category: "Fora da Caixa",
    status: "pendente",
    date: new Date('2025-04-15T10:15:00')
  },
  {
    id: 2,
    reporter: "Ana Lima",
    recipient: "Pedro Santos",
    amount: 50,
    category: "O Quebra Galho",
    status: "pendente",
    date: new Date('2025-04-14T16:30:00')
  },
  {
    id: 3,
    reporter: "Carlos Costa",
    recipient: "Juliana Mendes",
    amount: 100,
    category: "Segurador de Rojão",
    status: "concluída",
    date: new Date('2025-04-12T14:45:00')
  },
  {
    id: 4,
    reporter: "Fernanda Gomes",
    recipient: "Rafael Alves",
    amount: 50,
    category: "O Vidente",
    status: "cancelada",
    date: new Date('2025-04-10T09:20:00')
  }
];

// Mock user rankings
const userRankings = [
  { id: 1, name: "Maria Oliveira", recognitionsReceived: 15, totalCoins: 1250 },
  { id: 2, name: "João Silva", recognitionsReceived: 12, totalCoins: 950 },
  { id: 3, name: "Ana Lima", recognitionsReceived: 10, totalCoins: 800 },
  { id: 4, name: "Pedro Santos", recognitionsReceived: 8, totalCoins: 650 },
  { id: 5, name: "Juliana Mendes", recognitionsReceived: 7, totalCoins: 550 },
];

// Mock user balances
const userBalances = [
  { id: 1, name: "Maria Oliveira", balance: 750, spent: 500 },
  { id: 2, name: "João Silva", balance: 650, spent: 300 },
  { id: 3, name: "Ana Lima", balance: 500, spent: 300 },
  { id: 4, name: "Pedro Santos", balance: 450, spent: 200 },
  { id: 5, name: "Juliana Mendes", balance: 350, spent: 200 },
  { id: 6, name: "Carlos Costa", balance: 300, spent: 250 },
  { id: 7, name: "Fernanda Gomes", balance: 250, spent: 150 },
  { id: 8, name: "Rafael Alves", balance: 200, spent: 100 },
];

// Categories for admin recognition
const categories = [
  { 
    id: 1, 
    name: "Fora da Caixa", 
    description: "Pra quem sempre surpreende com soluções e ideias que ninguém tinha pensado, mudando o jogo e dando aquele toque criativo que faz toda a diferença.",
    icon: <Award className="h-5 w-5 text-blue-600" />
  },
  { 
    id: 2, 
    name: "O Quebra Galho", 
    description: "Praquele parceiro que aparece rapidinho e resolve o problema sem enrolação. Quando você precisa, ele tá lá para fazer tudo se ajeitar.",
    icon: <Wrench className="h-5 w-5 text-green-600" />
  },
  { 
    id: 3, 
    name: "Aqui é MedCof!", 
    description: "Pra quem age como se a empresa fosse sua casa: cuida, propõe melhorias e não deixa nada no 'deixa pra depois'. É aquele sentimento de 'se eu não fizer, ninguém faz'.",
    icon: <User className="h-5 w-5 text-red-600" />
  },
  { 
    id: 4, 
    name: "Mestre do Improviso", 
    description: "Pra aquele que, mesmo sem planejar, sempre acha um jeito de resolver a situação e sair da enrascada.",
    icon: <Gift className="h-5 w-5 text-amber-600" />
  },
  { 
    id: 5, 
    name: "Segurador de Rojão", 
    description: "Para aquele(a) colega que chega na hora certa para domar situações explosivas e manter a paz com muita habilidade e leveza.",
    icon: <Shield className="h-5 w-5 text-purple-600" />
  },
  { 
    id: 6, 
    name: "O Vidente", 
    description: "Praquele que, com uma visão quase sobrenatural, identifica e resolve perrengues antes mesmo de acontecerem.",
    icon: <Eye className="h-5 w-5 text-indigo-600" />
  },
];

type Status = "pendente" | "concluída" | "cancelada";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    requestId: number;
    type: 'recognition' | 'reward';
    action: 'approve' | 'reject';
  }>({ open: false, requestId: 0, type: 'recognition', action: 'approve' });
  
  // Admin recognition state
  const [isRecognitionDialogOpen, setIsRecognitionDialogOpen] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [coinAmount, setCoinAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Filtered reward requests
  const filteredRewards = rewardRequestsData.filter(request => {
    // Text search filter
    const searchMatch = 
      request.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Status filter
    const statusMatch = 
      statusFilter === 'all' || request.status === statusFilter;
    
    return searchMatch && statusMatch;
  });
  
  // Filtered approvals
  const filteredApprovals = approvalRequests.filter(request => {
    // Text search filter
    const searchMatch = 
      request.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Status filter
    const statusMatch = 
      statusFilter === 'all' || request.status === statusFilter;
    
    return searchMatch && statusMatch;
  });

  const handleConfirmDialog = (requestId: number, type: 'recognition' | 'reward', action: 'approve' | 'reject') => {
    setConfirmDialog({
      open: true,
      requestId,
      type,
      action
    });
  };

  const handleConfirmAction = async () => {
    const { requestId, type, action } = confirmDialog;
    
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const actionText = action === 'approve' ? 'aprovado' : 'rejeitado';
      const typeText = type === 'recognition' ? 'Reconhecimento' : 'Solicitação de recompensa';
      
      toast({
        title: `${typeText} ${actionText}`,
        description: `${typeText} foi ${actionText} com sucesso.`,
      });
      
      // In a real app, we would update the status in the database and then refresh the data
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar a solicitação.",
        variant: "destructive"
      });
    } finally {
      setConfirmDialog({ ...confirmDialog, open: false });
    }
  };
  
  const handleAdminRecognition = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !coinAmount || !selectedCategory) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Reconhecimento enviado",
        description: `Reconhecimento enviado com sucesso para ${recipient} com ${coinAmount} CofCoins.`,
      });
      
      // Reset form
      setRecipient('');
      setCoinAmount('');
      setSelectedCategory(null);
      
      // Close dialog
      setIsRecognitionDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar o reconhecimento.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getStatusColor = (status: Status) => {
    switch(status) {
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "concluída": return "bg-green-100 text-green-800";
      case "cancelada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              <span className="text-xl font-bold text-gray-900">CofCoins</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/home')}
                className="text-gray-600 hover:text-cofcoin-purple"
              >
                <Home className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Home</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/rewards')}
                className="text-gray-600 hover:text-cofcoin-purple"
              >
                <Gift className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Recompensas</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-cofcoin-purple"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Voltar</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
          
          <Button 
            onClick={() => setIsRecognitionDialogOpen(true)}
            className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Enviar Reconhecimento Especial
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Filtre as solicitações e reconhecimentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar por status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="concluída">Concluída</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="approvals" className="w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-4 mb-4">
            <TabsTrigger value="approvals">Aprovações</TabsTrigger>
            <TabsTrigger value="rewards">Recompensas</TabsTrigger>
            <TabsTrigger value="rankings">Rankings</TabsTrigger>
            <TabsTrigger value="balances">Saldos</TabsTrigger>
          </TabsList>
          
          {/* Approval Tab Content */}
          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle>Aprovações de Reconhecimentos</CardTitle>
                <CardDescription>Gerencie as solicitações de reconhecimento entre colaboradores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Relator</TableHead>
                        <TableHead>Destinatário</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead className="hidden lg:table-cell">Categoria</TableHead>
                        <TableHead>Data/Hora</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApprovals.length > 0 ? (
                        filteredApprovals.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>{request.reporter}</TableCell>
                            <TableCell>{request.recipient}</TableCell>
                            <TableCell>
                              <div className="flex items-center text-cofcoin-orange">
                                <Coins className="h-4 w-4 mr-1" />
                                {request.amount}
                              </div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">{request.category}</TableCell>
                            <TableCell>{format(request.date, 'dd/MM/yyyy HH:mm')}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(request.status as Status)}>
                                {request.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {request.status === "pendente" ? (
                                <div className="flex justify-end gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex items-center text-green-600 border-green-200 hover:bg-green-50"
                                    onClick={() => handleConfirmDialog(request.id, 'recognition', 'approve')}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    <span className="hidden sm:inline">Aprovar</span>
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                                    onClick={() => handleConfirmDialog(request.id, 'recognition', 'reject')}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    <span className="hidden sm:inline">Rejeitar</span>
                                  </Button>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-500">
                                  {request.status === "concluída" ? "Aprovado" : "Rejeitado"}
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                            Nenhuma solicitação de reconhecimento encontrada.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Rewards Tab Content */}
          <TabsContent value="rewards">
            <Card>
              <CardHeader>
                <CardTitle>Solicitações de Recompensas</CardTitle>
                <CardDescription>Gerencie as solicitações de troca de CofCoins por recompensas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Recompensa</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Data/Hora</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRewards.length > 0 ? (
                        filteredRewards.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>{request.user}</TableCell>
                            <TableCell className="font-medium">{request.title}</TableCell>
                            <TableCell>
                              <div className="flex items-center text-cofcoin-orange">
                                <Coins className="h-4 w-4 mr-1" />
                                {request.value}
                              </div>
                            </TableCell>
                            <TableCell>
                              {format(request.requestDate, 'dd/MM/yyyy HH:mm')}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(request.status as Status)}>
                                {request.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {request.status === "pendente" ? (
                                <div className="flex justify-end gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex items-center text-green-600 border-green-200 hover:bg-green-50"
                                    onClick={() => handleConfirmDialog(request.id, 'reward', 'approve')}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    <span className="hidden sm:inline">Aprovar</span>
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                                    onClick={() => handleConfirmDialog(request.id, 'reward', 'reject')}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    <span className="hidden sm:inline">Rejeitar</span>
                                  </Button>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-500">
                                  {request.status === "concluída" ? "Aprovada" : "Rejeitada"}
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                            Nenhuma solicitação de recompensa encontrada.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Rankings Tab Content */}
          <TabsContent value="rankings">
            <Card>
              <CardHeader>
                <CardTitle>Ranking de Reconhecimentos</CardTitle>
                <CardDescription>Colaboradores que mais receberam reconhecimentos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Posição</TableHead>
                        <TableHead>Colaborador</TableHead>
                        <TableHead>Reconhecimentos</TableHead>
                        <TableHead>Total CofCoins</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userRankings.map((user, index) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center font-bold">
                              {index === 0 && <Trophy className="h-5 w-5 text-yellow-500 mr-1" />}
                              {index === 1 && <Trophy className="h-5 w-5 text-gray-400 mr-1" />}
                              {index === 2 && <Trophy className="h-5 w-5 text-amber-700 mr-1" />}
                              {index > 2 && <span className="w-6 text-center">{index + 1}</span>}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.recognitionsReceived}</TableCell>
                          <TableCell>
                            <div className="flex items-center text-cofcoin-orange font-medium">
                              <Coins className="h-4 w-4 mr-1" />
                              {user.totalCoins}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Balances Tab Content */}
          <TabsContent value="balances">
            <Card>
              <CardHeader>
                <CardTitle>Saldos dos Usuários</CardTitle>
                <CardDescription>Saldos atuais de CofCoins de todos os colaboradores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Colaborador</TableHead>
                        <TableHead>Saldo Atual</TableHead>
                        <TableHead>Já Utilizado</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userBalances.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center text-cofcoin-orange font-medium">
                              <Coins className="h-4 w-4 mr-1" />
                              {user.balance}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-gray-600">
                              <Coins className="h-4 w-4 mr-1" />
                              {user.spent}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center font-medium">
                              <Coins className="h-4 w-4 mr-1" />
                              {user.balance + user.spent}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Confirmation Dialog for Approvals */}
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        onConfirm={handleConfirmAction}
        title={confirmDialog.action === 'approve' ? 'Confirmar Aprovação' : 'Confirmar Rejeição'}
        description={`Tem certeza que deseja ${confirmDialog.action === 'approve' ? 'aprovar' : 'rejeitar'} ${confirmDialog.type === 'recognition' ? 'este reconhecimento' : 'esta solicitação de recompensa'}?`}
        confirmText={confirmDialog.action === 'approve' ? 'Aprovar' : 'Rejeitar'}
        variant={confirmDialog.action === 'reject' ? 'destructive' : 'default'}
      />

      {/* Admin Special Recognition Dialog */}
      <Dialog open={isRecognitionDialogOpen} onOpenChange={setIsRecognitionDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center">
              <Award className="mr-2 h-5 w-5 text-cofcoin-purple" />
              Reconhecimento Especial (Admin)
            </DialogTitle>
            <DialogDescription>
              Envie um reconhecimento especial com valor personalizado
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAdminRecognition} className="space-y-6 py-4">
            {/* Recipient Field */}
            <div className="space-y-2">
              <Label htmlFor="recipient">Destinatário</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="recipient"
                  placeholder="Digite o nome do colaborador"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Custom Amount Field */}
            <div className="space-y-2">
              <Label htmlFor="coinAmount">Valor em CofCoins</Label>
              <Input
                id="coinAmount"
                type="number"
                placeholder="Digite o valor"
                value={coinAmount}
                onChange={(e) => setCoinAmount(e.target.value)}
                min="1"
              />
              <p className="text-sm text-gray-500">
                Como administrador, você pode definir um valor personalizado
              </p>
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <Label>Selecione a Categoria</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map(category => (
                  <div
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`border rounded-md p-3 cursor-pointer transition-colors ${
                      selectedCategory === category.id 
                        ? "border-cofcoin-purple bg-cofcoin-purple/10" 
                        : "border-gray-200 hover:border-cofcoin-purple/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {category.icon}
                      <h4 className="font-medium">{category.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRecognitionDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Enviando...
                  </div>
                ) : (
                  "Enviar Reconhecimento"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
