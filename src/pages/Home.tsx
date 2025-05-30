
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Activity, Award, BookOpen, CheckCircle, Gift, Home, Plus, Search, Settings, Star, ToggleLeft, ToggleRight, TrendingUp, Users } from 'lucide-react';
import UserMenu from '@/components/UserMenu';
import NewRecognitionDialog from "@/components/NewRecognitionDialog";

// Category data with types and colors for charts - using recognition categories
const recognitionCategories = [{
  id: 1,
  name: "Fora da Caixa",
  value: 25,
  color: "#3B82F6",
  icon: Award
}, {
  id: 2,
  name: "O Quebra Galho",
  value: 30,
  color: "#10B981",
  icon: Star
}, {
  id: 3,
  name: "Aqui é MedCof!",
  value: 20,
  color: "#EF4444",
  icon: CheckCircle
}, {
  id: 4,
  name: "Mestre do Improviso",
  value: 15,
  color: "#F59E0B",
  icon: Users
}, {
  id: 5,
  name: "Segurador de Rojão",
  value: 18,
  color: "#8B5CF6",
  icon: BookOpen
}, {
  id: 6,
  name: "O Vidente",
  value: 12,
  color: "#06B6D4",
  icon: Activity
}];

const HomeDashboard = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [isNewRecognitionOpen, setIsNewRecognitionOpen] = useState(false);
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
              <Button variant="ghost" size="sm" onClick={() => navigate('/rewards')} className="text-gray-600 hover:text-cofcoin-purple">
                <Gift className="h-5 w-5 mr-1" />
                <span>Recompensas</span>
              </Button>
              <UserMenu userName="User" isAdmin={false} />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Acompanhe suas CofCoins e reconheça seus colegas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Saldo Card */}
          <Card>
            <CardHeader>
              <CardTitle>Saldo</CardTitle>
              <CardDescription>Suas CofCoins disponíveis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">100 CofCoins</div>
              <p className="text-sm text-gray-500">Ganhe mais CofCoins reconhecendo seus colegas!</p>
            </CardContent>
          </Card>

          {/* Reconhecimentos Card */}
          <Card>
            <CardHeader>
              <CardTitle>Reconhecimentos</CardTitle>
              <CardDescription>Seus últimos reconhecimentos</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-none space-y-2">
                <li className="flex items-center">
                  <Avatar className="mr-2">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Reconhecimento de Lucas Mendes</p>
                    <p className="text-xs text-gray-500">25 CofCoins - Fora da Caixa</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <Avatar className="mr-2">
                    <AvatarImage src="https://github.com/sadmann7.png" />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Reconhecimento de Amanda Oliveira</p>
                    <p className="text-xs text-gray-500">10 CofCoins - Inovação Constante</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Recompensas Card */}
          <Card>
            <CardHeader>
              <CardTitle>Recompensas</CardTitle>
              <CardDescription>Suas recompensas pendentes</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-none space-y-2">
                <li className="flex items-center justify-between">
                  <p className="text-sm font-medium">Vale Presente R$50</p>
                  <Badge variant="secondary">Pendente</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <p className="text-sm font-medium">Day Off</p>
                  <Badge variant="outline">Aprovado</Badge>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Reconhecer Usuário Section */}
        <section className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Reconhecer Usuário</h3>
            <Button onClick={() => setIsNewRecognitionOpen(true)} className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white">
              <Plus className="h-4 w-4 mr-1" />
              Novo Reconhecimento
            </Button>
          </div>

          <Card>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recipient">Destinatário</Label>
                  <Input type="text" id="recipient" placeholder="Nome do destinatário" />
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fora-da-caixa">Fora da Caixa</SelectItem>
                      <SelectItem value="quebra-galho">O Quebra Galho</SelectItem>
                      <SelectItem value="aqui-e-medcof">Aqui é MedCof!</SelectItem>
                      <SelectItem value="mestre-improviso">Mestre do Improviso</SelectItem>
                      <SelectItem value="segurador-rojao">Segurador de Rojão</SelectItem>
                      <SelectItem value="vidente">O Vidente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="amount">Valor (CofCoins)</Label>
                <Slider defaultValue={[25]} max={50} step={5} onValueChange={(value) => console.log(value)} />
                <p className="text-sm text-gray-500">Selecione a quantidade de CofCoins a serem enviadas.</p>
              </div>

              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Textarea id="message" placeholder="Escreva uma mensagem de reconhecimento" />
              </div>

              <Button className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white">Enviar Reconhecimento</Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <NewRecognitionDialog 
        open={isNewRecognitionOpen} 
        onOpenChange={setIsNewRecognitionOpen} 
      />
    </div>
  );
};

export default HomeDashboard;
