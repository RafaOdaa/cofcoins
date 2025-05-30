
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Activity, Award, BookOpen, CheckCircle, Gift, Plus, Star, TrendingUp, Users } from 'lucide-react';
import UserMenu from '@/components/UserMenu';
import NewRecognitionDialog from "@/components/NewRecognitionDialog";

// Mock data for recognition categories
const recognitionData = [
  { name: "Fora da Caixa", value: 25, count: 8, cofcoins: 800, color: "#3B82F6" },
  { name: "O Quebra Galho", value: 30, count: 12, cofcoins: 600, color: "#10B981" },
  { name: "Aqui é MedCof!", value: 20, count: 6, cofcoins: 1000, color: "#EF4444" },
  { name: "Mestre do Improviso", value: 15, count: 5, cofcoins: 750, color: "#F59E0B" },
  { name: "Segurador de Rojão", value: 18, count: 9, cofcoins: 540, color: "#8B5CF6" },
  { name: "O Vidente", value: 12, count: 4, cofcoins: 600, color: "#06B6D4" }
];

// Mock data for team/squad distribution
const teamData = [
  { name: "PR Mafia", recognitions: 15, cofcoins: 1200, color: "#3B82F6" },
  { name: "Tip Squad", recognitions: 12, cofcoins: 950, color: "#10B981" },
  { name: "Dev Warriors", recognitions: 18, cofcoins: 1450, color: "#EF4444" },
  { name: "Design Ninjas", recognitions: 8, cofcoins: 640, color: "#F59E0B" },
  { name: "QA Heroes", recognitions: 11, cofcoins: 880, color: "#8B5CF6" },
  { name: "Product Gurus", recognitions: 6, cofcoins: 480, color: "#06B6D4" }
];

// Monthly data for trending chart
const monthlyData = [
  { month: 'Jan', reconhecimentos: 45, cofcoins: 2250 },
  { month: 'Fev', reconhecimentos: 52, cofcoins: 2600 },
  { month: 'Mar', reconhecimentos: 48, cofcoins: 2400 },
  { month: 'Abr', reconhecimentos: 61, cofcoins: 3050 },
  { month: 'Mai', reconhecimentos: 58, cofcoins: 2900 },
  { month: 'Jun', reconhecimentos: 67, cofcoins: 3350 }
];

// Recognition categories with icons
const categories = [
  { 
    id: 1, 
    name: "Fora da Caixa", 
    description: "Pra quem sempre surpreende com soluções e ideias que ninguém tinha pensado.",
    icon: Award
  },
  { 
    id: 2, 
    name: "O Quebra Galho", 
    description: "Praquele parceiro que aparece rapidinho e resolve o problema sem enrolação.",
    icon: Star
  },
  { 
    id: 3, 
    name: "Aqui é MedCof!", 
    description: "Pra quem age como se a empresa fosse sua casa.",
    icon: CheckCircle
  },
  { 
    id: 4, 
    name: "Mestre do Improviso", 
    description: "Pra aquele que, mesmo sem planejar, sempre acha um jeito de resolver.",
    icon: Users
  },
  { 
    id: 5, 
    name: "Segurador de Rojão", 
    description: "Para aquele(a) colega que chega na hora certa para domar situações explosivas.",
    icon: BookOpen
  },
  { 
    id: 6, 
    name: "O Vidente", 
    description: "Praquele que identifica e resolve perrengues antes mesmo de acontecerem.",
    icon: Activity
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isNewRecognitionOpen, setIsNewRecognitionOpen] = useState(false);

  // Calculate totals for categories
  const totalCategoryRecognitions = recognitionData.reduce((sum, item) => sum + item.count, 0);
  const totalCategoryCofcoins = recognitionData.reduce((sum, item) => sum + item.cofcoins, 0);

  // Calculate totals for teams
  const totalTeamRecognitions = teamData.reduce((sum, item) => sum + item.recognitions, 0);
  const totalTeamCofcoins = teamData.reduce((sum, item) => sum + item.cofcoins, 0);

  const CustomTooltipCategories = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-gray-600">
            Reconhecimentos: {data.count} ({((data.count / totalCategoryRecognitions) * 100).toFixed(1)}%)
          </p>
          <p className="text-sm text-gray-600">
            CofCoins: {data.cofcoins} ({((data.cofcoins / totalCategoryCofcoins) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomTooltipTeams = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-gray-600">
            Reconhecimentos: {data.recognitions} ({((data.recognitions / totalTeamRecognitions) * 100).toFixed(1)}%)
          </p>
          <p className="text-sm text-gray-600">
            CofCoins: {data.cofcoins} ({((data.cofcoins / totalTeamCofcoins) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
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
              <h1 className="ml-3 text-xl font-semibold text-gray-900">CofCoin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/rewards')}
                className="text-gray-600 hover:text-cofcoin-purple"
              >
                <Gift className="h-5 w-5 mr-1" />
                <span>Recompensas</span>
              </Button>
              <UserMenu userName="Admin User" isAdmin={true} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <Button 
            onClick={() => setIsNewRecognitionOpen(true)}
            className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
          >
            <Plus className="mr-2 h-5 w-5" />
            Novo Reconhecimento
          </Button>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Category Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição entre Categorias</CardTitle>
              <CardDescription>
                Reconhecimentos por categoria de comportamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={recognitionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="count"
                    >
                      {recognitionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltipCategories />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Team Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição entre Equipes</CardTitle>
              <CardDescription>
                Reconhecimentos por equipe/squad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={teamData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="recognitions"
                    >
                      {teamData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltipTeams />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Tendências Mensais
            </CardTitle>
            <CardDescription>
              Evolução dos reconhecimentos e CofCoins ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="reconhecimentos" fill="#3B82F6" name="Reconhecimentos" />
                  <Bar yAxisId="right" dataKey="cofcoins" fill="#F59E0B" name="CofCoins" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Reconhecimentos</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCategoryRecognitions + totalTeamRecognitions}</div>
              <p className="text-xs text-muted-foreground">
                +12% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CofCoins Distribuídos</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCategoryCofcoins + totalTeamCofcoins}</div>
              <p className="text-xs text-muted-foreground">
                +8% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Colaboradores Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">
                +4 novos colaboradores este mês
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* New Recognition Dialog */}
      <NewRecognitionDialog 
        open={isNewRecognitionOpen} 
        onOpenChange={setIsNewRecognitionOpen} 
        categories={categories}
      />
    </div>
  );
};

export default Dashboard;
