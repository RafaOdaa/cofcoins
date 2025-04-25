import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';
import {
  Activity,
  Award,
  BookOpen,
  CheckCircle,
  Edit,
  Gift,
  Home,
  Plus,
  Search,
  Settings,
  Star,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  Users,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

import RecognitionDetailDialog, { Recognition } from "@/components/RecognitionDetailDialog";
import UserMenu from '@/components/UserMenu';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import NewRecognitionDialog from '@/components/NewRecognitionDialog';
import EditUserBalanceDialog from '@/components/EditUserBalanceDialog';
import RewardConfigModal, { RewardItem } from '@/components/RewardConfigModal';

// Updated monthly activity data structure
const monthlyActivity = [
  { name: "Jan", approved: 65, rejected: 10 },
  { name: "Fev", approved: 75, rejected: 15 },
  { name: "Mar", approved: 85, rejected: 12 },
  { name: "Abr", approved: 70, rejected: 8 },
  { name: "Mai", approved: 80, rejected: 20 },
  { name: "Jun", approved: 90, rejected: 5 },
  { name: "Jul", approved: 75, rejected: 15 },
  { name: "Ago", approved: 85, rejected: 10 },
  { name: "Set", approved: 95, rejected: 8 },
  { name: "Out", approved: 85, rejected: 12 },
  { name: "Nov", approved: 0, rejected: 0 },
  { name: "Dez", approved: 0, rejected: 0 },
];

// Category data with types and colors for charts
const categories = [
  { id: 1, name: "Colaboração Excepcional", value: 42, color: "#8884d8", icon: Award },
  { id: 2, name: "Inovação Constante", value: 28, color: "#82ca9d", icon: Star },
  { id: 3, name: "Compromisso com Qualidade", value: 35, color: "#ffc658", icon: CheckCircle },
  { id: 4, name: "Liderança Inspiradora", value: 20, color: "#ff8042", icon: Users },
  { id: 5, name: "Aprendeu por si, falou por todos", value: 15, color: "#0088fe", icon: BookOpen }
];

// Mock data for the approval items
const approvalItems: Recognition[] = [
  {
    id: 1,
    reporter: "Carolina Silva",
    recipient: "Lucas Mendes",
    amount: 25,
    category: "Colaboração Excepcional",
    description: "Lucas demonstrou um trabalho exemplar ao auxiliar toda a equipe durante o lançamento do novo produto. Sua disponibilidade e conhecimento técnico foram fundamentais para o sucesso do projeto.",
    date: new Date(2023, 9, 15),
    status: "pending",
    icon: Award
  },
  {
    id: 2,
    reporter: "Rafael Costa",
    recipient: "Amanda Oliveira",
    amount: 10,
    category: "Inovação Constante",
    description: "Amanda propôs uma solução criativa que otimizou nosso processo de atendimento, reduzindo o tempo de resposta em 30%.",
    date: new Date(2023, 9, 14),
    status: "pending",
    icon: Star
  },
  {
    id: 3,
    reporter: "Juliana Santos",
    recipient: "Pedro Henrique",
    amount: 15,
    category: "Aprendeu por si, falou por todos",
    description: "Pedro compartilhou conhecimentos valiosos de um curso recente sobre gestão ágil, ajudando toda a equipe a implementar práticas mais eficientes.",
    date: new Date(2023, 9, 13),
    status: "pending",
    icon: BookOpen
  }
];

// Mock data for reward requests
const rewardRequestsData = [
  { 
    id: 1, 
    user: "Ana Oliveira",
    title: "Vale Café", 
    value: 150, 
    status: "pendente",
    requestDate: new Date("2025-04-15T14:25:00"),
    description: "Gostaria de trocar meus CofCoins por um vale café para utilizar na cafeteria do prédio." 
  },
  { 
    id: 2, 
    user: "Carlos Mendes",
    title: "Gift Card R$50", 
    value: 500, 
    status: "pendente",
    requestDate: new Date("2025-04-14T09:30:00"),
    description: "Quero utilizar meus CofCoins acumulados para um gift card da Amazon." 
  },
  { 
    id: 3, 
    user: "Juliana Lima",
    title: "Vale Cinema", 
    value: 300, 
    status: "aprovado",
    requestDate: new Date("2025-04-12T16:45:00"),
    description: "Vou ao cinema com minha família e gostaria de usar meus CofCoins para isso."
  },
  { 
    id: 4, 
    user: "Rodrigo Almeida",
    title: "Vale Café", 
    value: 150, 
    status: "reprovado",
    requestDate: new Date("2025-04-10T11:20:00"),
    description: "Preciso de um café para me manter produtivo durante a tarde."
  }
];

// Mock data for user balances
const userBalances = [
  { id: 1, name: "Lucas Mendes", balance: 135, department: "Tecnologia", spent: 20 },
  { id: 2, name: "Amanda Oliveira", balance: 120, department: "Marketing", spent: 30 },
  { id: 3, name: "Pedro Henrique", balance: 95, department: "Produto", spent: 10 },
  { id: 4, name: "Carolina Silva", balance: 85, department: "RH", spent: 5 },
  { id: 5, name: "Rafael Costa", balance: 75, department: "Vendas", spent: 15 },
  { id: 6, name: "Juliana Santos", balance: 65, department: "Financeiro", spent: 25 },
  { id: 7, name: "Bruno Almeida", balance: 60, department: "Atendimento", spent: 0 },
  { id: 8, name: "Mariana Lima", balance: 55, department: "Operações", spent: 35 },
  { id: 9, name: "Fernando Gomes", balance: 50, department: "Tecnologia", spent: 40 },
  { id: 10, name: "Isabela Martins", balance: 45, department: "Marketing", spent: 50 }
];

// Mock data for recognition history
const recognitionHistory = [
  {
    id: 1,
    sender: "Carolina Silva",
    recipient: "Lucas Mendes",
    category: "Colaboração Excepcional",
    amount: 25,
    date: new Date(2023, 9, 15),
    status: "aprovado"
  },
  {
    id: 2,
    sender: "Rafael Costa",
    recipient: "Amanda Oliveira",
    category: "Inovação Constante",
    amount: 10,
    date: new Date(2023, 9, 14),
    status: "aprovado"
  },
  {
    id: 3,
    sender: "Juliana Santos",
    recipient: "Pedro Henrique",
    category: "Aprendeu por si, falou por todos",
    amount: 15,
    date: new Date(2023, 9, 13),
    status: "pendente"
  },
  {
    id: 4,
    sender: "Bruno Almeida",
    recipient: "Carolina Silva",
    category: "Liderança Inspiradora",
    amount: 20,
    date: new Date(2023, 9, 12),
    status: "reprovado"
  },
  {
    id: 5,
    sender: "Mariana Lima",
    recipient: "Rafael Costa",
    category: "Compromisso com Qualidade",
    amount: 15,
    date: new Date(2023, 9, 11),
    status: "aprovado"
  }
];

// Mock data for dashboard metrics
const topSenders = [
  { name: "Carolina Silva", value: 120 },
  { name: "Rafael Costa", value: 95 },
  { name: "Bruno Almeida", value: 85 },
  { name: "Juliana Santos", value: 75 },
  { name: "Mariana Lima", value: 65 },
];

const topRecipients = [
  { name: "Lucas Mendes", value: 135 },
  { name: "Amanda Oliveira", value: 120 },
  { name: "Pedro Henrique", value: 95 },
  { name: "Fernando Gomes", value: 75 },
  { name: "Isabela Martins", value: 65 },
];

// Initial reward data for configuration
const initialRewards: RewardItem[] = [
  {
    id: 1,
    name: "Day Off",
    description: "Um dia de folga para descansar e recarregar as energias.",
    value: 500,
    areas: ["tech", "marketing", "product", "hr", "sales", "finance", "ops"],
    stock: 10,
    active: true
  },
  {
    id: 2,
    name: "Vale Presente R$50",
    description: "Vale presente para utilizar em lojas parceiras.",
    value: 100,
    areas: ["tech", "marketing", "product", "hr", "sales", "finance", "ops"],
    stock: 15,
    active: true
  },
  {
    id: 3,
    name: "Home Office por 1 semana",
    description: "Trabalhe de casa por uma semana inteira.",
    value: 250,
    areas: ["tech", "product", "sales"],
    stock: 5,
    active: false
  }
];

// Mock data for balance edit history
const balanceEditHistory = [
  { 
    id: 1, 
    admin: "Gabriel Costa",
    recipient: "Lucas Mendes",
    previousBalance: 100,
    newBalance: 135,
    difference: 35,
    date: new Date("2025-04-15T10:30:00"),
    reason: "Reconhecimento especial por performance excepcional no projeto XYZ" 
  },
  { 
    id: 2, 
    admin: "Fernanda Lima",
    recipient: "Amanda Oliveira",
    previousBalance: 150,
    newBalance: 120,
    difference: -30,
    date: new Date("2025-04-14T15:45:00"),
    reason: "Correção de saldo duplicado" 
  },
  { 
    id: 3, 
    admin: "Gabriel Costa",
    recipient: "Pedro Henrique",
    previousBalance: 75,
    newBalance: 95,
    difference: 20,
    date: new Date("2025-04-13T09:15:00"),
    reason: "Bônus por treinamento da equipe" 
  },
  { 
    id: 4, 
    admin: "Fernanda Lima",
    recipient: "Carolina Silva",
    previousBalance: 85,
    newBalance: 85,
    difference: 0,
    date: new Date("2025-04-12T11:20:00"),
    reason: "Verificação de saldo" 
  }
];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [selectedRecognition, setSelectedRecognition] = useState<Recognition | null>(null);
  const [isRecognitionDetailOpen, setIsRecognitionDetailOpen] = useState(false);
  const [isEditBalanceOpen, setIsEditBalanceOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof userBalances[0] | null>(null);
  const [newBalance, setNewBalance] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // State for reward configuration
  const [rewards, setRewards] = useState<RewardItem[]>(initialRewards);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [editingReward, setEditingReward] = useState<RewardItem | null>(null);
  const [rewardSearchTerm, setRewardSearchTerm] = useState("");
  
  // Estado para controle do diálogo de ação (aprovar/rejeitar)
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    id: number;
    action: 'approve' | 'reject';
  }>({
    open: false,
    id: 0,
    action: 'approve'
  });

  // Estado para controle do diálogo de novo reconhecimento especial
  const [isNewRecognitionOpen, setIsNewRecognitionOpen] = useState(false);

  // Função para aprovar um reconhecimento
  const handleApprove = (id: number) => {
    setConfirmDialog({
      open: true,
      id,
      action: 'approve'
    });
  };

  // Função para rejeitar um reconhecimento
  const handleReject = (id: number) => {
    setConfirmDialog({
      open: true,
      id,
      action: 'reject'
    });
  };

  // Função para confirmar a ação (aprovar/rejeitar)
  const handleConfirmAction = () => {
    if (confirmDialog.action === 'approve') {
      toast({
        title: "Reconhecimento aprovado",
        description: `O reconhecimento #${confirmDialog.id} foi aprovado com sucesso.`,
      });
    } else {
      toast({
        title: "Reconhecimento rejeitado",
        description: `O reconhecimento #${confirmDialog.id} foi rejeitado.`,
        variant: "destructive",
      });
    }
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  const handleEditBalance = (user: typeof userBalances[0]) => {
    setSelectedUser(user);
    setNewBalance(user.balance.toString());
    setIsEditBalanceOpen(true);
  };

  const handleSaveBalance = () => {
    if (selectedUser) {
      toast({
        title: "Saldo atualizado",
        description: `O saldo de ${selectedUser.name} foi atualizado para ${newBalance} CofCoins.`,
      });
      setIsEditBalanceOpen(false);
    }
  };

  const handleEditReward = (reward: RewardItem) => {
    setEditingReward(reward);
    setIsRewardModalOpen(true);
  };

  const handleAddNewReward = () => {
    setEditingReward(null);
    setIsRewardModalOpen(true);
  };

  const handleSaveReward = (rewardData: RewardItem) => {
    if (rewardData.id && rewards.find(r => r.id === rewardData.id)) {
      // Update existing reward
      setRewards(rewards.map(r => r.id === rewardData.id ? rewardData : r));
      toast({
        title: "Recompensa atualizada",
        description: `A recompensa "${rewardData.name}" foi atualizada com sucesso.`,
      });
    } else {
      // Add new reward
      setRewards([...rewards, rewardData]);
      toast({
        title: "Recompensa adicionada",
        description: `A recompensa "${rewardData.name}" foi adicionada com sucesso.`,
      });
    }
  };

  const handleToggleRewardStatus = (id: number, currentStatus: boolean) => {
    setRewards(rewards.map(reward => {
      if (reward.id === id) {
        const newStatus = !currentStatus;
        toast({
          title: newStatus ? "Recompensa ativada" : "Recompensa desativada",
          description: `A recompensa foi ${newStatus ? "ativada" : "desativada"} com sucesso.`,
        });
        return { ...reward, active: newStatus };
      }
      return reward;
    }));
  };

  const handleBalanceEditComplete = (userId: number, previousBalance: number, newBalance: number, reason: string) => {
    // Implement your logic here to update the user's balance
    console.log(`User ${userId} balance updated from ${previousBalance} to ${newBalance} due to: ${reason}`);
    // You might want to call an API to update the balance in your database
    toast({
      title: "Saldo atualizado",
      description: `O saldo do usuário foi atualizado com sucesso.`,
    });
  };

  // Filter rewards based on search term
  const filteredRewards = rewards.filter(reward => 
    reward.name.toLowerCase().includes(rewardSearchTerm.toLowerCase()) ||
    reward.description.toLowerCase().includes(rewardSearchTerm.toLowerCase())
  );

  // Filtrar usuários com base no termo de pesquisa
  const filteredUsers = userBalances.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrar histórico com base no termo de pesquisa
  const filteredHistory = recognitionHistory.filter(record => 
    record.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrar histórico de edição de saldo
  const filteredBalanceHistory = balanceEditHistory.filter(record => 
    record.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Contar estatísticas para os cards
  const approvedCount = recognitionHistory.filter(record => record.status === "aprovado").length;
  const rejectedCount = recognitionHistory.filter(record => record.status === "reprovado").length;
  const pendingCount = recognitionHistory.filter(record => record.status === "pendente").length;

  // Contar estatísticas para recompensas
  const approvedRewards = rewardRequestsData.filter(reward => reward.status === "aprovado").length;
  const pendingRewards = rewardRequestsData.filter(reward => reward.status === "pendente").length;
  const rejectedRewards = rewardRequestsData.filter(reward => reward.status === "reprovado").length;

  // Função para obter a cor baseada no status
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case "aprovado": return "bg-green-100 text-green-800 border-green-200";
      case "pendente": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "reprovado": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get areas names from IDs
  const getAreaNames = (areaIds: string[]) => {
    const areaMap: Record<string, string> = {
      "tech": "Tecnologia",
      "marketing": "Marketing",
      "product": "Produto",
      "hr": "RH",
      "sales": "Vendas",
      "finance": "Financeiro",
      "ops": "Operações"
    };
    
    return areaIds.map(id => areaMap[id] || id).join(", ");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 relative">
                  <div className="absolute inset-0 bg-cofcoin-orange rounded-full opacity-20"></div>
                  <div className="absolute inset-1 bg-cofcoin-purple rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                </div>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">CofCoin Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/home')}
                className="text-gray-600 hover:text-cofcoin-purple"
              >
                <Home className="h-5 w-5 mr-1" />
                <span>Home</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/rewards')}
                className="text-gray-600 hover:text-cofcoin-purple"
              >
                <Gift className="h-5 w-5 mr-1" />
                <span>Recompensas</span>
              </Button>
              <UserMenu userName="Admin" isAdmin={true} />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Painel de Administração</h2>
          <p className="text-gray-600">Gerencie reconhecimentos, recompensas e visualize estatísticas.</p>
        </div>

        <div className="flex justify-end mb-4">
          <Button 
            onClick={() => setIsNewRecognitionOpen(true)}
            className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
          >
            <Plus className="h-4 w-4 mr-1" />
            Reconhecimento Especial
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="approvals" className="space-y-8">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-white p-1">
            <TabsTrigger value="approvals" className="px-3">
              Aprovações
            </TabsTrigger>
            <TabsTrigger value="rewards" className="px-3">
              Recompensas
            </TabsTrigger>
            <TabsTrigger value="rewardsConfig" className="px-3">
              Configurar Recompensas
            </TabsTrigger>
            <TabsTrigger value="ranking" className="px-3">
              Ranking
            </TabsTrigger>
            <TabsTrigger value="balances" className="px-3">
              Saldos
            </TabsTrigger>
          </TabsList>

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Aprovações Concluídas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{approvedCount}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                    Aprovações Rejeitadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{rejectedCount}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Award className="h-5 w-5 text-yellow-600 mr-2" />
                    Aprovações Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Solicitante</TableHead>
                      <TableHead>Destinatário</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvalItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.reporter}</TableCell>
                        <TableCell>{item.recipient}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.amount} CofCoins</TableCell>
                        <TableCell>{format(item.date, 'dd/MM/yyyy')}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                            Pendente
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleApprove(item.id)}
                          >
                            Avaliar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Recompensas Aprovadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{approvedRewards}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                    Recompensas Rejeitadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{rejectedRewards}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Award className="h-5 w-5 text-yellow-600 mr-2" />
                    Recompensas Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">{pendingRewards}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recompensas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Buscar recompensa..." 
                    className="pl-10"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Disponibilidade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Day Off</TableCell>
                      <TableCell>100 CofCoins</TableCell>
                      <TableCell>10 disponíveis</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor("aprovado")}>
                          Aprovado
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Vale Presente R$50</TableCell>
                      <TableCell>50 CofCoins</TableCell>
                      <TableCell>15 disponíveis</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor("pendente")}>
                          Pendente
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Home Office por 1 semana</TableCell>
                      <TableCell>175 CofCoins</TableCell>
                      <TableCell>5 disponíveis</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor("reprovado")}>
                          Reprovado
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Configuration Tab - NEW */}
          <TabsContent value="rewardsConfig">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 text-cofcoin-purple mr-2" /> 
                  Configuração de Recompensas
                </CardTitle>
                <Button 
                  onClick={handleAddNewReward}
                  className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Nova Recompensa
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Buscar recompensa..." 
                    className="pl-10"
                    value={rewardSearchTerm}
                    onChange={(e) => setRewardSearchTerm(e.target.value)}
                  />
                </div>
                
                <TooltipProvider>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Áreas</TableHead>
                        <TableHead>Estoque</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRewards.map(reward => (
                        <TableRow key={reward.id}>
                          <TableCell className="font-medium">
