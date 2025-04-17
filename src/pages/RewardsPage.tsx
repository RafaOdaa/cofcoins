
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Gift, History, Home, ShoppingBag, Ticket, Zap, Calendar, Coffee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import UserMenu from '@/components/UserMenu';
import AnimatedCoinBalance from '@/components/AnimatedCoinBalance';

// Modified rewards data with reordering
const rewardsData = [
  {
    id: 7,
    title: "Pratão Honesto no Saj",
    description: "Se delicie com a culinária árabe",
    icon: Coffee,
    value: 400
  },
  {
    id: 9,
    title: "1:1 com Augusto",
    description: "Aquela consultoria ao vivo, troque aquela ideia com o big boss",
    icon: Calendar,
    value: 9999
  },
  {
    id: 8,
    title: "1 semana de férias",
    description: "Ninguém é de ferro",
    icon: Calendar,
    value: 2000
  },
  {
    id: 1,
    title: "Vale Café",
    description: "Um café especial na cafeteria parceira",
    icon: Coffee,
    value: 150
  },
  {
    id: 2,
    title: "Day Off",
    description: "Um dia de folga para descansar",
    icon: Zap,
    value: 1000
  },
  {
    id: 3,
    title: "Vale Cinema",
    description: "Ingresso para qualquer filme em cartaz",
    icon: Ticket,
    value: 300
  },
  {
    id: 4,
    title: "Gift Card R$50",
    description: "Cartão presente para gastar como quiser",
    icon: ShoppingBag,
    value: 500
  },
  {
    id: 5,
    title: "Almoço Especial",
    description: "Almoço com a diretoria",
    icon: Coffee,
    value: 700
  },
  {
    id: 6,
    title: "Curso Online",
    description: "Curso de especialização à sua escolha",
    icon: Zap,
    value: 800
  }
];

// Mock user reward requests
const userRewardsRequests = [
  {
    id: 1,
    title: "Vale Café",
    value: 150,
    requestDate: new Date("2025-04-14T09:30:00"),
    status: "pendente" as const,
    description: "Aguardando aprovação do administrador"
  },
  {
    id: 2,
    title: "Vale Cinema",
    value: 300,
    requestDate: new Date("2025-04-10T14:45:00"),
    status: "concluída" as const,
    description: "Seu vale cinema está disponível na recepção"
  },
  {
    id: 3,
    title: "Gift Card R$50",
    value: 500,
    requestDate: new Date("2025-04-05T11:20:00"),
    status: "cancelada" as const,
    description: "Sua solicitação foi rejeitada devido a problemas de estoque"
  }
];

const RewardsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userRewardRequests, setUserRewardRequests] = useState(userRewardsRequests);
  
  // State for confirmation dialog
  const [confirmRedeemDialog, setConfirmRedeemDialog] = useState<{
    open: boolean;
    reward: typeof rewardsData[0] | null;
  }>({ open: false, reward: null });
  
  // State for delete confirmation dialog
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState<{
    open: boolean;
    requestId: number;
  }>({ open: false, requestId: 0 });
  
  const handleDeleteRequest = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmDeleteDialog({
      open: true,
      requestId: id
    });
  };

  const processDeleteRequest = () => {
    setUserRewardRequests(prev => 
      prev.filter(request => request.id !== confirmDeleteDialog.requestId)
    );
    
    toast({
      title: "Solicitação removida",
      description: "Sua solicitação de recompensa foi removida com sucesso."
    });
    
    setConfirmDeleteDialog({ open: false, requestId: 0 });
  };
  
  const handleRedeemReward = (reward: typeof rewardsData[0], e: React.MouseEvent) => {
    e.preventDefault();
    
    if (500 < reward.value) {
      toast({
        title: "Saldo insuficiente",
        description: `Você precisa de mais ${reward.value - 500} CofCoins para esta recompensa.`,
        variant: "destructive"
      });
    } else {
      // Open confirmation dialog
      setConfirmRedeemDialog({
        open: true,
        reward
      });
    }
  };
  
  const processRewardRedeem = () => {
    if (!confirmRedeemDialog.reward) return;
    
    const reward = confirmRedeemDialog.reward;
    
    // Add to user reward requests
    const newRequest = {
      id: userRewardRequests.length > 0 ? Math.max(...userRewardRequests.map(r => r.id)) + 1 : 1,
      title: reward.title,
      value: reward.value,
      requestDate: new Date(),
      status: "pendente" as const,
      description: "Aguardando aprovação do administrador"
    };
    
    setUserRewardRequests([newRequest, ...userRewardRequests]);
    
    toast({
      title: "Solicitação enviada",
      description: `Sua solicitação para ${reward.title} foi enviada com sucesso!`,
    });
    
    setConfirmRedeemDialog({ open: false, reward: null });
  };
  
  const getStatusColor = (status: "pendente" | "concluída" | "cancelada") => {
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
                className="text-gray-600 hover:text-cofcoin-purple transition-colors duration-300"
              >
                <Home className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Home</span>
              </Button>
              
              {/* User Menu */}
              <UserMenu userName="João Silva" isAdmin={false} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Recompensas</h1>
            <p className="text-gray-600">Use seus CofCoins para resgatar prêmios incríveis</p>
          </div>
          <AnimatedCoinBalance balance={500} />
        </div>

        <Tabs defaultValue="rewards" className="w-full mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
            <TabsTrigger value="rewards">Recompensas</TabsTrigger>
            <TabsTrigger value="requests">Minhas Solicitações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rewards" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewardsData.map((reward) => (
                <Card key={reward.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{reward.title}</CardTitle>
                      <div className="h-10 w-10 rounded-full bg-cofcoin-purple/10 flex items-center justify-center">
                        <reward.icon className="h-5 w-5 text-cofcoin-purple" />
                      </div>
                    </div>
                    <CardDescription>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{reward.description}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{reward.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-cofcoin-orange font-medium text-lg">
                      <Coins className="mr-2 h-5 w-5" />
                      <span>{reward.value} CofCoins</span>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t">
                    <Button 
                      onClick={(e) => handleRedeemReward(reward, e)} 
                      className={`w-full ${reward.value > 500 ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed opacity-70' : 'bg-cofcoin-purple hover:bg-cofcoin-purple-dark'} text-white transition duration-300 ease-in-out`}
                      disabled={reward.value > 500}
                    >
                      {reward.value > 500 ? (
                        <>
                          <span className="mr-1">Precisa de mais</span>
                          <span>{reward.value - 500}</span>
                          <Coins className="ml-1 h-4 w-4" />
                        </>
                      ) : (
                        "Resgatar"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Solicitações de Recompensa</CardTitle>
                <CardDescription>Histórico e status das suas solicitações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Recompensa</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userRewardRequests.length > 0 ? (
                        userRewardRequests.map((request) => (
                          <TableRow key={request.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span>{request.title}</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{request.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell className="text-cofcoin-orange">
                              <div className="flex items-center">
                                <Coins className="mr-1 h-4 w-4" />
                                {request.value}
                              </div>
                            </TableCell>
                            <TableCell>{format(request.requestDate, 'dd/MM/yyyy')}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(request.status)}>
                                {request.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {request.status === "pendente" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => handleDeleteRequest(request.id, e)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  Cancelar
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                            Você ainda não solicitou nenhuma recompensa.
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

      {/* Confirmation dialog for redeeming rewards */}
      <ConfirmationDialog
        open={confirmRedeemDialog.open}
        onOpenChange={(open) => setConfirmRedeemDialog({ ...confirmRedeemDialog, open })}
        onConfirm={processRewardRedeem}
        title="Confirmar Resgate"
        description={`Tem certeza que deseja resgatar "${confirmRedeemDialog.reward?.title}" por ${confirmRedeemDialog.reward?.value} CofCoins?`}
        confirmText="Confirmar Resgate"
      />
      
      {/* Confirmation dialog for deleting requests */}
      <ConfirmationDialog
        open={confirmDeleteDialog.open}
        onOpenChange={(open) => setConfirmDeleteDialog({ ...confirmDeleteDialog, open })}
        onConfirm={processDeleteRequest}
        title="Cancelar Solicitação"
        description="Tem certeza que deseja cancelar esta solicitação de recompensa?"
        confirmText="Cancelar Solicitação"
        variant="destructive"
      />
    </div>
  );
};

export default RewardsPage;
