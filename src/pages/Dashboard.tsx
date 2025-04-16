
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Coins, Gift, Send, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import NewRecognitionDialog from '@/components/NewRecognitionDialog';
import UserMenu from '@/components/UserMenu';
import RecognitionDetailDialog from '@/components/RecognitionDetailDialog';
import AnimatedCoinBalance from '@/components/AnimatedCoinBalance';

// Mock data for demonstration
const myRecognitions = [
  { 
    id: 1, 
    reporter: "Ana Silva", 
    amount: 100, 
    category: "Fora da Caixa", 
    description: "Implementação de nova solução de automação",
    status: "concluída" as const,
    date: new Date("2025-04-10T14:30:00"),
    icon: <Award className="h-4 w-4 text-blue-600" /> 
  },
  { 
    id: 2, 
    reporter: "Carlos Mendes", 
    amount: 50, 
    category: "O Quebra Galho", 
    description: "Auxílio na resolução de problemas técnicos",
    status: "concluída" as const,
    date: new Date("2025-04-08T09:15:00"),
    icon: <Award className="h-4 w-4 text-green-600" /> 
  },
  { 
    id: 3, 
    reporter: "Maria Oliveira", 
    amount: 100, 
    category: "Segurador de Rojão", 
    description: "Gestão de crise no projeto XYZ",
    status: "concluída" as const,
    date: new Date("2025-04-05T16:45:00"),
    icon: <Award className="h-4 w-4 text-purple-600" /> 
  },
];

const sentRecognitions = [
  { 
    id: 1, 
    recipient: "Pedro Santos", 
    amount: 50, 
    category: "O Vidente", 
    description: "Antecipação de problema no servidor",
    status: "pendente" as const,
    date: new Date("2025-04-15T10:30:00"),
    icon: <Award className="h-4 w-4 text-indigo-600" /> 
  },
  { 
    id: 2, 
    recipient: "Juliana Costa", 
    amount: 100, 
    category: "Mestre do Improviso", 
    description: "Apresentação excelente sem preparação",
    status: "concluída" as const,
    date: new Date("2025-04-12T13:20:00"),
    icon: <Award className="h-4 w-4 text-amber-600" /> 
  },
];

const categories = [
  { id: 1, name: "Fora da Caixa", description: "Ideias inovadoras que mudam o jogo" },
  { id: 2, name: "O Quebra Galho", description: "Resolve tudo com agilidade" },
  { id: 3, name: "Aqui é MedCof!", description: "Age com sentimento de dono" },
  { id: 4, name: "Mestre do Improviso", description: "Brilha sem planejamento" },
  { id: 5, name: "Segurador de Rojão", description: "Traz calma e resolve crises" },
  { id: 6, name: "O Vidente", description: "Antecipação de problemas" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecognition, setSelectedRecognition] = useState<null | any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleRowClick = (recognition: any, isSent: boolean) => {
    const formattedRecognition = isSent 
      ? { ...recognition, reporter: "Você", recipient: recognition.recipient } 
      : { ...recognition, reporter: recognition.reporter, recipient: "Você" };
      
    setSelectedRecognition(formattedRecognition);
    setIsDetailModalOpen(true);
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
                className="text-gray-600 hover:text-cofcoin-purple mr-2"
              >
                <Gift className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Recompensas</span>
              </Button>
              
              {/* Added user menu component */}
              <UserMenu userName="João Silva" isAdmin={true} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Painel do Colaborador</h1>
            <p className="text-gray-600">Gerencie seus reconhecimentos e recompensas</p>
          </div>
          
          {/* Updated with AnimatedCoinBalance component */}
          <AnimatedCoinBalance balance={500} />
        </div>

        {/* New Recognition Button - Always visible */}
        <div className="mb-6">
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
          >
            <Send className="mr-2 h-5 w-5" />
            Novo Reconhecimento
          </Button>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="received" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
            <TabsTrigger value="received">Meus Reconhecimentos</TabsTrigger>
            <TabsTrigger value="sent">Reconhecimentos Enviados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="received">
            <Card>
              <CardHeader>
                <CardTitle>Meus Reconhecimentos</CardTitle>
                <CardDescription>Reconhecimentos recebidos dos colegas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Relator</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead className="hidden md:table-cell">Categoria</TableHead>
                        <TableHead className="hidden lg:table-cell">Descrição</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myRecognitions.map((recognition) => (
                        <TableRow 
                          key={recognition.id} 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleRowClick(recognition, false)}
                        >
                          <TableCell className="font-medium">{recognition.reporter}</TableCell>
                          <TableCell className="text-cofcoin-orange font-medium">{recognition.amount}</TableCell>
                          <TableCell className="hidden md:table-cell">{recognition.category}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {recognition.description.length > 40
                              ? `${recognition.description.substring(0, 40)}...`
                              : recognition.description}
                          </TableCell>
                        </TableRow>
                      ))}
                      {myRecognitions.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                            Você ainda não recebeu reconhecimentos.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sent">
            <Card>
              <CardHeader>
                <CardTitle>Reconhecimentos Enviados</CardTitle>
                <CardDescription>Reconhecimentos que você enviou para seus colegas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Destinatário</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead className="hidden md:table-cell">Categoria</TableHead>
                        <TableHead className="hidden lg:table-cell">Descrição</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sentRecognitions.map((recognition) => (
                        <TableRow 
                          key={recognition.id} 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleRowClick(recognition, true)}
                        >
                          <TableCell className="font-medium">{recognition.recipient}</TableCell>
                          <TableCell className="text-cofcoin-orange font-medium">{recognition.amount}</TableCell>
                          <TableCell className="hidden md:table-cell">{recognition.category}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {recognition.description.length > 40
                              ? `${recognition.description.substring(0, 40)}...`
                              : recognition.description}
                          </TableCell>
                        </TableRow>
                      ))}
                      {sentRecognitions.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                            Você ainda não enviou reconhecimentos.
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

      {/* New Recognition Dialog */}
      <NewRecognitionDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        categories={categories}
      />

      {/* Recognition Details Dialog */}
      <RecognitionDetailDialog
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        recognition={selectedRecognition}
      />
    </div>
  );
};

export default Dashboard;
