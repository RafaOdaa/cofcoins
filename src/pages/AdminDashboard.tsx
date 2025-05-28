import React, { useState, Dispatch, SetStateAction } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';
import { Activity, Award, BookOpen, CheckCircle, Edit, Gift, Home, Plus, Search, Settings, Star, ToggleLeft, ToggleRight, TrendingUp, Users, XCircle, LucideProps } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import RecognitionDetailDialog, { Recognition } from "@/components/RecognitionDetailDialog";
import UserMenu from '@/components/UserMenu';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import NewRecognitionDialog from '@/components/NewRecognitionDialog';
import EditUserBalanceDialog from '@/components/EditUserBalanceDialog';
import RewardConfigModal, { RewardItem } from '@/components/RewardConfigModal';
import { Tooltip as UITooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

// Category data with types and colors for charts
const categories = [{
  id: 1,
  name: "Colaboração Excepcional",
  value: 42,
  color: "hsl(var(--primary))",
  icon: Award
}, {
  id: 2,
  name: "Inovação Constante",
  value: 28,
  color: "hsl(var(--secondary))",
  icon: Star
}, {
  id: 3,
  name: "Compromisso com Qualidade",
  value: 35,
  color: "hsl(var(--accent))",
  icon: CheckCircle
}, {
  id: 4,
  name: "Liderança Inspiradora",
  value: 20,
  color: "hsl(var(--primary) / 0.7)",
  icon: Users
}, {
  id: 5,
  name: "Aprendeu por si, falou por todos",
  value: 15,
  color: "hsl(var(--secondary) / 0.7)",
  icon: BookOpen
}];

// Mock data for the approval items
const approvalItems: Recognition[] = [{
  id: 1,
  reporter: "Carolina Silva",
  recipient: "Lucas Mendes",
  amount: 25,
  category: "Colaboração Excepcional",
  description: "Lucas demonstrou um trabalho exemplar ao auxiliar toda a equipe durante o lançamento do novo produto. Sua disponibilidade e conhecimento técnico foram fundamentais para o sucesso do projeto.",
  date: new Date(2023, 9, 15),
  status: "pending",
  icon: Award
}, {
  id: 2,
  reporter: "Rafael Costa",
  recipient: "Amanda Oliveira",
  amount: 10,
  category: "Inovação Constante",
  description: "Amanda propôs uma solução criativa que otimizou nosso processo de atendimento, reduzindo o tempo de resposta em 30%.",
  date: new Date(2023, 9, 14),
  status: "pending",
  icon: Star
}, {
  id: 3,
  reporter: "Juliana Santos",
  recipient: "Pedro Henrique",
  amount: 15,
  category: "Aprendeu por si, falou por todos",
  description: "Pedro compartilhou conhecimentos valiosos de um curso recente sobre gestão ágil, ajudando toda a equipe a implementar práticas mais eficientes.",
  date: new Date(2023, 9, 13),
  status: "pending",
  icon: BookOpen
}];

// Mock data for reward requests
const rewardRequestsData = [{
  id: 1,
  user: "Ana Oliveira",
  title: "Vale Café",
  value: 150,
  status: "pendente",
  requestDate: new Date("2025-04-15T14:25:00"),
  description: "Gostaria de trocar meus CofCoins por um vale café para utilizar na cafeteria do prédio."
}, {
  id: 2,
  user: "Carlos Mendes",
  title: "Gift Card R$50",
  value: 500,
  status: "pendente",
  requestDate: new Date("2025-04-14T09:30:00"),
  description: "Quero utilizar meus CofCoins acumulados para um gift card da Amazon."
}, {
  id: 3,
  user: "Juliana Lima",
  title: "Vale Cinema",
  value: 300,
  status: "aprovado",
  requestDate: new Date("2025-04-12T16:45:00"),
  description: "Vou ao cinema com minha família e gostaria de usar meus CofCoins para isso."
}, {
  id: 4,
  user: "Rodrigo Almeida",
  title: "Vale Café",
  value: 150,
  status: "reprovado",
  requestDate: new Date("2025-04-10T11:20:00"),
  description: "Preciso de um café para me manter produtivo durante a tarde."
}];

// Mock data for user balances
const userBalances = [{
  id: 1,
  name: "Lucas Mendes",
  balance: 135,
  department: "Tecnologia",
  spent: 20
}, {
  id: 2,
  name: "Amanda Oliveira",
  balance: 120,
  department: "Marketing",
  spent: 30
}, {
  id: 3,
  name: "Pedro Henrique",
  balance: 95,
  department: "Produto",
  spent: 10
}, {
  id: 4,
  name: "Carolina Silva",
  balance: 85,
  department: "RH",
  spent: 5
}, {
  id: 5,
  name: "Rafael Costa",
  balance: 75,
  department: "Vendas",
  spent: 15
}, {
  id: 6,
  name: "Juliana Santos",
  balance: 65,
  department: "Financeiro",
  spent: 25
}, {
  id: 7,
  name: "Bruno Almeida",
  balance: 60,
  department: "Atendimento",
  spent: 0
}, {
  id: 8,
  name: "Mariana Lima",
  balance: 55,
  department: "Operações",
  spent: 35
}, {
  id: 9,
  name: "Fernando Gomes",
  balance: 50,
  department: "Tecnologia",
  spent: 40
}, {
  id: 10,
  name: "Isabela Martins",
  balance: 45,
  department: "Marketing",
  spent: 50
}];

// Mock data for recognition history
const recognitionHistory = [{
  id: 1,
  sender: "Carolina Silva",
  recipient: "Lucas Mendes",
  category: "Colaboração Excepcional",
  amount: 25,
  date: new Date(2023, 9, 15),
  status: "aprovado"
}, {
  id: 2,
  sender: "Rafael Costa",
  recipient: "Amanda Oliveira",
  category: "Inovação Constante",
  amount: 10,
  date: new Date(2023, 9, 14),
  status: "aprovado"
}, {
  id: 3,
  sender: "Juliana Santos",
  recipient: "Pedro Henrique",
  category: "Aprendeu por si, falou por todos",
  amount: 15,
  date: new Date(2023, 9, 13),
  status: "pendente"
}, {
  id: 4,
  sender: "Bruno Almeida",
  recipient: "Carolina Silva",
  category: "Liderança Inspiradora",
  amount: 20,
  date: new Date(2023, 9, 12),
  status: "reprovado"
}, {
  id: 5,
  sender: "Mariana Lima",
  recipient: "Rafael Costa",
  category: "Compromisso com Qualidade",
  amount: 15,
  date: new Date(2023, 9, 11),
  status: "aprovado"
}];

// Mock data for dashboard metrics
const topSenders = [{
  name: "Carolina Silva",
  value: 120
}, {
  name: "Rafael Costa",
  value: 95
}, {
  name: "Bruno Almeida",
  value: 85
}, {
  name: "Juliana Santos",
  value: 75
}, {
  name: "Mariana Lima",
  value: 65
}];
const topRecipients = [{
  name: "Lucas Mendes",
  value: 135
}, {
  name: "Amanda Oliveira",
  value: 120
}, {
  name: "Pedro Henrique",
  value: 95
}, {
  name: "Fernando Gomes",
  value: 75
}, {
  name: "Isabela Martins",
  value: 65
}];
const monthlyActivity = [{
  name: "Jan",
  "CofCoins Enviados": 65,
  "CofCoins Aprovados": 50
}, {
  name: "Fev",
  "CofCoins Enviados": 75,
  "CofCoins Aprovados": 60
}, {
  name: "Mar",
  "CofCoins Enviados": 85,
  "CofCoins Aprovados": 70
}, {
  name: "Abr",
  "CofCoins Enviados": 70,
  "CofCoins Aprovados": 55
}, {
  name: "Mai",
  "CofCoins Enviados": 80,
  "CofCoins Aprovados": 65
}, {
  name: "Jun",
  "CofCoins Enviados": 90,
  "CofCoins Aprovados": 75
}, {
  name: "Jul",
  "CofCoins Enviados": 75,
  "CofCoins Aprovados": 60
}, {
  name: "Ago",
  "CofCoins Enviados": 85,
  "CofCoins Aprovados": 70
}, {
  name: "Set",
  "CofCoins Enviados": 95,
  "CofCoins Aprovados": 80
}, {
  name: "Out",
  "CofCoins Enviados": 85,
  "CofCoins Aprovados": 68
}, {
  name: "Nov",
  "CofCoins Enviados": 0,
  "CofCoins Aprovados": 0
}, {
  name: "Dez",
  "CofCoins Enviados": 0,
  "CofCoins Aprovados": 0
}];

// Initial reward data for configuration
const initialRewards: RewardItem[] = [{
  id: 1,
  name: "Day Off",
  description: "Um dia de folga para descansar e recarregar as energias.",
  value: 500,
  areas: ["tech", "marketing", "product", "hr", "sales", "finance", "ops"],
  stock: 10,
  active: true
}, {
  id: 2,
  name: "Vale Presente R$50",
  description: "Vale presente para utilizar em lojas parceiras.",
  value: 100,
  areas: ["tech", "marketing", "product", "hr", "sales", "finance", "ops"],
  stock: 15,
  active: true
}, {
  id: 3,
  name: "Home Office por 1 semana",
  description: "Trabalhe de casa por uma semana inteira.",
  value: 250,
  areas: ["tech", "product", "sales"],
  stock: 5,
  active: false
}];

// Mock data for balance edit history
const balanceEditHistory = [{
  id: 1,
  admin: "Gabriel Costa",
  recipient: "Lucas Mendes",
  previousBalance: 100,
  newBalance: 135,
  difference: 35,
  date: new Date("2025-04-15T10:30:00"),
  reason: "Reconhecimento especial por performance excepcional no projeto XYZ"
}, {
  id: 2,
  admin: "Fernanda Lima",
  recipient: "Amanda Oliveira",
  previousBalance: 150,
  newBalance: 120,
  difference: -30,
  date: new Date("2025-04-14T15:45:00"),
  reason: "Correção de saldo duplicado"
}, {
  id: 3,
  admin: "Gabriel Costa",
  recipient: "Pedro Henrique",
  previousBalance: 75,
  newBalance: 95,
  difference: 20,
  date: new Date("2025-04-13T09:15:00"),
  reason: "Bônus por treinamento da equipe"
}, {
  id: 4,
  admin: "Fernanda Lima",
  recipient: "Carolina Silva",
  previousBalance: 85,
  newBalance: 85,
  difference: 0,
  date: new Date("2025-04-12T11:20:00"),
  reason: "Verificação de saldo"
}];

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
        description: `O reconhecimento #${confirmDialog.id} foi aprovado com sucesso.`
      });
    } else {
      toast({
        title: "Reconhecimento rejeitado",
        description: `O reconhecimento #${confirmDialog.id} foi rejeitado.`,
        variant: "destructive"
      });
    }
    setConfirmDialog({
      ...confirmDialog,
      open: false
    });
  };
  const handleEditBalance = (user: typeof userBalances[0]) => {
    setSelectedUser(user);
    setIsEditBalanceOpen(true);
  };
  const handleBalanceEditComplete = (userId: number, previousBalance: number, newBalanceValue: number, reason: string) => {
    console.log(`User ${userId} balance updated from ${previousBalance} to ${newBalanceValue} due to: ${reason}`);
    toast({
      title: "Saldo atualizado",
      description: `O saldo do usuário foi atualizado com sucesso.`
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
        description: `A recompensa "${rewardData.name}" foi atualizada com sucesso.`
      });
    } else {
      // Add new reward
      setRewards([...rewards, rewardData]);
      toast({
        title: "Recompensa adicionada",
        description: `A recompensa "${rewardData.name}" foi adicionada com sucesso.`
      });
    }
  };
  const handleToggleRewardStatus = (id: number, currentStatus: boolean) => {
    setRewards(rewards.map(reward => {
      if (reward.id === id) {
        const newStatus = !currentStatus;
        toast({
          title: newStatus ? "Recompensa ativada" : "Recompensa desativada",
          description: `A recompensa foi ${newStatus ? "ativada" : "desativada"} com sucesso.`
        });
        return {
          ...reward,
          active: newStatus
        };
      }
      return reward;
    }));
  };

  // Filter rewards based on search term
  const filteredRewards = rewards.filter(reward => reward.name.toLowerCase().includes(rewardSearchTerm.toLowerCase()) || reward.description.toLowerCase().includes(rewardSearchTerm.toLowerCase()));

  // Filtrar usuários com base no termo de pesquisa
  const filteredUsers = userBalances.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.department.toLowerCase().includes(searchTerm.toLowerCase()));

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
    switch (status.toLowerCase()) {
      case "aprovado":
        return "bg-green-100 text-green-800 border-green-200";
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "reprovado":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
  return <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 relative">
                  <div className="absolute inset-0 bg-primary rounded-full opacity-20"></div>
                  <div className="absolute inset-1 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">A</span>
                  </div>
                </div>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-foreground">Admin CofCoin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/home')} className="text-foreground hover:text-primary">
                <Home className="h-5 w-5 mr-1" />
                <span>Home</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/rewards')} className="text-foreground hover:text-primary">
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
          <h2 className="text-2xl font-semibold text-foreground">Painel de Administração</h2>
          <p className="text-muted-foreground">Gerencie reconhecimentos, recompensas e visualize estatísticas.</p>
        </div>

        <div className="flex justify-end mb-4">
          <Button onClick={() => setIsNewRecognitionOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-1" />
            Reconhecimento Especial
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="approvals" className="space-y-8">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-card p-1 text-muted-foreground">
            <TabsTrigger value="approvals" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm px-3">
              Aprovações
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm px-3">
              Solicitações Recomp.
            </TabsTrigger>
            <TabsTrigger value="rewardsConfig" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm px-3">
              Configurar Recompensas
            </TabsTrigger>
            <TabsTrigger value="ranking" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm px-3">
              Ranking
            </TabsTrigger>
            <TabsTrigger value="balances" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm px-3">
              Saldos
            </TabsTrigger>
          </TabsList>

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-foreground">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Aprov. Concluídas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{approvedCount}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-foreground">
                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                    Aprov. Rejeitadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{rejectedCount}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-foreground">
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
                      <TableHead className="text-foreground">Solicitante</TableHead>
                      <TableHead className="text-foreground">Destinatário</TableHead>
                      <TableHead className="text-foreground">Categoria</TableHead>
                      <TableHead className="text-foreground">Valor</TableHead>
                      <TableHead className="text-foreground">Data</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                      <TableHead className="text-right text-foreground">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvalItems.map(item => (
                      <TableRow key={item.id}>
                        <TableCell className="text-muted-foreground">{item.reporter}</TableCell>
                        <TableCell className="text-muted-foreground">{item.recipient}</TableCell>
                        <TableCell className="text-muted-foreground">{item.category}</TableCell>
                        <TableCell className="text-muted-foreground">{item.amount} CofCoins</TableCell>
                        <TableCell className="text-muted-foreground">{format(item.date, 'dd/MM/yyyy')}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(item.status || "pendente")}>
                            {item.status === "pending" ? "Pendente" : item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => { setSelectedRecognition(item); setIsRecognitionDetailOpen(true); }} className="text-primary hover:text-primary/80">
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

          {/* Rewards Tab - Solicitações de Recompensa */}
          <TabsContent value="rewards">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-foreground">
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
                  <CardTitle className="text-lg flex items-center text-foreground">
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
                  <CardTitle className="text-lg flex items-center text-foreground">
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
                <CardTitle className="text-foreground">Solicitações de Recompensa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar solicitação..." className="pl-10 bg-card border-border text-foreground" onChange={e => setSearchTerm(e.target.value)} />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground">Usuário</TableHead>
                      <TableHead className="text-foreground">Recompensa</TableHead>
                      <TableHead className="text-foreground">Valor</TableHead>
                      <TableHead className="text-foreground">Data Solic.</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                      <TableHead className="text-right text-foreground">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rewardRequestsData.filter(req => req.user.toLowerCase().includes(searchTerm.toLowerCase()) || req.title.toLowerCase().includes(searchTerm.toLowerCase())).map(request => (
                      <TableRow key={request.id}>
                        <TableCell className="text-muted-foreground">{request.user}</TableCell>
                        <TableCell className="text-muted-foreground">{request.title}</TableCell>
                        <TableCell className="text-muted-foreground">{request.value} CofCoins</TableCell>
                        <TableCell className="text-muted-foreground">{format(request.requestDate, 'dd/MM/yyyy HH:mm')}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(request.status)}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {request.status === 'pendente' && (
                            <>
                              <Button variant="ghost" size="xs" onClick={() => handleApprove(request.id, 'reward', request)} className="text-green-600 hover:text-green-500 mr-1">
                                Aprovar
                              </Button>
                              <Button variant="ghost" size="xs" onClick={() => handleReject(request.id, 'reward', request)} className="text-red-600 hover:text-red-500">
                                Rejeitar
                              </Button>
                            </>
                          )}
                           {request.status !== 'pendente' && (
                             <span className="text-xs text-muted-foreground italic">Processado</span>
                           )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Configuration Tab */}
          <TabsContent value="rewardsConfig">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground">Configuração de Recompensas</CardTitle>
                <Button onClick={handleAddNewReward} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="h-4 w-4 mr-1" />
                  Nova Recompensa
                </Button>
              </CardHeader>
              <CardContent>
                <div className="relative flex-1 max-w-sm mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar recompensa..." className="pl-10 bg-card border-border text-foreground" value={rewardSearchTerm} onChange={e => setRewardSearchTerm(e.target.value)} />
                </div>
                
                <TooltipProvider>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-foreground">Nome</TableHead>
                        <TableHead className="text-foreground">Descrição</TableHead>
                        <TableHead className="text-foreground">Valor</TableHead>
                        <TableHead className="text-foreground">Áreas</TableHead>
                        <TableHead className="text-foreground">Estoque</TableHead>
                        <TableHead className="text-foreground">Status</TableHead>
                        <TableHead className="text-right text-foreground">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRewards.map(reward => (
                        <TableRow key={reward.id}>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild><span className="cursor-help text-muted-foreground">{reward.name}</span></TooltipTrigger>
                              <TooltipContent className="bg-popover text-popover-foreground border-border"><p>{reward.name}</p></TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild><span className="cursor-help truncate max-w-[200px] inline-block text-muted-foreground">{reward.description}</span></TooltipTrigger>
                              <TooltipContent className="bg-popover text-popover-foreground border-border"><p>{reward.description}</p></TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild><span className="cursor-help text-muted-foreground">{reward.value} CofCoins</span></TooltipTrigger>
                              <TooltipContent className="bg-popover text-popover-foreground border-border"><p>{reward.value} CofCoins</p></TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild><span className="cursor-help truncate max-w-[150px] inline-block text-muted-foreground">{getAreaNames(reward.areas)}</span></TooltipTrigger>
                              <TooltipContent className="bg-popover text-popover-foreground border-border"><p>{getAreaNames(reward.areas)}</p></TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild><span className="cursor-help text-muted-foreground">{reward.stock}</span></TooltipTrigger>
                              <TooltipContent className="bg-popover text-popover-foreground border-border"><p>Estoque atual: {reward.stock} unidades</p></TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <Switch checked={reward.active} onCheckedChange={() => handleToggleRewardStatus(reward.id, reward.active)} className="data-[state=checked]:bg-primary" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleEditReward(reward)} className="text-primary hover:text-primary/80">
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
                  <CardTitle className="text-foreground">Atividade Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyActivity}>
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} itemStyle={{ color: 'hsl(var(--card-foreground))' }} />
                        <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                        <Bar dataKey="CofCoins Enviados" name="CofCoins Enviados" fill="hsl(var(--primary))" />
                        <Bar dataKey="CofCoins Aprovados" name="CofCoins Aprovados" fill="hsl(var(--accent))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Categorias Mais Usadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={categories} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="hsl(var(--primary))" dataKey="value" nameKey="name" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} legendType="circle">
                          {categories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} itemStyle={{ color: 'hsl(var(--card-foreground))' }} formatter={(value: number, name: string) => [`${value} reconhecimentos`, name]} />
                         <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Top 5 Recipientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topRecipients} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                        <YAxis dataKey="name" type="category" width={100} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} itemStyle={{ color: 'hsl(var(--card-foreground))' }} />
                        <Bar dataKey="value" name="CofCoins Recebidos" fill="hsl(var(--secondary))" />
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
                <CardTitle className="text-foreground">Saldos de Usuários</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar usuário..." className="pl-10 bg-card border-border text-foreground" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground">Nome</TableHead>
                      <TableHead className="text-foreground">Departamento</TableHead>
                      <TableHead className="text-foreground">Saldo</TableHead>
                      <TableHead className="text-right text-foreground">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="text-muted-foreground">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.department}</TableCell>
                        <TableCell className="text-muted-foreground">{user.balance} CofCoins</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleEditBalance(user)} className="text-primary hover:text-primary/80">
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
                <CardTitle className="text-foreground">Histórico de Edições de Saldo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative flex-1 max-w-sm mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar no histórico..." className="pl-10 bg-card border-border text-foreground" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground">Data</TableHead>
                      <TableHead className="text-foreground">Admin</TableHead>
                      <TableHead className="text-foreground">Usuário</TableHead>
                      <TableHead className="text-foreground">Saldo Anterior</TableHead>
                      <TableHead className="text-foreground">Novo Saldo</TableHead>
                      <TableHead className="text-foreground">Diferença</TableHead>
                      <TableHead className="text-foreground">Motivo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {balanceEditHistory.map(record => (
                      <TableRow key={record.id}>
                        <TableCell className="text-muted-foreground">{format(record.date, 'dd/MM/yyyy HH:mm')}</TableCell>
                        <TableCell className="text-muted-foreground">{record.admin}</TableCell>
                        <TableCell className="text-muted-foreground">{record.recipient}</TableCell>
                        <TableCell className="text-muted-foreground">{record.previousBalance} CofCoins</TableCell>
                        <TableCell className="text-muted-foreground">{record.newBalance} CofCoins</TableCell>
                        <TableCell>
                          <span className={record.difference > 0 ? 'text-green-600' : record.difference < 0 ? 'text-red-600' : 'text-muted-foreground'}>
                            {record.difference > 0 ? '+' : ''}{record.difference}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground max-w-[200px] truncate">
                          <UITooltip>
                            <TooltipTrigger asChild><span className="cursor-help">{record.reason}</span></TooltipTrigger>
                            <TooltipContent className="bg-popover text-popover-foreground border-border"><p>{record.reason}</p></TooltipContent>
                          </UITooltip>
                        </TableCell>
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
        onApprove={(id) => handleApprove(id)}
        onReject={(id) => handleReject(id)}
      />
      
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title={confirmDialog.action === 'approve' ? "Aprovar Item" : "Rejeitar Item"}
        description={`Tem certeza que deseja ${confirmDialog.action === 'approve' ? 'aprovar' : 'rejeitar'} este item?`}
        onConfirm={handleConfirmAction}
      />
      
      <NewRecognitionDialog
        open={isNewRecognitionOpen}
        onOpenChange={setIsNewRecognitionOpen}
        onSaveNewRecognition={handleSaveNewRecognition}
      />
      
      <EditUserBalanceDialog
        open={isEditBalanceOpen}
        onOpenChange={setIsEditBalanceOpen}
        user={selectedUser}
        onBalanceUpdate={handleBalanceEditComplete}
      />
      
      <RewardConfigModal
        open={isRewardModalOpen}
        onOpenChange={setIsRewardModalOpen}
        onSave={handleSaveReward}
        editingReward={editingReward}
      />
    </div>;
};
export default AdminDashboard;
