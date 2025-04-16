
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
import ConfirmationDialog from '@/components/ConfirmationDialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock reward requests data with more entries
const rewardRequestsData = [
  { 
    id: 1, 
    user: "Ana Oliveira",
    title: "Vale Café", 
    value: 150, 
    status: "pendente",
    requestDate: new Date("2025-04-15T14:25:00"),
    description: "Gostaria de trocar meus CofCoins por um vale café para utilizar na cafeteria do prédio." 
  },
  { 
    id: 2, 
    user: "Carlos Mendes",
    title: "Gift Card R$50", 
    value: 500, 
    status: "pendente",
    requestDate: new Date("2025-04-14T09:30:00"),
    description: "Quero utilizar meus CofCoins acumulados para um gift card da Amazon." 
  },
  { 
    id: 3, 
    user: "Juliana Lima",
    title: "Vale Cinema", 
    value: 300, 
    status: "concluída",
    requestDate: new Date("2025-04-12T16:45:00"),
    description: "Vou ao cinema com minha família e gostaria de usar meus CofCoins para isso."
  },
  { 
    id: 4, 
    user: "Rodrigo Almeida",
    title: "Vale Café", 
    value: 150, 
    status: "cancelada",
    requestDate: new Date("2025-04-10T11:20:00"),
    description: "Preciso de um café para me manter produtivo durante a tarde."
  },
  { 
    id: 5, 
    user: "Amanda Sousa",
    title: "Gift Card R$50", 
    value: 500, 
    status: "concluída",
    requestDate: new Date("2025-04-08T13:15:00"),
    description: "Pretendo comprar um livro com este gift card da Amazon."
  },
  { 
    id: 6, 
    user: "Fernando Gomes",
    title: "Vale Restaurante", 
    value: 450, 
    status: "pendente",
    requestDate: new Date("2025-04-16T10:05:00"),
    description: "Gostaria de usar meus CofCoins para um almoço especial no restaurante próximo ao escritório."
  },
  { 
    id: 7, 
    user: "Mariana Costa",
    title: "Assinatura Streaming", 
    value: 350, 
    status: "pendente",
    requestDate: new Date("2025-04-16T08:15:00"),
    description: "Quero trocar meus CofCoins por um mês de assinatura do serviço de streaming."
  },
  { 
    id: 8, 
    user: "Paulo Silveira",
    title: "Vale Livraria", 
    value: 250, 
    status: "pendente",
    requestDate: new Date("2025-04-15T16:30:00"),
    description: "Gostaria de usar meus CofCoins para comprar livros técnicos."
  },
  { 
    id: 9, 
    user: "Camila Nunes",
    title: "Curso Online", 
    value: 600, 
    status: "pendente",
    requestDate: new Date("2025-04-15T09:45:00"),
    description: "Quero investir em meu desenvolvimento profissional com um curso online."
  },
  { 
    id: 10, 
    user: "Ricardo Ferreira",
    title: "Kit Escritório", 
    value: 400, 
    status: "pendente",
    requestDate: new Date("2025-04-14T14:20:00"),
    description: "Preciso melhorar meu setup de home office com novos acessórios."
  },
  { 
    id: 11, 
    user: "Patrícia Santos",
    title: "Vale Café", 
    value: 150, 
    status: "concluída",
    requestDate: new Date("2025-04-13T11:10:00"),
    description: "Um café para começar bem o dia de trabalho."
  },
  { 
    id: 12, 
    user: "Leonardo Martins",
    title: "Gift Card R$50", 
    value: 500, 
    status: "concluída",
    requestDate: new Date("2025-04-12T10:05:00"),
    description: "Vou usar este gift card para comprar um presente para minha esposa."
  },
  { 
    id: 13, 
    user: "Bianca Oliveira",
    title: "Vale Cinema", 
    value: 300, 
    status: "cancelada",
    requestDate: new Date("2025-04-11T15:30:00"),
    description: "Quero assistir ao novo filme de super-herói com meus amigos."
  },
  { 
    id: 14, 
    user: "Gabriel Silva",
    title: "Assinatura Revista", 
    value: 200, 
    status: "pendente",
    requestDate: new Date("2025-04-10T09:40:00"),
    description: "Gostaria de usar meus CofCoins para uma assinatura anual de revista especializada."
  },
  { 
    id: 15, 
    user: "Renata Lima",
    title: "Vale Livraria", 
    value: 250, 
    status: "concluída",
    requestDate: new Date("2025-04-09T14:15:00"),
    description: "Preciso de novos livros para meu clube de leitura."
  },
];

type Status = "pendente" | "concluída" | "cancelada";

const ITEMS_PER_PAGE = 5;

const RewardApprovalsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    requestId: number;
    action: 'approve' | 'reject';
  }>({
    open: false,
    requestId: 0,
    action: 'approve'
  });

  const [selectedReward, setSelectedReward] = useState<any | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  
  // Status change functions
  const handleApprove = async (requestId: number) => {
    // Show confirmation dialog
    setConfirmDialog({
      open: true,
      requestId,
      action: 'approve'
    });
  };
  
  const handleReject = async (requestId: number) => {
    // Show confirmation dialog
    setConfirmDialog({
      open: true,
      requestId,
      action: 'reject'
    });
  };
  
  const handleConfirmAction = async () => {
    const { requestId, action } = confirmDialog;
    
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, we would update the status in the database
      // For this mock example, we update the local state
      const updatedRequests = rewardRequestsData.map(req => {
        if (req.id === requestId) {
          return {
            ...req,
            status: action === 'approve' ? 'concluída' as Status : 'cancelada' as Status
          };
        }
        return req;
      });
      
      // In a real app, we would refetch the data
      // Here we're just showing a toast notification
      toast({
        title: action === 'approve' ? "Recompensa aprovada" : "Recompensa rejeitada",
        description: `A solicitação de recompensa foi ${action === 'approve' ? 'aprovada' : 'rejeitada'} com sucesso.`,
      });
      
      // Close dialog
      setConfirmDialog({
        ...confirmDialog,
        open: false
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar a solicitação.",
        variant: "destructive"
      });
    }
  };
  
  // Filter rewards
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
  
  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  // Handle row click to show details
  const handleRowClick = (reward: any) => {
    setSelectedReward(reward);
    setDetailModalOpen(true);
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
              <span className="text-xl font-bold text-gray-900">CofCoins</span>
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
                  {paginatedRequests.length > 0 ? (
                    paginatedRequests.map((request) => (
                      <TableRow 
                        key={request.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleRowClick(request)}
                      >
                        <TableCell>{request.user}</TableCell>
                        <TableCell className="font-medium">{request.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-cofcoin-orange">
                            <Coins className="h-4 w-4 mr-1" />
                            {request.value}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {request.requestDate.toLocaleDateString('pt-BR')} {request.requestDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(request.status as Status)}>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          {request.status === "pendente" ? (
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center text-green-600 border-green-200 hover:bg-green-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApprove(request.id);
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">Aprovar</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReject(request.id);
                                }}
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
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        onConfirm={handleConfirmAction}
        title={confirmDialog.action === 'approve' ? 'Confirmar Aprovação' : 'Confirmar Rejeição'}
        description={`Tem certeza que deseja ${confirmDialog.action === 'approve' ? 'aprovar' : 'rejeitar'} essa solicitação de recompensa?`}
        confirmText={confirmDialog.action === 'approve' ? 'Aprovar' : 'Rejeitar'}
        variant={confirmDialog.action === 'reject' ? 'destructive' : 'default'}
      />

      {/* Detail Dialog */}
      {selectedReward && (
        <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle className="flex items-center text-xl">
                <Gift className="h-5 w-5 mr-2 text-cofcoin-purple" />
                Detalhes da Solicitação
              </DialogTitle>
              <DialogDescription>
                Informações completas sobre esta solicitação de recompensa
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {/* Status Badge */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <Badge variant="outline" className={getStatusColor(selectedReward.status as Status)}>
                    {selectedReward.status.charAt(0).toUpperCase() + selectedReward.status.slice(1)}
                  </Badge>
                </div>

                {/* Date */}
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-sm font-medium text-gray-500">Data</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">
                      {selectedReward.requestDate.toLocaleDateString('pt-BR')} {selectedReward.requestDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* User */}
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-sm font-medium text-gray-500">Solicitante</span>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-cofcoin-purple" />
                    <span className="font-medium">{selectedReward.user}</span>
                  </div>
                </div>

                {/* Reward */}
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-sm font-medium text-gray-500">Recompensa</span>
                  <div className="flex items-center space-x-2">
                    <Gift className="h-4 w-4 text-cofcoin-orange" />
                    <span className="font-medium">{selectedReward.title}</span>
                  </div>
                </div>

                {/* Cost */}
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-sm font-medium text-gray-500">Custo</span>
                  <div className="flex items-center space-x-2">
                    <Coins className="h-4 w-4 text-cofcoin-orange" />
                    <span className="font-bold">{selectedReward.value}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedReward.description && (
                <div className="border-t pt-4">
                  <span className="text-sm font-medium text-gray-500 block mb-2">Descrição</span>
                  <div className="bg-gray-50 p-3 rounded-md text-gray-700">
                    {selectedReward.description}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="flex justify-end gap-2 pt-4">
              {selectedReward.status === "pendente" ? (
                <>
                  <Button 
                    variant="outline" 
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setDetailModalOpen(false);
                      handleReject(selectedReward.id);
                    }}
                  >
                    Rejeitar
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      setDetailModalOpen(false);
                      handleApprove(selectedReward.id);
                    }}
                  >
                    Aprovar
                  </Button>
                </>
              ) : (
                <Button onClick={() => setDetailModalOpen(false)} variant="outline">
                  Fechar
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RewardApprovalsPage;
