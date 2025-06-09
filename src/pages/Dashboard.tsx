import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';
import { Activity, Award, BookOpen, CheckCircle, Gift, Home, Star, Users, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RecognitionDetailDialog, { Recognition } from "@/components/RecognitionDetailDialog";
import UserMenu from '@/components/UserMenu';
import AnimatedCoinBalance from '@/components/AnimatedCoinBalance';

const sentRecognitions = [
  {
    id: 1,
    recipient: "Ana Silva",
    amount: 25,
    category: "Colaboração Excepcional",
    description: "Ana demonstrou excelente trabalho em equipe durante o projeto de migração do sistema.",
    date: new Date(2023, 9, 15),
    status: "aprovado"
  },
  {
    id: 2,
    recipient: "Pedro Santos",
    amount: 10,
    category: "Inovação Constante",
    description: "Pedro sugeriu uma otimização que melhorou significativamente a performance da aplicação.",
    date: new Date(2023, 9, 14),
    status: "pendente"
  },
  {
    id: 3,
    recipient: "Carla Oliveira",
    amount: 15,
    category: "Aprendeu por si, falou por todos",
    description: "Carla compartilhou conhecimentos valiosos sobre as novas ferramentas de desenvolvimento.",
    date: new Date(2023, 9, 13),
    status: "rejeitado"
  },
  {
    id: 4,
    recipient: "Roberto Lima",
    amount: 20,
    category: "Liderança Inspiradora",
    description: "Roberto mostrou grande liderança ao conduzir a equipe durante a crise do servidor.",
    date: new Date(2023, 9, 12),
    status: "aprovado"
  }
];

const receivedRecognitions = [
  {
    id: 5,
    sender: "Maria Costa",
    amount: 30,
    category: "Fora da Caixa",
    description: "Solução criativa para o problema de integração com o sistema legado.",
    date: new Date(2023, 9, 10),
    status: "aprovado"
  },
  {
    id: 6,
    sender: "João Ferreira",
    amount: 15,
    category: "O Quebra Galho",
    description: "Sempre disponível para ajudar colegas com dúvidas técnicas.",
    date: new Date(2023, 9, 8),
    status: "aprovado"
  },
  {
    id: 7,
    sender: "Lucas Almeida",
    amount: 25,
    category: "Aqui é MedCof!",
    description: "Demonstrou os valores da empresa ao atender um cliente insatisfeito.",
    date: new Date(2023, 9, 5),
    status: "aprovado"
  }
];

const userBalance = 180;

const monthlyActivity = [
  { name: "Jan", enviados: 8, recebidos: 12 },
  { name: "Fev", enviados: 12, recebidos: 15 },
  { name: "Mar", enviados: 10, recebidos: 18 },
  { name: "Abr", enviados: 15, recebidos: 22 },
  { name: "Mai", enviados: 18, recebidos: 25 },
  { name: "Jun", enviados: 14, recebidos: 20 },
  { name: "Jul", enviados: 16, recebidos: 23 },
  { name: "Ago", enviados: 20, recebidos: 28 },
  { name: "Set", enviados: 22, recebidos: 30 },
  { name: "Out", enviados: 18, recebidos: 25 }
];

const categoryData = [
  { name: "Fora da Caixa", value: 8, color: "#3B82F6" },
  { name: "O Quebra Galho", value: 12, color: "#10B981" },
  { name: "Aqui é MedCof!", value: 6, color: "#EF4444" },
  { name: "Mestre do Improviso", value: 4, color: "#F59E0B" },
  { name: "Segurador de Rojão", value: 7, color: "#8B5CF6" },
  { name: "O Vidente", value: 3, color: "#06B6D4" }
];

const recentRewards = [
  {
    id: 1,
    title: "Vale Café",
    description: "Desconto na cafeteria",
    cost: 50,
    claimed: new Date(2023, 9, 10)
  },
  {
    id: 2,
    title: "Day Off",
    description: "Dia de folga extra",
    cost: 200,
    claimed: new Date(2023, 8, 25)
  }
];

const Dashboard = () => {
  const [selectedRecognition, setSelectedRecognition] = useState<Recognition | null>(null);
  const [isRecognitionDetailOpen, setIsRecognitionDetailOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = (recognition: any, isSent: boolean = false) => {
    const formattedRecognition: Recognition = {
      id: recognition.id,
      reporter: isSent ? "Você" : recognition.sender,
      recipient: isSent ? recognition.recipient : "Você",
      amount: recognition.amount,
      category: recognition.category,
      description: recognition.description,
      date: recognition.date,
      status: recognition.status
    };
    setSelectedRecognition(formattedRecognition);
    setIsRecognitionDetailOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "aprovado":
        return "bg-green-100 text-green-800 border-green-200";
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejeitado":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "aprovado":
        return "Aprovado";
      case "pendente":
        return "Pendente";
      case "rejeitado":
        return "Rejeitado";
      default:
        return status;
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
              <h1 className="ml-3 text-xl font-semibold text-gray-900">CofCoin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <AnimatedCoinBalance balance={userBalance} />
              <Button variant="ghost" size="sm" onClick={() => navigate('/home')} className="text-gray-600 hover:text-cofcoin-purple">
                <Home className="h-5 w-5 mr-1" />
                <span>Home</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/rewards')} className="text-gray-600 hover:text-cofcoin-purple">
                <Gift className="h-5 w-5 mr-1" />
                <span>Recompensas</span>
              </Button>
              <UserMenu userName="Lucas Mendes" />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Meu Dashboard</h2>
          <p className="text-gray-600">Acompanhe seus reconhecimentos e estatísticas.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Award className="h-5 w-5 text-cofcoin-purple mr-2" />
                CofCoins Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cofcoin-purple">{userBalance}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                Reconhecimentos Enviados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{sentRecognitions.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Star className="h-5 w-5 text-yellow-600 mr-2" />
                Reconhecimentos Recebidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{receivedRecognitions.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Gift className="h-5 w-5 text-cofcoin-orange mr-2" />
                Recompensas Resgatadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cofcoin-orange">{recentRewards.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="sent" className="space-y-8">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-white p-1">
            <TabsTrigger value="sent" className="px-3">
              Reconhecimentos Enviados
            </TabsTrigger>
            <TabsTrigger value="received" className="px-3">
              Reconhecimentos Recebidos
            </TabsTrigger>
            <TabsTrigger value="analytics" className="px-3">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="rewards" className="px-3">
              Minhas Recompensas
            </TabsTrigger>
          </TabsList>

          {/* Sent Recognitions Tab */}
          <TabsContent value="sent">
            <Card>
              <CardHeader>
                <CardTitle>Reconhecimentos Enviados</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Destinatário</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sentRecognitions.map((recognition) => (
                      <TableRow key={recognition.id}>
                        <TableCell>{recognition.recipient}</TableCell>
                        <TableCell>{recognition.category}</TableCell>
                        <TableCell>{recognition.amount} CofCoins</TableCell>
                        <TableCell>{format(recognition.date, 'dd/MM/yyyy')}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(recognition.status)}>
                            {getStatusText(recognition.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewDetails(recognition, true)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Received Recognitions Tab */}
          <TabsContent value="received">
            <Card>
              <CardHeader>
                <CardTitle>Reconhecimentos Recebidos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Remetente</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {receivedRecognitions.map((recognition) => (
                      <TableRow key={recognition.id}>
                        <TableCell>{recognition.sender}</TableCell>
                        <TableCell>{recognition.category}</TableCell>
                        <TableCell>{recognition.amount} CofCoins</TableCell>
                        <TableCell>{format(recognition.date, 'dd/MM/yyyy')}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewDetails(recognition, false)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
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
                        <Bar dataKey="enviados" name="Enviados" fill="#8884d8" />
                        <Bar dataKey="recebidos" name="Recebidos" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={categoryData} 
                          cx="50%" 
                          cy="50%" 
                          labelLine={false} 
                          outerRadius={80} 
                          fill="#8884d8" 
                          dataKey="value" 
                          nameKey="name" 
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Recompensas Resgatadas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Recompensa</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Custo</TableHead>
                      <TableHead>Data do Resgate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRewards.map((reward) => (
                      <TableRow key={reward.id}>
                        <TableCell>{reward.title}</TableCell>
                        <TableCell>{reward.description}</TableCell>
                        <TableCell>{reward.cost} CofCoins</TableCell>
                        <TableCell>{format(reward.claimed, 'dd/MM/yyyy')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialog */}
      <RecognitionDetailDialog 
        open={isRecognitionDetailOpen}
        onOpenChange={setIsRecognitionDetailOpen}
        recognition={selectedRecognition}
      />
    </div>
  );
};

export default Dashboard;
