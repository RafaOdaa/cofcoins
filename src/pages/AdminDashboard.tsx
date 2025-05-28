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
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
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

import RecognitionDetailDialog, { Recognition } from "@/components/RecognitionDetailDialog";
import UserMenu from '@/components/UserMenu';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import NewRecognitionDialog from '@/components/NewRecognitionDialog';
import EditUserBalanceDialog from '@/components/EditUserBalanceDialog';
import RewardConfigModal, { RewardItem } from '@/components/RewardConfigModal';
import {
  Tooltip as UITooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

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

const monthlyActivity = [
  { name: "Jan", aprovados: 65, reprovados: 10 },
  { name: "Fev", aprovados: 75, reprovados: 15 },
  { name: "Mar", aprovados: 85, reprovados: 20 },
  { name: "Abr", aprovados: 70, reprovados: 12 },
  { name: "Mai", aprovados: 80, reprovados: 18 },
  { name: "Jun", aprovados: 90, reprovados: 25 },
  { name: "Jul", aprovados: 75, reprovados: 15 },
  { name: "Ago", aprovados: 85, reprovados: 20 },
  { name: "Set", aprovados: 95, reprovados: 30 },
  { name: "Out", aprovados: 85, reprovados: 22 },
  { name: "Nov", aprovados: 0, reprovados: 0 },
  { name: "Dez", aprovados: 0, reprovados: 0 },
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
    setIsEditBalanceOpen(true);
  };

  const handleBalanceEditComplete = (userId: number, previousBalance: number, newBalanceValue: number, reason: string) => {
    console.log(`User ${userId} balance updated from ${previousBalance} to ${newBalanceValue} due to: ${reason}`);
    toast({
      title: "Saldo atualizado",
      description: `O saldo do usuário foi atualizado com sucesso.`,
    });
    setIsEditBalanceOpen(false);
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

          {/* Rewards Configuration Tab */}
          <TabsContent value="rewardsConfig">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Configuração de Recompensas</CardTitle>
                <Button onClick={handleAddNewReward} className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark">
                  <Plus className="h-4 w-4 mr-1" />
                  Nova Recompensa
                </Button>
              </CardHeader>
              <CardContent>
                <div className="relative flex-1 max-w-sm mb-4">
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
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help">{reward.name}</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{reward.name}</p>
                              </TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help truncate max-w-[200px] inline-block">
                                  {reward.description}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{reward.description}</p>
                              </TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help">{reward.value} CofCoins</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{reward.value} CofCoins</p>
                              </TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help truncate max-w-[150px] inline-block">
                                  {getAreaNames(reward.areas)}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{getAreaNames(reward.areas)}</p>
                              </TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help">{reward.stock}</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Estoque atual: {reward.stock} unidades</p>
                              </TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={reward.active}
                              onCheckedChange={() => handleToggleRewardStatus(reward.id, reward.active)}
                              className="data-[state=checked]:bg-cofcoin-purple"
                            />
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditReward(reward)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TooltipProvider>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Ranking Tab */}
          <TabsContent value="ranking" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Atividade Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyActivity}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="aprovados" name="CofCoins Aprovados" fill="#8884d8" />
                        <Bar dataKey="reprovados" name="CofCoins Reprovados" fill="#FF8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Categorias Mais Usadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categories}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {categories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} CofCoins`, 'Valor']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top 5 Recipientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={topRecipients}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="value" name="CofCoins" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Balances Tab */}
          <TabsContent value="balances" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Saldos de Usuários</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Buscar usuário..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Departamento</TableHead>
                      <TableHead>Saldo</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>{user.balance} CofCoins</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditBalance(user)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Editar Saldo
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Edições de Saldo</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Saldo Anterior</TableHead>
                      <TableHead>Novo Saldo</TableHead>
                      <TableHead>Diferença</TableHead>
                      <TableHead>Motivo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {balanceEditHistory.map(record => (
                      <TableRow key={record.id}>
                        <TableCell>{format(record.date, 'dd/MM/yyyy HH:mm')}</TableCell>
                        <TableCell>{record.admin}</TableCell>
                        <TableCell>{record.recipient}</TableCell>
                        <TableCell>{record.previousBalance} CofCoins</TableCell>
                        <TableCell>{record.newBalance} CofCoins</TableCell>
                        <TableCell>
                          <span className={record.difference > 0 ? 'text-green-600' : record.difference < 0 ? 'text-red-600' : 'text-gray-600'}>
                            {record.difference > 0 ? '+' : ''}{record.difference}
                          </span>
                        </TableCell>
                        <TableCell>{record.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialogs */}
      <RecognitionDetailDialog
        open={isRecognitionDetailOpen}
        onOpenChange={setIsRecognitionDetailOpen}
        recognition={selectedRecognition}
      />
      
      <ConfirmationDialog 
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title={confirmDialog.action === 'approve' ? "Aprovar Reconhecimento" : "Rejeitar Reconhecimento"}
        description={`Tem certeza que deseja ${confirmDialog.action === 'approve' ? 'aprovar' : 'rejeitar'} este reconhecimento?`}
        onConfirm={handleConfirmAction}
      />
      
      <NewRecognitionDialog
        open={isNewRecognitionOpen}
        onOpenChange={setIsNewRecognitionOpen}
        onSave={(recognitionData) => {
          console.log("New special recognition saved:", recognitionData);
          toast({
            title: "Reconhecimento criado",
            description: "O reconhecimento especial foi criado com sucesso.",
          });
          setIsNewRecognitionOpen(false);
        }}
      />
      
      <EditUserBalanceDialog
        open={isEditBalanceOpen}
        onOpenChange={setIsEditBalanceOpen}
        user={selectedUser}
        onSave={handleBalanceEditComplete}
      />
      
      <RewardConfigModal
        open={isRewardModalOpen}
        onOpenChange={setIsRewardModalOpen}
        onSave={handleSaveReward}
        editingReward={editingReward}
      />
    </div>
  );
};

export default AdminDashboard;
