
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft,
  CheckCircle,
  Filter,
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
import {
  Badge
} from "@/components/ui/badge";

// Mock approvals data
const approvalsData = [
  { 
    id: 1, 
    reporter: "João Silva",
    recipient: "Ana Oliveira", 
    amount: 100, 
    category: "Fora da Caixa", 
    status: "pendente" 
  },
  { 
    id: 2, 
    reporter: "Maria Santos",
    recipient: "Carlos Mendes", 
    amount: 50, 
    category: "Quebra Galho", 
    status: "pendente" 
  },
  { 
    id: 3, 
    reporter: "Pedro Costa",
    recipient: "Juliana Lima", 
    amount: 100, 
    category: "Segurador de Rojão", 
    status: "concluída" 
  },
  { 
    id: 4, 
    reporter: "Sofia Martins",
    recipient: "Rodrigo Almeida", 
    amount: 50, 
    category: "O Vidente", 
    status: "cancelada" 
  },
  { 
    id: 5, 
    reporter: "Lucas Ferreira",
    recipient: "Amanda Sousa", 
    amount: 100, 
    category: "Mestre do Improviso", 
    status: "concluída" 
  },
];

type Status = "pendente" | "concluída" | "cancelada";

const ApprovalsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const filteredApprovals = approvalsData.filter(approval => {
    // Text search filter
    const searchMatch = 
      approval.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Status filter
    const statusMatch = 
      statusFilter === 'all' || approval.status === statusFilter;
      
    // Category filter  
    const categoryMatch = 
      categoryFilter === 'all' || approval.category === categoryFilter;
    
    return searchMatch && statusMatch && categoryMatch;
  });
  
  const handleStatusChange = async (approvalId: number, newStatus: Status) => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      toast({
        title: "Status atualizado",
        description: `Reconhecimento ${newStatus === "concluída" ? "aprovado" : "rejeitado"} com sucesso.`
      });
      
      // In a real app, we would update the status in the database and then refresh the data
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
                <ArrowLeft className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Voltar</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Painel de Aprovação</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Filtre os reconhecimentos por diferentes critérios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar por nome ou categoria..."
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
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar por categoria" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  <SelectItem value="Fora da Caixa">Fora da Caixa</SelectItem>
                  <SelectItem value="Quebra Galho">Quebra Galho</SelectItem>
                  <SelectItem value="Mestre do Improviso">Mestre do Improviso</SelectItem>
                  <SelectItem value="Segurador de Rojão">Segurador de Rojão</SelectItem>
                  <SelectItem value="O Vidente">O Vidente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Reconhecimentos</CardTitle>
            <CardDescription>Gerencie as solicitações de reconhecimentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Relator</TableHead>
                    <TableHead className="hidden md:table-cell">Destinatário</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead className="hidden lg:table-cell">Categoria</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApprovals.length > 0 ? (
                    filteredApprovals.map((approval) => (
                      <TableRow key={approval.id}>
                        <TableCell>{approval.reporter}</TableCell>
                        <TableCell className="hidden md:table-cell">{approval.recipient}</TableCell>
                        <TableCell className="font-medium text-cofcoin-orange">
                          {approval.amount}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">{approval.category}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(approval.status as Status)}>
                            {approval.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {approval.status === "pendente" ? (
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center text-green-600 border-green-200 hover:bg-green-50"
                                onClick={() => handleStatusChange(approval.id, "concluída")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">Aprovar</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleStatusChange(approval.id, "cancelada")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">Rejeitar</span>
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">
                              {approval.status === "concluída" ? "Aprovado" : "Rejeitado"}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                        Nenhum reconhecimento encontrado.
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

export default ApprovalsPage;
