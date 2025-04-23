
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
  Gift,
  Home,
  Plus,
  Search,
  Star,
  TrendingUp,
  Users,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import RecognitionDetailDialog, { Recognition } from "@/components/RecognitionDetailDialog";
import UserMenu from '@/components/UserMenu';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import NewRecognitionDialog from '@/components/NewRecognitionDialog';
import EditUserBalanceDialog from '@/components/EditUserBalanceDialog';

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
  { name: "Jan", sent: 65, received: 70 },
  { name: "Fev", sent: 75, received: 80 },
  { name: "Mar", sent: 85, received: 90 },
  { name: "Abr", sent: 70, received: 75 },
  { name: "Mai", sent: 80, received: 85 },
  { name: "Jun", sent: 90, received: 95 },
  { name: "Jul", sent: 75, received: 80 },
  { name: "Ago", sent: 85, received: 90 },
  { name: "Set", sent: 95, received: 100 },
  { name: "Out", sent: 85, received: 90 },
  { name: "Nov", sent: 0, received: 0 },
  { name: "Dez", sent: 0, received: 0 },
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

  const handleBalanceEditComplete = (userId: number, previousBalance: number, newBalance: number, reason: string) => {
    // Implement your logic here to update the user's balance
    console.log(`User ${userId} balance updated from ${previousBalance} to ${newBalance} due to: ${reason}`);
    // You might want to call an API to update the balance in your database
    toast({
      title: "Saldo atualizado",
      description: `O saldo do usuário foi atualizado com sucesso.`,
    });
  };

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
            <TabsTrigger value="ranking" className="px-3">
              Ranking
            </TabsTrigger>
            <TabsTrigger value="balances" className="px-3">
              Saldos
            </TabsTrigger>
            <TabsTrigger value="history" className="px-3">
              Histórico
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

          {/* Ranking Tab */}
          <TabsContent value="ranking">
            <Tabs defaultValue="charts" className="space-y-4">
              <TabsList>
                <TabsTrigger value="charts">Gráficos</TabsTrigger>
                <TabsTrigger value="list">Lista Completa</TabsTrigger>
              </TabsList>

              <TabsContent value="charts">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-cofcoin-purple mr-2" /> 
                        Maiores Envios
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topSenders} layout="vertical">
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="name" width={120} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8884d8" name="CofCoins enviados" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 text-cofcoin-purple mr-2" /> 
                        Maiores Receptores
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topRecipients} layout="vertical">
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="name" width={120} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#82ca9d" name="CofCoins recebidos" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Activity className="h-5 w-5 text-cofcoin-purple mr-2" /> 
                        Atividade Mensal
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyActivity}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="sent" fill="#8884d8" name="CofCoins enviados" />
                          <Bar dataKey="received" fill="#82ca9d" name="CofCoins recebidos" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Gift className="h-5 w-5 text-cofcoin-purple mr-2" /> 
                        Distribuição por Categoria
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={categories}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            nameKey="name"
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                            {categories.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="list">
                <Card>
                  <CardHeader>
                    <CardTitle>Ranking Completo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Posição</TableHead>
                          <TableHead>Usuário</TableHead>
                          <TableHead>Departamento</TableHead>
                          <TableHead>Total Enviado</TableHead>
                          <TableHead>Total Recebido</TableHead>
                          <TableHead>Saldo</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userBalances.sort((a, b) => b.balance - a.balance).map((user, index) => (
                          <TableRow key={user.id}>
                            <TableCell>{index + 1}º</TableCell>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>{Math.floor(Math.random() * 500)} CofCoins</TableCell>
                            <TableCell>{Math.floor(Math.random() * 500)} CofCoins</TableCell>
                            <TableCell className="font-bold">{user.balance} CofCoins</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Balances Tab */}
          <TabsContent value="balances">
            <Card>
              <CardHeader>
                <CardTitle>Saldo de Usuários</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Buscar por nome ou departamento..." 
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
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>{user.balance} CofCoins</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditBalance(user)}
                          >
                            Editar Saldo
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Reconhecimentos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Buscar no histórico..." 
                    className="pl-10"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Remetente</TableHead>
                      <TableHead>Destinatário</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.sender}</TableCell>
                        <TableCell>{record.recipient}</TableCell>
                        <TableCell>{record.category}</TableCell>
                        <TableCell>{record.amount} CofCoins</TableCell>
                        <TableCell>{format(record.date, 'dd/MM/yyyy')}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(record.status)}>
                            {record.status === "aprovado" ? "Aprovado" : 
                             record.status === "reprovado" ? "Reprovado" : "Pendente"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedRecognition({
                                id: record.id,
                                reporter: record.sender,
                                recipient: record.recipient,
                                amount: record.amount,
                                category: record.category,
                                description: "",  // No description in history records
                                date: record.date,
                                status: record.status
                              });
                              setIsRecognitionDetailOpen(true);
                            }}
                          >
                            Detalhes
                          </Button>
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
      <NewRecognitionDialog
        open={isNewRecognitionOpen}
        onOpenChange={setIsNewRecognitionOpen}
        isAdmin={true}
      />

      <EditUserBalanceDialog
        open={isEditBalanceOpen}
        onOpenChange={setIsEditBalanceOpen}
        user={selectedUser}
        onComplete={handleBalanceEditComplete}
      />

      <RecognitionDetailDialog
        recognition={selectedRecognition}
        open={isRecognitionDetailOpen}
        onOpenChange={setIsRecognitionDetailOpen}
      />

      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        onConfirm={handleConfirmAction}
        title={confirmDialog.action === 'approve' ? "Aprovar Reconhecimento" : "Rejeitar Reconhecimento"}
        description={confirmDialog.action === 'approve' ? 
          "Tem certeza que deseja aprovar este reconhecimento?" : 
          "Tem certeza que deseja rejeitar este reconhecimento?"}
        confirmText={confirmDialog.action === 'approve' ? "Aprovar" : "Rejeitar"}
        variant={confirmDialog.action === 'approve' ? 'default' : 'destructive'}
      />
    </div>
  );
};

export default AdminDashboard;
