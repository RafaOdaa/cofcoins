
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Coffee, Coins, Gift, Home, ShoppingBag, Ticket, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock rewards data
const rewardsData = [
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

const RewardsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleRedeemReward = (reward: typeof rewardsData[0]) => {
    if (500 < reward.value) {
      toast({
        title: "Saldo insuficiente",
        description: `Você precisa de mais ${reward.value - 500} CofCoins para esta recompensa.`,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Solicitação enviada",
        description: `Sua solicitação para ${reward.title} foi enviada com sucesso!`,
      });
      // In a real app, we would send this to the backend and update the user's balance
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
              <span className="text-xl font-bold text-gray-900">CofCoinf</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-cofcoin-purple"
              >
                <Home className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-cofcoin-purple"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Voltar</span>
              </Button>
              
              {/* Admin link for reward approval - would be conditionally shown */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/reward-approvals')}
                className="text-gray-600 hover:text-cofcoin-purple"
              >
                <Gift className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Aprovar Recompensas</span>
              </Button>
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
          <div className="flex items-center bg-white rounded-lg shadow-sm px-4 py-2 border border-gray-100">
            <div className="flex items-center text-cofcoin-orange font-medium">
              <Coins className="mr-2 h-5 w-5" />
              <span>Saldo: 500 CofCoins</span>
            </div>
          </div>
        </div>

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
                <CardDescription>{reward.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-cofcoin-orange font-medium text-lg">
                  <Coins className="mr-2 h-5 w-5" />
                  <span>{reward.value} CofCoins</span>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t">
                <Button 
                  onClick={() => handleRedeemReward(reward)} 
                  className={`w-full ${reward.value > 500 ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-cofcoin-purple hover:bg-cofcoin-purple-dark'} text-white`}
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
      </main>
    </div>
  );
};

export default RewardsPage;
