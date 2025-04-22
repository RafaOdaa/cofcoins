import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Coins, Gift, LogOut, Send, Settings, User, Users, Shield, Eye, Lightbulb, Sparkles, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import NewRecognitionDialog from '@/components/NewRecognitionDialog';
import AnimatedCoinBalance from '@/components/AnimatedCoinBalance';
import { format } from 'date-fns';
import UserMenu from '@/components/UserMenu';
import RecognitionDetailDialog from '@/components/RecognitionDetailDialog';

// Mock data for demonstration with added dates
const myRecognitions = [
  { 
    id: 1, 
    reporter: "Ana Silva", 
    amount: 100, 
    category: "Fora da Caixa", 
    description: "Implementação de nova solução de automação",
    date: new Date('2025-04-15T10:30:00')
  },
  { 
    id: 2, 
    reporter: "Carlos Mendes", 
    amount: 50, 
    category: "O Quebra Galho", 
    description: "Auxílio na resolução de problemas técnicos",
    date: new Date('2025-04-14T14:45:00')
  },
  { 
    id: 3, 
    reporter: "Maria Oliveira", 
    amount: 100, 
    category: "Segurador de Rojão", 
    description: "Gestão de crise no projeto XYZ",
    date: new Date('2025-04-12T09:15:00')
  },
];

const sentRecognitions = [
  { 
    id: 1, 
    recipient: "Pedro Santos", 
    amount: 50, 
    category: "O Vidente", 
    description: "Antecipação de problema no servidor",
    date: new Date('2025-04-10T16:20:00')
  },
  { 
    id: 2, 
    recipient: "Juliana Costa", 
    amount: 100, 
    category: "Mestre do Improviso", 
    description: "Apresentação excelente sem preparação",
    date: new Date('2025-04-08T11:05:00')
  },
];

// Updated category definitions with the correct icon type
const categories = [
  { 
    id: 1, 
    name: "Fora da Caixa", 
    description: "Pra quem sempre surpreende com soluções e ideias que ninguém tinha pensado, mudando o jogo e dando aquele toque criativo que faz toda a diferença.",
    icon: Lightbulb
  },
  { 
    id: 2, 
    name: "O Quebra Galho", 
    description: "Praquele parceiro que aparece rapidinho e resolve o problema sem enrolação. Quando você precisa, ele tá lá para fazer tudo se ajeitar.",
    icon: Send
  },
  { 
    id: 3, 
    name: "Aqui é MedCof!", 
    description: "Pra quem age como se a empresa fosse sua casa: cuida, propõe melhorias e não deixa nada no 'deixa pra depois'. É aquele sentimento de 'se eu não fizer, ninguém faz'.",
    icon: User
  },
  { 
    id: 4, 
    name: "Mestre do Improviso", 
    description: "Pra aquele que, mesmo sem planejar, sempre acha um jeito de resolver a situação e sair da enrascada.",
    icon: Gift
  },
  { 
    id: 5, 
    name: "Segurador de Rojão", 
    description: "Para aquele(a) colega que chega na hora certa para domar situações explosivas e manter a paz com muita habilidade e leveza.",
    icon: Shield
  },
  { 
    id: 6, 
    name: "O Vidente", 
    description: "Praquele que, com uma visão quase sobrenatural, identifica e resolve perrengues antes mesmo de acontecerem.",
    icon: Eye
  },
  {
    id: 7,
    name: "Aprendeu por si, falou por todos",
    description: "Leu, refletiu, conectou com a realidade e compartilhou algo que virou aprendizado coletivo.",
    icon: BookOpen
  }
];

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecognition, setSelectedRecognition] = useState<typeof myRecognitions[0] | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  // Calculate total received coins and count
  const totalReceivedCoins = myRecognitions.reduce((sum, item) => sum + item.amount, 0);
  const totalReceivedCount = myRecognitions.length;

  // Calculate total sent coins and count
  const totalSentCoins = sentRecognitions.reduce((sum, item) => sum + item.amount, 0);
  const totalSentCount = sentRecognitions.length;

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você saiu da plataforma com sucesso.",
    });
    navigate('/');
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
              <span className="text-xl font-bold text-gray-900">CofCoins</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/rewards')}
                className="text-gray-600 hover:text-cofcoin-purple"
              >
                <Gift className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Recompensas</span>
              </Button>
              
              {/* Admin links would be conditionally shown based on user role */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-600 hover:text-cofcoin-purple"
              >
                <Settings className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
              
              <UserMenu userName="João Silva" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Painel do Colaborador</h1>
            <p className="text-gray-600">Gerencie seus reconhecimentos e recompensas</p>
          </div>
          
          {/* Updated coin balance display */}
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
                <CardDescription className="flex justify-between items-center">
                  <span>Reconhecimentos recebidos dos colegas</span>
                  <div className="flex items-center gap-4">
                    <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                      <span className="font-semibold">{totalReceivedCount}</span> reconhecimento(s)
                    </div>
                    <div className="text-sm bg-cofcoin-orange/20 text-cofcoin-orange px-3 py-1 rounded-full flex items-center">
                      <Coins className="h-4 w-4 mr-1" />
                      <span className="font-semibold">{totalReceivedCoins}</span> CofCoins
                    </div>
                  </div>
                </CardDescription>
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
                        <TableHead>Data/Hora</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myRecognitions.map((recognition) => (
                        <TableRow 
                          key={recognition.id} 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => {
                            setSelectedRecognition(recognition);
                            setDetailDialogOpen(true);
                          }}
                        >
                          <TableCell className="font-medium">{recognition.reporter}</TableCell>
                          <TableCell className="text-cofcoin-orange font-medium">{recognition.amount}</TableCell>
                          <TableCell className="hidden md:table-cell">{recognition.category}</TableCell>
                          <TableCell className="hidden lg:table-cell">{recognition.description}</TableCell>
                          <TableCell>{format(recognition.date, 'dd/MM/yyyy HH:mm')}</TableCell>
                        </TableRow>
                      ))}
                      {myRecognitions.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-gray-500">
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
                <CardDescription className="flex justify-between items-center">
                  <span>Reconhecimentos que você enviou para seus colegas</span>
                  <div className="flex items-center gap-4">
                    <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                      <span className="font-semibold">{totalSentCount}</span> reconhecimento(s)
                    </div>
                    <div className="text-sm bg-cofcoin-orange/20 text-cofcoin-orange px-3 py-1 rounded-full flex items-center">
                      <Coins className="h-4 w-4 mr-1" />
                      <span className="font-semibold">{totalSentCoins}</span> CofCoins
                    </div>
                  </div>
                </CardDescription>
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
                        <TableHead>Data/Hora</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sentRecognitions.map((recognition) => (
                        <TableRow 
                          key={recognition.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => {
                            // Convert to the format expected by the dialog
                            const dialogRecognition = {
                              id: recognition.id,
                              reporter: "Você",
                              recipient: recognition.recipient,
                              amount: recognition.amount,
                              category: recognition.category,
                              description: recognition.description,
                              date: recognition.date
                            };
                            setSelectedRecognition(dialogRecognition);
                            setDetailDialogOpen(true);
                          }}
                        >
                          <TableCell className="font-medium">{recognition.recipient}</TableCell>
                          <TableCell className="text-cofcoin-orange font-medium">{recognition.amount}</TableCell>
                          <TableCell className="hidden md:table-cell">{recognition.category}</TableCell>
                          <TableCell className="hidden lg:table-cell">{recognition.description}</TableCell>
                          <TableCell>{format(recognition.date, 'dd/MM/yyyy HH:mm')}</TableCell>
                        </TableRow>
                      ))}
                      {sentRecognitions.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-gray-500">
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
      
      {/* Recognition Detail Dialog */}
      <RecognitionDetailDialog 
        recognition={selectedRecognition}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />
    </div>
  );
};

export default Home;
