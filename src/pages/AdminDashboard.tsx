
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Award,
  CheckCircle, 
  Coins,
  Eye,
  Filter,
  Gift,
  History,
  Home,
  PenSquare,
  Plus,
  Search,
  Shield,
  Trash2,
  Trophy,
  User,
  UserRound,
  Users,
  Wrench,
  XCircle,
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
import { format } from 'date-fns';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from "@/components/ui/textarea";
import RecognitionDetailDialog, { Recognition } from '@/components/RecognitionDetailDialog';
import EditUserBalanceDialog from '@/components/EditUserBalanceDialog';
import UserMenu from '@/components/UserMenu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Enhanced mock recognition data with approver information
const approvalRequests = [
  {
    id: 1,
    reporter: "João Silva",
    recipient: "Maria Oliveira",
    amount: 100,
    category: "Fora da Caixa",
    status: "pendente",
    date: new Date('2025-04-15T10:15:00'),
    description: "Maria trouxe uma ideia inovadora para melhorar nosso processo de atendimento ao cliente, resultando em uma redução de 30% no tempo de resposta.",
    approver: null
  },
  {
    id: 2,
    reporter: "Ana Lima",
    recipient: "Pedro Santos",
    amount: 50,
    category: "O Quebra Galho",
    status: "pendente",
    date: new Date('2025-04-14T16:30:00'),
    description: "Pedro resolveu um problema crítico no servidor durante o final de semana, evitando uma paralisação dos serviços na segunda-feira.",
    approver: null
  },
  {
    id: 3,
    reporter: "Carlos Costa",
    recipient: "Juliana Mendes",
    amount: 100,
    category: "Segurador de Rojão",
    status: "concluída",
    date: new Date('2025-04-12T14:45:00'),
    description: "Juliana lidou com maestria com um cliente insatisfeito, revertendo completamente a situação e mantendo o contrato que estávamos prestes a perder.",
    approver: "Marcelo Diretor"
  },
  {
    id: 4,
    reporter: "Fernanda Gomes",
    recipient: "Rafael Alves",
    amount: 50,
    category: "O Vidente",
    status: "cancelada",
    date: new Date('2025-04-10T09:20:00'),
    description: "Rafael previu uma falha iminente no sistema e implementou medidas preventivas antes que causasse problemas maiores.",
    approver: "Marcelo Diretor"
  },
  {
    id: 5,
    reporter: "Paulo Silveira",
    recipient: "Amanda Costa",
    amount: 100,
    category: "Mestre do Improviso",
    status: "pendente",
    date: new Date('2025-04-16T09:20:00'),
    description: "Amanda conseguiu criar uma apresentação incrível para um cliente importante com apenas duas horas de antecedência após a versão original ter sido perdida.",
    approver: null
  },
  {
    id: 6,
    reporter: "Marcelo Ferreira",
    recipient: "Patrícia Santos",
    amount: 50,
    category: "Aqui é MedCof!",
    status: "pendente",
    date: new Date('2025-04-16T11:35:00'),
    description: "Patrícia ficou até tarde para garantir que a entrega do projeto fosse feita no prazo, mesmo não sendo sua responsabilidade direta.",
    approver: null
  },
  {
    id: 7,
    reporter: "Roberta Lopes",
    recipient: "Gustavo Martins",
    amount: 100,
    category: "Fora da Caixa",
    status: "pendente",
    date: new Date('2025-04-15T15:20:00'),
    description: "Gustavo desenvolveu uma solução criativa para um problema que estávamos enfrentando há meses, economizando recursos significativos para a empresa.",
    approver: null
  },
  {
    id: 8,
    reporter: "Carolina Alves",
    recipient: "Fernando Gomes",
    amount: 50,
    category: "O Quebra Galho",
    status: "concluída",
    date: new Date('2025-04-11T13:40:00'),
    description: "Fernando ajudou a resolver um bug crítico mesmo estando de férias, acessando remotamente e orientando a equipe.",
    approver: "Cláudia Gerente"
  },
  {
    id: 9,
    reporter: "Eduarda Souza",
    recipient: "Alexandre Rocha",
    amount: 100,
    category: "Segurador de Rojão",
    status: "pendente",
    date: new Date('2025-04-15T09:15:00'),
    description: "Alexandre conseguiu gerenciar uma crise de comunicação com a imprensa de forma exemplar, protegendo a imagem da empresa.",
    approver: null
  },
  {
    id: 10,
    reporter: "Ricardo Ferreira",
    recipient: "Bianca Lima",
    amount: 50,
    category: "O Vidente",
    status: "pendente",
    date: new Date('2025-04-14T10:30:00'),
    description: "Bianca identificou uma vulnerabilidade no sistema antes que pudesse ser explorada, evitando um possível vazamento de dados.",
    approver: null
  },
  {
    id: 11,
    reporter: "Gabriela Nunes",
    recipient: "Leonardo Santos",
    amount: 100,
    category: "Mestre do Improviso",
    status: "cancelada",
    date: new Date('2025-04-09T16:45:00'),
    description: "Leonardo conseguiu entregar uma solução alternativa para um cliente quando o produto principal apresentou problemas, salvando a relação comercial.",
    approver: "Cláudia Gerente"
  },
  {
    id: 12,
    reporter: "Camila Ferreira",
    recipient: "Henrique Oliveira",
    amount: 50,
    category: "Aqui é MedCof!",
    status: "concluída",
    date: new Date('2025-04-05T11:20:00'),
    description: "Henrique frequentemente faz sugestões para melhorar o ambiente de trabalho e participa ativamente de todas as iniciativas da empresa.",
    approver: "Marcelo Diretor"
  }
];

// Mock reward requests data with approver information
const rewardRequestsData = [
  { 
    id: 1, 
    user: "Ana Oliveira",
    title: "Vale Café", 
    value: 150, 
    status: "pendente",
    requestDate: new Date('2025-04-15T14:25:00'),
    description: "Gostaria de trocar meus CofCoins por um vale café para utilizar na cafeteria do prédio.",
    approver: null
  },
  { 
    id: 2, 
    user: "Carlos Mendes",
    title: "Gift Card R$50", 
    value: 500, 
    status: "pendente",
    requestDate: new Date('2025-04-14T09:30:00'),
    description: "Quero utilizar meus CofCoins acumulados para um gift card da Amazon.",
    approver: null
  },
  { 
    id: 3, 
    user: "Juliana Lima",
    title: "Vale Cinema", 
    value: 300, 
    status: "concluída",
    requestDate: new Date('2025-04-12T16:45:00'),
    description: "Vou ao cinema com minha família e gostaria de usar meus CofCoins para isso.",
    approver: "Ricardo Supervisor"
  },
  { 
    id: 4, 
    user: "Rodrigo Almeida",
    title: "Vale Café", 
    value: 150, 
    status: "cancelada",
    requestDate: new Date('2025-04-10T11:20:00'),
    description: "Preciso de um café para me manter produtivo durante a tarde.",
    approver: "Cláudia Gerente"
  },
  { 
    id: 5, 
    user: "Amanda Sousa",
    title: "Gift Card R$50", 
    value: 500, 
    status: "concluída",
    requestDate: new Date('2025-04-08T13:15:00'),
    description: "Pretendo comprar um livro com este gift card da Amazon.",
    approver: "Marcelo Diretor"
  },
  { 
    id: 6, 
    user: "Fernando Gomes",
    title: "Vale Restaurante", 
    value: 450, 
    status: "pendente",
    requestDate: new Date('2025-04-16T10:05:00'),
    description: "Gostaria de usar meus CofCoins para um almoço especial no restaurante próximo ao escritório.",
    approver: null
  },
  { 
    id: 7, 
    user: "Mariana Costa",
    title: "Assinatura Streaming", 
    value: 350, 
    status: "pendente",
    requestDate: new Date('2025-04-16T08:15:00'),
    description: "Quero trocar meus CofCoins por um mês de assinatura do serviço de streaming.",
    approver: null
  },
];

// Balance history mock data
const balanceHistoryData = [
  { 
    id: 1, 
    user: "Maria Oliveira", 
    previousBalance: 650, 
    newBalance: 750, 
    type: "adição", 
    reason: "Reconhecimento recebido", 
    changedBy: "Sistema", 
    changeDate: new Date('2025-04-15T14:30:00'),
  },
  { 
    id: 2, 
    user: "João Silva", 
    previousBalance: 700, 
    newBalance: 650, 
    type: "redução", 
    reason: "Ajuste administrativo", 
    changedBy: "Cláudia Gerente", 
    changeDate: new Date('2025-04-14T10:45:00'),
  },
  { 
    id: 3, 
    user: "Ana Lima", 
    previousBalance: 400, 
    newBalance: 500, 
    type: "adição", 
    reason: "Reconhecimento recebido", 
    changedBy: "Sistema", 
    changeDate: new Date('2025-04-12T09:15:00'),
  },
  { 
    id: 4, 
    user: "Pedro Santos", 
    previousBalance: 550, 
    newBalance: 450, 
    type: "redução", 
    reason: "Resgate de recompensa", 
    changedBy: "Sistema", 
    changeDate: new Date('2025-04-10T16:20:00'),
  },
  { 
    id: 5, 
    user: "Juliana Mendes", 
    previousBalance: 250, 
    newBalance: 350, 
    type: "adição", 
    reason: "Bônus administrativo", 
    changedBy: "Marcelo Diretor", 
    changeDate: new Date('2025-04-09T11:30:00'),
  },
  { 
    id: 6, 
    user: "Carlos Costa", 
    previousBalance: 350, 
    newBalance: 300, 
    type: "redução", 
    reason: "Resgate de recompensa", 
    changedBy: "Sistema", 
    changeDate: new Date('2025-04-08T14:10:00'),
  },
  { 
    id: 7, 
    user: "Fernanda Gomes", 
    previousBalance: 200, 
    newBalance: 250, 
    type: "adição", 
    reason: "Reconhecimento recebido", 
    changedBy: "Sistema", 
    changeDate: new Date('2025-04-07T09:40:00'),
  },
  { 
    id: 8, 
    user: "Rafael Alves", 
    previousBalance: 250, 
    newBalance: 200, 
    type: "redução", 
    reason: "Resgate de recompensa", 
    changedBy: "Sistema", 
    changeDate: new Date('2025-04-05T15:50:00'),
  }
];

// Mock user rankings
const userRankings = [
  { id: 1, name: "Maria Oliveira", recognitionsReceived: 15, totalCoins: 1250 },
  { id: 2, name: "João Silva", recognitionsReceived: 12, totalCoins: 950 },
  { id: 3, name: "Ana Lima", recognitionsReceived: 10, totalCoins: 800 },
  { id: 4, name: "Pedro Santos", recognitionsReceived: 8, totalCoins: 650 },
  { id: 5, name: "Juliana Mendes", recognitionsReceived: 7, totalCoins: 550 },
];

// Mock user balances
const userBalances = [
  { id: 1, name: "Maria Oliveira", balance: 750, spent: 500 },
  { id: 2, name: "João Silva", balance: 650, spent: 300 },
  { id: 3, name: "Ana Lima", balance: 500, spent: 300 },
  { id: 4, name: "Pedro Santos", balance: 450, spent: 200 },
  { id: 5, name: "Juliana Mendes", balance: 350, spent: 200 },
  { id: 6, name: "Carlos Costa", balance: 300, spent: 250 },
  { id: 7, name: "Fernanda Gomes", balance: 250, spent: 150 },
  { id: 8, name: "Rafael Alves", balance: 200, spent: 100 },
];

// Categories for admin recognition
const categories = [
  { 
    id: 1, 
    name: "Fora da Caixa", 
    description: "Pra quem sempre surpreende com soluções e ideias que ninguém tinha pensado, mudando o jogo e dando aquele toque criativo que faz toda a diferença.",
    icon: <Award className="h-5 w-5 text-blue-600" />
  },
  { 
    id: 2, 
    name: "O Quebra Galho", 
    description: "Praquele parceiro que aparece rapidinho e resolve o problema sem enrolação. Quando você precisa, ele tá lá para fazer tudo se ajeitar.",
    icon: <Wrench className="h-5 w-5 text-green-600" />
  },
  { 
    id: 3, 
    name: "Aqui é MedCof!", 
    description: "Pra quem age como se a empresa fosse sua casa: cuida, propõe melhorias e não deixa nada no 'deixa pra depois'. É aquele sentimento de 'se eu não fizer, ninguém faz'.",
    icon: <User className="h-5 w-5 text-red-600" />
  },
  { 
    id: 4, 
    name: "Mestre do Improviso", 
    description: "Pra aquele que, mesmo sem planejar, sempre acha um jeito de resolver a situação e sair da enrascada.",
    icon: <Gift className="h-5 w-5 text-amber-600" />
  },
  { 
    id: 5, 
    name: "Segurador de Rojão", 
    description: "Para aquele(a) colega que chega na hora certa para domar situações explosivas e manter a paz com muita habilidade e leveza.",
    icon: <Shield className="h-5 w-5 text-purple-600" />
  },
  { 
    id: 6, 
    name: "O Vidente", 
    description: "Praquele que, com uma visão quase sobrenatural, identifica e resolve perrengues antes mesmo de acontecerem.",
    icon: <Eye className="h-5 w-5 text-indigo-600" />
  },
];

type Status = "pendente" | "concluída" | "cancelada";

const ITEMS_PER_PAGE = 5;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("approvals");
  
  // State for recognition data
  const [recognitionData, setRecognitionData] = useState(approvalRequests);
  const [rewardData, setRewardData] = useState(rewardRequestsData);
  const [balanceHistory, setBalanceHistory] = useState(balanceHistoryData);
  
  // Recognition states
  const [selectedRecognition, setSelectedRecognition] = useState<Recognition | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    requestId: number;
    type: 'recognition' | 'reward' | 'delete';
    action: 'approve' | 'reject' | 'delete';
  }>({ open: false, requestId: 0, type: 'recognition', action: 'approve' });
  
  // User balance states
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [editBalanceDialogOpen, setEditBalanceDialogOpen] = useState(false);
  
  // Admin recognition state
  const [isRecognitionDialogOpen, setIsRecognitionDialogOpen] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [coinAmount, setCoinAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Statistics
  const pendingRecognitions = recognitionData.filter(r => r.status === 'pendente').length;
  const approvedRecognitions = recognitionData.filter(r => r.status === 'concluída').length;
  const rejectedRecognitions = recognitionData.filter(r => r.status === 'cancelada').length;
  
  const pendingRewards = rewardData.filter(r => r.status === 'pendente').length;
  const approvedRewards = rewardData.filter(r => r.status === 'concluída').length;
  const rejectedRewards = rewardData.filter(r => r.status === 'cancelada').length;
  
  // Filtered recognition requests
  const filteredApprovals = recognitionData.filter(request => {
    // Text search filter
    const searchMatch = 
      request.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Status filter
    const statusMatch = 
      statusFilter === 'all' || request.status === statusFilter;
    
    return searchMatch && statusMatch;
  });
  
  // Pagination
  const totalApprovalPages = Math.ceil(filteredApprovals.length / ITEMS_PER_PAGE);
  const paginatedApprovals = filteredApprovals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  // Filtered rewards
  const filteredRewards = rewardData.filter(request => {
    // Text search filter
    const searchMatch = 
      request.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Status filter
    const statusMatch = 
      statusFilter === 'all' || request.status === statusFilter;
    
    return searchMatch && statusMatch;
  });
  
  const totalRewardPages = Math.ceil(filteredRewards.length / ITEMS_PER_PAGE);
  const paginatedRewards = filteredRewards.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Filtered balance history
  const filteredHistory = balanceHistory.filter(entry => {
    const searchMatch = 
      entry.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.changedBy.toLowerCase().includes(searchQuery.toLowerCase());
      
    return searchMatch;
  });
  
  const totalHistoryPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setCurrentPage(1); // Reset pagination on tab change
    setSearchQuery(''); // Reset search on tab change
    setStatusFilter('all'); // Reset filter on tab change
  };

  const handleRecognitionRowClick = (recognition: any) => {
    // Convert to our recognition format
    const formattedRecognition: Recognition = {
      id: recognition.id,
      reporter: recognition.reporter,
      recipient: recognition.recipient,
      amount: recognition.amount,
      category: recognition.category,
      description: recognition.description,
      status: recognition.status as "pendente" | "concluída" | "cancelada",
      date: recognition.date,
      icon: getCategoryIcon(recognition.category),
      approver: recognition.approver
    };
    
    setSelectedRecognition(formattedRecognition);
    setDetailModalOpen(true);
  };

  const handleRewardRowClick = (reward: any) => {
    setSelectedRecognition({
      id: reward.id,
      recipient: reward.user,
      amount: reward.value,
      category: reward.title,
      description: reward.description,
      status: reward.status as "pendente" | "concluída" | "cancelada",
      date: reward.requestDate,
      icon: <Gift className="h-5 w-5 text-cofcoin-orange" />,
      approver: reward.approver
    });
    setDetailModalOpen(true);
  };

  const handleConfirmDialog = (requestId: number, type: 'recognition' | 'reward' | 'delete', action: 'approve' | 'reject' | 'delete') => {
    setConfirmDialog({
      open: true,
      requestId,
      type,
      action
    });
  };

  const handleConfirmAction = () => {
    const { requestId, type, action } = confirmDialog;
    
    try {
      if (action === 'delete') {
        if (type === 'recognition') {
          // Delete the recognition
          const updatedRecognitions = recognitionData.filter(r => r.id !== requestId);
          setRecognitionData(updatedRecognitions);
          
          toast({
            title: "Reconhecimento excluído",
            description: "O reconhecimento foi excluído com sucesso.",
          });
        } else if (type === 'reward') {
          // Delete the reward request
          const updatedRewards = rewardData.filter(r => r.id !== requestId);
          setRewardData(updatedRewards);
          
          toast({
            title: "Solicitação de recompensa excluída",
            description: "A solicitação de recompensa foi excluída com sucesso.",
          });
        }
      } else {
        // Handle approve/reject
        const actionText = action === 'approve' ? 'aprovado' : 'rejeitado';
        const statusUpdate = action === 'approve' ? 'concluída' : 'cancelada';
        const adminName = "Administrador"; // In a real app this would be the logged-in admin name
        
        if (type === 'recognition') {
          // Update recognition status
          const updatedRecognitions = recognitionData.map(r => {
            if (r.id === requestId) {
              return { ...r, status: statusUpdate, approver: adminName };
            }
            return r;
          });
          
          setRecognitionData(updatedRecognitions);
          
          // Add to balance history if approved
          if (action === 'approve') {
            const recognition = recognitionData.find(r => r.id === requestId);
            if (recognition) {
              // Find the user
              const user = userBalances.find(u => u.name === recognition.recipient);
              if (user) {
                const newBalance = user.balance + recognition.amount;
                
                // Add balance history entry
                const newHistoryEntry = {
                  id: balanceHistory.length + 1,
                  user: recognition.recipient,
                  previousBalance: user.balance,
                  newBalance: newBalance,
                  type: "adição" as const,
                  reason: "Reconhecimento aprovado",
                  changedBy: adminName,
                  changeDate: new Date()
                };
                
                setBalanceHistory([newHistoryEntry, ...balanceHistory]);
              }
            }
          }
          
          toast({
            title: `Reconhecimento ${actionText}`,
            description: `O reconhecimento foi ${actionText} com sucesso.`,
          });
        } else if (type === 'reward') {
          // Update reward status
          const updatedRewards = rewardData.map(r => {
            if (r.id === requestId) {
              return { ...r, status: statusUpdate, approver: adminName };
            }
            return r;
          });
          
          setRewardData(updatedRewards);
          
          // Deduct from user's balance if approved
          if (action === 'approve') {
            const reward = rewardData.find(r => r.id === requestId);
            if (reward) {
              // Find the user
              const userIndex = userBalances.findIndex(u => u.name === reward.user);
              if (userIndex !== -1) {
                const user = userBalances[userIndex];
                const newBalance = user.balance - reward.value;
                
                // Add balance history entry
                const newHistoryEntry = {
                  id: balanceHistory.length + 1,
                  user: reward.user,
                  previousBalance: user.balance,
                  newBalance: newBalance,
                  type: "redução" as const,
                  reason: "Resgate de recompensa",
                  changedBy: adminName,
                  changeDate: new Date()
                };
                
                setBalanceHistory([newHistoryEntry, ...balanceHistory]);
              }
            }
          }
          
          toast({
            title: `Solicitação de recompensa ${actionText}`,
            description: `A solicitação de recompensa foi ${actionText} com sucesso.`,
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar a solicitação.",
        variant: "destructive"
      });
    } finally {
      setConfirmDialog({ ...confirmDialog, open: false });
    }
  };
  
  const handleEditUserBalance = (user: any) => {
    setSelectedUser(user);
    setEditBalanceDialogOpen(true);
  };
  
  // Handle balance edit completion
  const handleBalanceEditComplete = (userId: number, previousBalance: number, newBalance: number, reason: string) => {
    // Update user balance in userBalances array
    const updatedBalances = userBalances.map(user => {
      if (user.id === userId) {
        return { ...user, balance: newBalance };
      }
      return user;
    });
    
    // Add to balance history
    const user = userBalances.find(u => u.id === userId);
    if (user) {
      const newHistoryEntry = {
        id: balanceHistory.length + 1,
        user: user.name,
        previousBalance: previousBalance,
        newBalance: newBalance,
        type: newBalance > previousBalance ? "adição" : "redução" as "adição" | "redução",
        reason: reason,
        changedBy: "Administrador", // In a real app this would be the logged-in admin name
        changeDate: new Date()
      };
      
      setBalanceHistory([newHistoryEntry, ...balanceHistory]);
    }
    
    toast({
      title: "Saldo atualizado",
      description: "O saldo do colaborador foi atualizado com sucesso.",
    });
  };
  
  const handleAdminRecognition = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !coinAmount || !selectedCategory || !description) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a new recognition
      const newRecognition = {
        id: recognitionData.length + 1,
        reporter: "Administrador",
        recipient: recipient,
        amount: parseInt(coinAmount),
        category: categories.find(c => c.id === selectedCategory)?.name || "Não especificada",
        status: "concluída" as const,
        date: new Date(),
        description: description,
        approver: "Administrador (Auto-aprovado)"
      };
      
      setRecognitionData([newRecognition, ...recognitionData]);
      
      // Add to balance history and update user balance
      const userIndex = userBalances.findIndex(u => u.name === recipient);
      if (userIndex !== -1) {
        const user = userBalances[userIndex];
        const newBalance = user.balance + parseInt(coinAmount);
        
        // Add balance history entry
        const newHistoryEntry = {
          id: balanceHistory.length + 1,
          user: recipient,
          previousBalance: user.balance,
          newBalance: newBalance,
          type: "adição" as const,
          reason: "Reconhecimento especial de administrador",
          changedBy: "Administrador",
          changeDate: new Date()
        };
        
        setBalanceHistory([newHistoryEntry, ...balanceHistory]);
      }
      
      toast({
        title: "Reconhecimento enviado",
        description: `Reconhecimento enviado com sucesso para ${recipient} com ${coinAmount} CofCoins.`,
      });
      
      // Reset form
      setRecipient('');
      setCoinAmount('');
      setSelectedCategory(null);
      setDescription('');
      
      // Close dialog
      setIsRecognitionDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar o reconhecimento.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
  
  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.icon || <Award className="h-5 w-5 text-gray-600" />;
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
                className="text-gray-600 hover:text-cofcoin-purple"
              >
                <Home className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Home</span>
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
              <UserMenu userName="Admin" isAdmin={true} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
          
          <Button 
            onClick={() => setIsRecognitionDialogOpen(true)}
            className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Enviar Reconhecimento Especial
          </Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Pending Approvals Card */}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-yellow-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-yellow-800">
                <CheckCircle className="h-5 w-5 mr-2 text-yellow-600" />
                Aprovações Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-yellow-800">{pendingRecognitions}</span>
                  <span className="text-sm text-yellow-700">Reconhecimentos</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-yellow-800">{pendingRewards}</span>
                  <span className="text-sm text-yellow-700">Recompensas</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Approved Card */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-green-800">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Aprovados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-green-800">{approvedRecognitions}</span>
                  <span className="text-sm text-green-700">Reconhecimentos</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-green-800">{approvedRewards}</span>
                  <span className="text-sm text-green-700">Recompensas</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Rejected Card */}
          <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-red-800">
                <XCircle className="h-5 w-5 mr-2 text-red-600" />
                Rejeitados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-red-800">{rejectedRecognitions}</span>
                  <span className="text-sm text-red-700">Reconhecimentos</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-red-800">{rejectedRewards}</span>
                  <span className="text-sm text-red-700">Recompensas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Filtre as solicitações e reconhecimentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar..."
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
        
        <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-5 mb-4">
            <TabsTrigger value="approvals">Aprovações</TabsTrigger>
            <TabsTrigger value="rewards">Recompensas</TabsTrigger>
            <TabsTrigger value="rankings">Rankings</TabsTrigger>
            <TabsTrigger value="balances">Saldos</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>
          
          {/* Approval Tab Content */}
          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle>Aprovações de Reconhecimentos</CardTitle>
                <CardDescription>Gerencie as solicitações de reconhecimento entre colaboradores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Relator</TableHead>
                        <TableHead>Destinatário</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead className="hidden lg:table-cell">Categoria</TableHead>
                        <TableHead>Data/Hora</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aprovador</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedApprovals.length > 0 ? (
                        paginatedApprovals.map((request) => (
                          <TableRow 
                            key={request.id}
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => handleRecognitionRowClick(request)}
                          >
                            <TableCell>{request.reporter}</TableCell>
                            <TableCell>{request.recipient}</TableCell>
                            <TableCell>
                              <div className="flex items-center text-cofcoin-orange">
                                <Coins className="h-4 w-4 mr-1" />
                                {request.amount}
                              </div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span>{request.category}</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{request.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>{format(request.date, 'dd/MM/yyyy HH:mm')}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(request.status as Status)}>
                                {request.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {request.approver ? (
                                <div className="flex items-center text-sm">
                                  <UserRound className="h-3 w-3 mr-1 text-gray-500" />
                                  {request.approver}
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">-</span>
                              )}
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
                                      handleConfirmDialog(request.id, 'recognition', 'approve');
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
                                      handleConfirmDialog(request.id, 'recognition', 'reject');
                                    }}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    <span className="hidden sm:inline">Rejeitar</span>
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex justify-end">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleConfirmDialog(request.id, 'delete', 'delete');
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    <span className="hidden sm:inline">Excluir</span>
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                            Nenhuma solicitação de reconhecimento encontrada.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination */}
                {totalApprovalPages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          >
                            Anterior
                          </PaginationPrevious>
                        </PaginationItem>
                        
                        {Array.from({length: totalApprovalPages}, (_, i) => i + 1).map(page => (
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
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalApprovalPages))}
                            className={currentPage === totalApprovalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          >
                            Próximo
                          </PaginationNext>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Rewards Tab Content */}
          <TabsContent value="rewards">
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
                        <TableHead>Data/Hora</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aprovador</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedRewards.length > 0 ? (
                        paginatedRewards.map((request) => (
                          <TableRow 
                            key={request.id}
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => handleRewardRowClick(request)}
                          >
                            <TableCell>{request.user}</TableCell>
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
                            <TableCell>
                              <div className="flex items-center text-cofcoin-orange">
                                <Coins className="h-4 w-4 mr-1" />
                                {request.value}
                              </div>
                            </TableCell>
                            <TableCell>
                              {format(request.requestDate, 'dd/MM/yyyy HH:mm')}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(request.status as Status)}>
                                {request.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {request.approver ? (
                                <div className="flex items-center text-sm">
                                  <UserRound className="h-3 w-3 mr-1 text-gray-500" />
                                  {request.approver}
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">-</span>
                              )}
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
                                      handleConfirmDialog(request.id, 'reward', 'approve');
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
                                      handleConfirmDialog(request.id, 'reward', 'reject');
                                    }}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    <span className="hidden sm:inline">Rejeitar</span>
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleConfirmDialog(request.id, 'delete', 'delete');
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  <span className="hidden sm:inline">Excluir</span>
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                            Nenhuma solicitação de recompensa encontrada.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination */}
                {totalRewardPages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          >
                            Anterior
                          </PaginationPrevious>
                        </PaginationItem>
                        
                        {Array.from({length: totalRewardPages}, (_, i) => i + 1).map(page => (
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
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalRewardPages))}
                            className={currentPage === totalRewardPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          >
                            Próximo
                          </PaginationNext>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Rankings Tab Content */}
          <TabsContent value="rankings">
            <Card>
              <CardHeader>
                <CardTitle>Ranking de Reconhecimentos</CardTitle>
                <CardDescription>Colaboradores que mais receberam reconhecimentos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Posição</TableHead>
                        <TableHead>Colaborador</TableHead>
                        <TableHead>Reconhecimentos</TableHead>
                        <TableHead>Total CofCoins</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userRankings.map((user, index) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center font-bold">
                              {index === 0 && <Trophy className="h-5 w-5 text-yellow-500 mr-1" />}
                              {index === 1 && <Trophy className="h-5 w-5 text-gray-400 mr-1" />}
                              {index === 2 && <Trophy className="h-5 w-5 text-amber-700 mr-1" />}
                              {index > 2 && <span className="w-6 text-center">{index + 1}</span>}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.recognitionsReceived}</TableCell>
                          <TableCell>
                            <div className="flex items-center text-cofcoin-orange font-medium">
                              <Coins className="h-4 w-4 mr-1" />
                              {user.totalCoins}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Balances Tab Content */}
          <TabsContent value="balances">
            <Card>
              <CardHeader>
                <CardTitle>Saldos dos Usuários</CardTitle>
                <CardDescription>Gerencie os saldos de CofCoins de todos os colaboradores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Colaborador</TableHead>
                        <TableHead>Saldo Atual</TableHead>
                        <TableHead>Já Utilizado</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userBalances.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center text-cofcoin-orange font-medium">
                              <Coins className="h-4 w-4 mr-1" />
                              {user.balance}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-gray-600">
                              <Coins className="h-4 w-4 mr-1" />
                              {user.spent}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center font-medium">
                              <Coins className="h-4 w-4 mr-1" />
                              {user.balance + user.spent}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-cofcoin-purple border-cofcoin-purple/30 hover:bg-cofcoin-purple/10"
                              onClick={() => handleEditUserBalance(user)}
                            >
                              <PenSquare className="h-4 w-4 mr-1" />
                              <span>Editar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* History Tab Content - New Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Alterações de Saldo</CardTitle>
                <CardDescription>Registro de todas as alterações de saldo dos colaboradores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data/Hora</TableHead>
                        <TableHead>Colaborador</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Saldo Anterior</TableHead>
                        <TableHead>Novo Saldo</TableHead>
                        <TableHead>Motivo</TableHead>
                        <TableHead>Alterado Por</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedHistory.length > 0 ? (
                        paginatedHistory.map((entry) => (
                          <TableRow key={entry.id} className="hover:bg-gray-50">
                            <TableCell className="whitespace-nowrap">
                              {format(entry.changeDate, 'dd/MM/yyyy HH:mm')}
                            </TableCell>
                            <TableCell className="font-medium">{entry.user}</TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={entry.type === "adição" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}
                              >
                                {entry.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-600">
                              <div className="flex items-center">
                                <Coins className="h-4 w-4 mr-1" />
                                {entry.previousBalance}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="flex items-center text-cofcoin-orange">
                                <Coins className="h-4 w-4 mr-1" />
                                {entry.newBalance}
                              </div>
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="truncate max-w-xs block">
                                      {entry.reason.length > 25 ? `${entry.reason.substring(0, 25)}...` : entry.reason}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{entry.reason}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center text-sm">
                                <UserRound className="h-3 w-3 mr-1 text-gray-500" />
                                {entry.changedBy}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                            Nenhum histórico de alteração de saldo encontrado.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination */}
                {totalHistoryPages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          >
                            Anterior
                          </PaginationPrevious>
                        </PaginationItem>
                        
                        {Array.from({length: totalHistoryPages}, (_, i) => i + 1).map(page => (
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
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalHistoryPages))}
                            className={currentPage === totalHistoryPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          >
                            Próximo
                          </PaginationNext>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        onConfirm={handleConfirmAction}
        title={
          confirmDialog.action === 'delete'
            ? 'Confirmar Exclusão'
            : confirmDialog.action === 'approve'
            ? 'Confirmar Aprovação'
            : 'Confirmar Rejeição'
        }
        description={
          confirmDialog.action === 'delete'
            ? `Tem certeza que deseja excluir ${confirmDialog.type === 'recognition' ? 'este reconhecimento' : 'esta solicitação de recompensa'}?`
            : `Tem certeza que deseja ${confirmDialog.action === 'approve' ? 'aprovar' : 'rejeitar'} ${confirmDialog.type === 'recognition' ? 'este reconhecimento' : 'esta solicitação de recompensa'}?`
        }
        confirmText={
          confirmDialog.action === 'delete'
            ? 'Excluir'
            : confirmDialog.action === 'approve'
            ? 'Aprovar'
            : 'Rejeitar'
        }
        variant={confirmDialog.action === 'delete' || confirmDialog.action === 'reject' ? 'destructive' : 'default'}
      />

      {/* Recognition Detail Dialog */}
      <RecognitionDetailDialog
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        recognition={selectedRecognition}
        showActions={selectedRecognition?.status === "pendente"}
        onApprove={(id) => handleConfirmDialog(id, selectedTab === "approvals" ? 'recognition' : 'reward', 'approve')}
        onReject={(id) => handleConfirmDialog(id, selectedTab === "approvals" ? 'recognition' : 'reward', 'reject')}
      />

      {/* Admin Special Recognition Dialog */}
      <Dialog open={isRecognitionDialogOpen} onOpenChange={setIsRecognitionDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center">
              <Award className="mr-2 h-5 w-5 text-cofcoin-purple" />
              Reconhecimento Especial (Admin)
            </DialogTitle>
            <DialogDescription>
              Envie um reconhecimento especial com valor personalizado
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAdminRecognition} className="space-y-6 py-4">
            {/* Recipient Field */}
            <div className="space-y-2">
              <Label htmlFor="recipient">Destinatário</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="recipient"
                  placeholder="Digite o nome do colaborador"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Custom Amount Field */}
            <div className="space-y-2">
              <Label htmlFor="coinAmount">Valor em CofCoins</Label>
              <Input
                id="coinAmount"
                type="number"
                placeholder="Digite o valor"
                value={coinAmount}
                onChange={(e) => setCoinAmount(e.target.value)}
                min="1"
              />
              <p className="text-sm text-gray-500">
                Como administrador, você pode definir um valor personalizado
              </p>
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <Label>Selecione a Categoria</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map(category => (
                  <div
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`border rounded-md p-3 cursor-pointer transition-colors ${
                      selectedCategory === category.id 
                        ? "border-cofcoin-purple bg-cofcoin-purple/10" 
                        : "border-gray-200 hover:border-cofcoin-purple/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {category.icon}
                      <h4 className="font-medium">{category.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva por que você está reconhecendo essa pessoa..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-sm text-gray-500">
                Explique o motivo do reconhecimento e como isso ajudou a equipe ou empresa
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRecognitionDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Enviando...
                  </div>
                ) : (
                  "Enviar Reconhecimento"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit User Balance Dialog */}
      <EditUserBalanceDialog
        open={editBalanceDialogOpen}
        onOpenChange={setEditBalanceDialogOpen}
        user={selectedUser}
        onBalanceEditComplete={handleBalanceEditComplete}
      />
    </div>
  );
};

export default AdminDashboard;
