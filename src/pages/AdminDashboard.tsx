
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';
import {
  Activity,
  Award,
  CheckCircle,
  ChevronsUpDown,
  Gift,
  Plus,
  Search,
  Star,
  TrendingUp,
  Users,
  BookOpen
} from 'lucide-react';

import RecognitionDetailDialog, { Recognition } from "@/components/RecognitionDetailDialog";
import UserMenu from '@/components/UserMenu';

// Category data with types and colors for charts
const categories = [
  { name: "Colaboração Excepcional", value: 42, color: "#8884d8" },
  { name: "Inovação Constante", value: 28, color: "#82ca9d" },
  { name: "Compromisso com Qualidade", value: 35, color: "#ffc658" },
  { name: "Liderança Inspiradora", value: 20, color: "#ff8042" },
  { name: "Aprendeu por si, falou por todos", value: 15, color: "#0088fe" }
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

// Mock data for user balances
const userBalances = [
  { id: 1, name: "Lucas Mendes", balance: 135, department: "Tecnologia" },
  { id: 2, name: "Amanda Oliveira", balance: 120, department: "Marketing" },
  { id: 3, name: "Pedro Henrique", balance: 95, department: "Produto" },
  { id: 4, name: "Carolina Silva", balance: 85, department: "RH" },
  { id: 5, name: "Rafael Costa", balance: 75, department: "Vendas" },
  { id: 6, name: "Juliana Santos", balance: 65, department: "Financeiro" },
  { id: 7, name: "Bruno Almeida", balance: 60, department: "Atendimento" },
  { id: 8, name: "Mariana Lima", balance: 55, department: "Operações" },
  { id: 9, name: "Fernando Gomes", balance: 50, department: "Tecnologia" },
  { id: 10, name: "Isabela Martins", balance: 45, department: "Marketing" }
];

// Mock data for recognition history
const recognitionHistory = [
  {
    id: 1,
    sender: "Carolina Silva",
    recipient: "Lucas Mendes",
    category: "Colaboração Excepcional",
    amount: 25,
    date: new Date(2023, 9, 15)
  },
  {
    id: 2,
    sender: "Rafael Costa",
    recipient: "Amanda Oliveira",
    category: "Inovação Constante",
    amount: 10,
    date: new Date(2023, 9, 14)
  },
  {
    id: 3,
    sender: "Juliana Santos",
    recipient: "Pedro Henrique",
    category: "Aprendeu por si, falou por todos",
    amount: 15,
    date: new Date(2023, 9, 13)
  },
  {
    id: 4,
    sender: "Bruno Almeida",
    recipient: "Carolina Silva",
    category: "Liderança Inspiradora",
    amount: 20,
    date: new Date(2023, 9, 12)
  },
  {
    id: 5,
    sender: "Mariana Lima",
    recipient: "Rafael Costa",
    category: "Compromisso com Qualidade",
    amount: 15,
    date: new Date(2023, 9, 11)
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

  const handleApprove = (id: number) => {
    toast({
      title: "Reconhecimento aprovado",
      description: `O reconhecimento #${id} foi aprovado com sucesso.`,
    });
    setIsRecognitionDetailOpen(false);
  };

  const handleReject = (id: number) => {
    toast({
      title: "Reconhecimento rejeitado",
      description: `O reconhecimento #${id} foi rejeitado.`,
      variant: "destructive",
    });
    setIsRecognitionDetailOpen(false);
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

  const filteredUsers = userBalances.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHistory = recognitionHistory.filter(record => 
    record.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <div className="flex items-center">
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

        {/* Tabs */}
        <Tabs defaultValue="approvals" className="space-y-8">
          <TabsList className="grid sm:grid-cols-3 md:grid-cols-5 mb-8 w-full bg-white">
            <TabsTrigger value="approvals" className="data-[state=active]:bg-cofcoin-purple data-[state=active]:text-white">
              Aprovações
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-cofcoin-purple data-[state=active]:text-white">
              Recompensas
            </TabsTrigger>
            <TabsTrigger value="ranking" className="data-[state=active]:bg-cofcoin-purple data-[state=active]:text-white">
              Ranking
            </TabsTrigger>
            <TabsTrigger value="balances" className="data-[state=active]:bg-cofcoin-purple data-[state=active]:text-white">
              Saldos
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-cofcoin-purple data-[state=active]:text-white">
              Histórico
            </TabsTrigger>
          </TabsList>

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-cofcoin-purple mr-2" />
                    Aprovações Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{approvalItems.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="h-5 w-5 text-cofcoin-purple mr-2" />
                    Usuários Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{userBalances.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Activity className="h-5 w-5 text-cofcoin-purple mr-2" />
                    Total de CofCoins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{userBalances.reduce((sum, user) => sum + user.balance, 0)}</div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Aprovações Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                {approvalItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Não há reconhecimentos pendentes de aprovação.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Solicitante</TableHead>
                        <TableHead>Destinatário</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Data</TableHead>
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
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedRecognition(item);
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
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <Card>
              <CardHeader>
                <CardTitle>Recompensas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Buscar recompensa..." 
                      className="pl-10"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Recompensa
                  </Button>
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
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Ativa</Badge></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Vale Presente R$50</TableCell>
                      <TableCell>50 CofCoins</TableCell>
                      <TableCell>15 disponíveis</TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Ativa</Badge></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Almoço com CEO</TableCell>
                      <TableCell>200 CofCoins</TableCell>
                      <TableCell>2 disponíveis</TableCell>
                      <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Ativa</Badge></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Curso Online</TableCell>
                      <TableCell>150 CofCoins</TableCell>
                      <TableCell>5 disponíveis</TableCell>
                      <TableCell><Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Esgotando</Badge></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Home Office por 1 semana</TableCell>
                      <TableCell>175 CofCoins</TableCell>
                      <TableCell>0 disponíveis</TableCell>
                      <TableCell><Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Esgotada</Badge></TableCell>
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Remetente</TableHead>
                      <TableHead>Destinatário</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Data</TableHead>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* RecognitionDetail Dialog */}
        <RecognitionDetailDialog 
          recognition={selectedRecognition}
          open={isRecognitionDetailOpen}
          onOpenChange={setIsRecognitionDetailOpen}
          showActions={true}
          onApprove={handleApprove}
          onReject={handleReject}
        />

        {/* Edit Balance Dialog */}
        <Dialog open={isEditBalanceOpen} onOpenChange={setIsEditBalanceOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Saldo</DialogTitle>
              <DialogDescription>
                {selectedUser && `Atualizando o saldo de ${selectedUser.name}`}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="balance">Novo Saldo (CofCoins)</Label>
                <Input
                  id="balance"
                  type="number"
                  value={newBalance}
                  onChange={(e) => setNewBalance(e.target.value)}
                  min="0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsEditBalanceOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark"
                onClick={handleSaveBalance}
              >
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminDashboard;
