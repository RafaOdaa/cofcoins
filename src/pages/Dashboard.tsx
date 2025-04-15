
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Gift, Send, Settings, User, Users } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

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
              <span className="text-xl font-bold text-gray-900">CofCoinf</span>
            </div>
            
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-cofcoin-purple"
              >
                Sair
              </Button>
              <div className="ml-3 relative">
                <div className="h-8 w-8 rounded-full bg-cofcoin-purple/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-cofcoin-purple" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bem-vindo ao CofCoinf</h1>
            <p className="text-gray-600">Seu painel de reconhecimento e recompensas</p>
          </div>
          <div className="flex items-center bg-white rounded-lg shadow-sm px-4 py-2 border border-gray-100">
            <div className="flex items-center text-cofcoin-orange font-medium">
              <Award className="mr-2 h-5 w-5" />
              <span>Saldo: 500 CofCoins</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Button
            className="h-auto py-4 bg-white hover:bg-gray-50 text-gray-800 shadow-sm border border-gray-100 flex flex-col items-center"
            variant="outline"
          >
            <Send className="h-6 w-6 text-cofcoin-purple mb-2" />
            <span>Novo Reconhecimento</span>
          </Button>
          
          <Button
            className="h-auto py-4 bg-white hover:bg-gray-50 text-gray-800 shadow-sm border border-gray-100 flex flex-col items-center"
            variant="outline"
          >
            <Gift className="h-6 w-6 text-cofcoin-orange mb-2" />
            <span>Ver Recompensas</span>
          </Button>
          
          <Button
            className="h-auto py-4 bg-white hover:bg-gray-50 text-gray-800 shadow-sm border border-gray-100 flex flex-col items-center"
            variant="outline"
          >
            <Users className="h-6 w-6 text-blue-500 mb-2" />
            <span>Explorar Categorias</span>
          </Button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Meus Reconhecimentos</CardTitle>
              <CardDescription>Reconhecimentos recebidos recentemente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Award className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Fora da Caixa</div>
                        <div className="text-sm text-gray-500">De: Carlos Silva</div>
                      </div>
                    </div>
                    <div className="text-cofcoin-orange font-medium">+100</div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-cofcoin-purple" size="sm">
                Ver Todos
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reconhecimentos Enviados</CardTitle>
              <CardDescription>Seus reconhecimentos recentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Send className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Quebra Galho</div>
                        <div className="text-sm text-gray-500">Para: Ana Pereira</div>
                      </div>
                    </div>
                    <div className="text-cofcoin-orange font-medium">50</div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-cofcoin-purple" size="sm">
                Ver Todos
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
