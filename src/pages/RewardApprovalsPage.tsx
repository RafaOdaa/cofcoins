
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft,
  CheckCircle, 
  Coins,
  Filter,
  Gift,
  Home,
  Search,
  XCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock reward requests data
const rewardRequestsData = [
  { 
    id: 1, 
    user: "Ana Oliveira",
    title: "Vale Café", 
    value: 150, 
    status: "pendente",
    requestDate: "2025-03-30" 
  },
  { 
    id: 2, 
    user: "Carlos Mendes",
    title: "Gift Card R$50", 
    value: 500, 
    status: "pendente",
    requestDate: "2025-04-02"
  },
  { 
    id: 3, 
    user: "Juliana Lima",
    title: "Vale Cinema", 
    value: 300, 
    status: "concluída",
    requestDate: "2025-03-28"
  },
  { 
    id: 4, 
    user: "Rodrigo Almeida",
    title: "Vale Café", 
    value: 150, 
    status: "cancelada",
    requestDate: "2025-03-25"
  },
  { 
    id: 5, 
    user: "Amanda Sousa",
    title: "Gift Card R$50", 
    value: 500, 
    status: "concluída",
    requestDate: "2025-03-20"
  },
];

type Status = "pendente" | "concluída" | "cancelada";

const RewardApprovalsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const filteredRequests = rewardRequestsData.filter(request => {
    // Text search filter
    const searchMatch = 
      request.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Status filter
    const statusMatch = 
      statusFilter === 'all' || request.status === statusFilter;
    
    return searchMatch && statusMatch;
  });
  
  const handleStatusChange = async (requestId: number, newStatus: Status) => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      toast({
        title: "Status atualizado",
        description: `Solicitação de recompensa ${newStatus === "concluída" ? "aprovada" : "rejeitada"} com sucesso.`,
      });
      
      // In a real app, we would update the status in the database and then refresh the data
      // If status is "cancelada", we'd also refund the CofCoins to the user
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o status.",
        variant: "destructive"
      });
    }
  };
  
  const getStatusColor = (status: Status) => {
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
                onClick={() => navigate('/rewards')}
                className="text-gray-600 hover:text-cofcoin-purple"
              >
                <Gift className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Recompensas</span>
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
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Aprovação de Recompensas</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Filtre as solicitações de recompensas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar por nome ou recompensa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar por status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="concluída">Concluída</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Solicitações de Recompensas</CardTitle>
            <CardDescription>Gerencie as solicitações de troca de CofCoins por recompensas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Recompensa</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead className="hidden lg:table-cell">Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.user}</TableCell>
                        <TableCell className="font-medium">{request.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-cofcoin-orange">
                            <Coins className="h-4 w-4 mr-1" />
                            {request.value}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {new Date(request.requestDate).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(request.status as Status)}>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {request.status === "pendente" ? (
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center text-green-600 border-green-200 hover:bg-green-50"
                                onClick={() => handleStatusChange(request.id, "concluída")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">Aprovar</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleStatusChange(request.id, "cancelada")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">Rejeitar</span>
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">
                              {request.status === "concluída" ? "Aprovada" : "Rejeitada"}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                        Nenhuma solicitação encontrada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RewardApprovalsPage;
