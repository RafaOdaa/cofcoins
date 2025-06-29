import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';
import { Activity, Award, BookOpen, CheckCircle, Edit, Gift, Home, Plus, Search, Settings, Star, Users, XCircle, ChevronUp, ChevronDown, Heart, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import RecognitionDetailDialog, { Recognition } from "@/components/RecognitionDetailDialog";
import UserMenu from '@/components/UserMenu';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import NewRecognitionDialog from '@/components/NewRecognitionDialog';
import EditUserBalanceDialog from '@/components/EditUserBalanceDialog';
import RewardConfigModal, { RewardItem } from '@/components/RewardConfigModal';
import CategoryConfigModal, { CategoryItem } from '@/components/CategoryConfigModal';
import { Tooltip as UITooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import EditUserDataDialog from '@/components/EditUserDataDialog';
import RewardEvaluationDialog from '@/components/RewardEvaluationDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

// Teams data for the new pie chart
const teamsData = [{
  id: 1,
  name: "PR Mafia",
  recognitions: 45,
  cofcoins: 1250,
  color: "#FF6B6B"
}, {
  id: 2,
  name: "TIP",
  recognitions: 38,
  cofcoins: 980,
  color: "#4ECDC4"
}, {
  id: 3,
  name: "DevOps Warriors",
  recognitions: 32,
  cofcoins: 850,
  color: "#45B7D1"
}, {
  id: 4,
  name: "UX Champions",
  recognitions: 28,
  cofcoins: 720,
  color: "#96CEB4"
}, {
  id: 5,
  name: "Backend Ninjas",
  recognitions: 35,
  cofcoins: 920,
  color: "#FFEAA7"
}, {
  id: 6,
  name: "QA Masters",
  recognitions: 22,
  cofcoins: 580,
  color: "#DDA0DD"
}];

// Mock reward requests data for admin dashboard
const rewardRequestsData = [{
  id: 1,
  user: "Ana Oliveira",
  title: "Vale Café",
  value: 150,
  status: "pendente",
  requestDate: new Date("2025-04-15T14:25:00"),
  description: "Gostaria de trocar meus CofCoins por um vale café para utilizar na cafeteria do prédio."
}, {
  id: 2,
  user: "Carlos Mendes",
  title: "Gift Card R$50",
  value: 500,
  status: "aprovado",
  requestDate: new Date("2025-04-14T09:30:00"),
  description: "Quero utilizar meus CofCoins acumulados para um gift card da Amazon."
}, {
  id: 3,
  user: "Juliana Lima",
  title: "Vale Cinema",
  value: 300,
  status: "aprovado",
  requestDate: new Date("2025-04-12T16:45:00"),
  description: "Vou ao cinema com minha família e gostaria de usar meus CofCoins para isso."
}, {
  id: 4,
  user: "Rodrigo Almeida",
  title: "Vale Café",
  value: 150,
  status: "reprovado",
  requestDate: new Date("2025-04-10T11:20:00"),
  description: "Preciso de um café para me manter produtivo durante a tarde."
}];

// Mock data for the approval items
const approvalItems = [{
  id: 1,
  reporter: "Carolina Silva",
  recipient: "Lucas Mendes",
  amount: 25,
  category: "Colaboração Excepcional",
  description: "Lucas demonstrou um trabalho exemplar ao auxiliar toda a equipe durante o lançamento do novo produto. Sua disponibilidade e conhecimento técnico foram fundamentais para o sucesso do projeto.",
  date: new Date(2023, 9, 15),
  status: "pending",
  icon: Award
}, {
  id: 2,
  reporter: "Rafael Costa",
  recipient: "Amanda Oliveira",
  amount: 10,
  category: "Inovação Constante",
  description: "Amanda propôs uma solução criativa que otimizou nosso processo de atendimento, reduzindo o tempo de resposta em 30%.",
  date: new Date(2023, 9, 14),
  status: "pending",
  icon: Star
}, {
  id: 3,
  reporter: "Juliana Santos",
  recipient: "Pedro Henrique",
  amount: 15,
  category: "Aprendeu por si, falou por todos",
  description: "Pedro compartilhou conhecimentos valiosos de um curso recente sobre gestão ágil, ajudando toda a equipe a implementar práticas mais eficientes.",
  date: new Date(2023, 9, 13),
  status: "pending",
  icon: BookOpen
}];

// Mock data for user balances - updated with new fields
const userBalances = [{
  id: 1,
  name: "Lucas Mendes",
  balance: 135,
  department: "Tecnologia",
  area: "tech",
  spent: 20,
  totalReceived: 155,
  totalSent: 45
}, {
  id: 2,
  name: "Amanda Oliveira",
  balance: 120,
  department: "Marketing",
  area: "marketing",
  spent: 30,
  totalReceived: 150,
  totalSent: 35
}, {
  id: 3,
  name: "Pedro Henrique",
  balance: 95,
  department: "Produto",
  area: "product",
  spent: 10,
  totalReceived: 105,
  totalSent: 60
}, {
  id: 4,
  name: "Carolina Silva",
  balance: 85,
  department: "RH",
  area: "hr",
  spent: 5,
  totalReceived: 90,
  totalSent: 80
}, {
  id: 5,
  name: "Rafael Costa",
  balance: 75,
  department: "Vendas",
  area: "sales",
  spent: 15,
  totalReceived: 90,
  totalSent: 70
}, {
  id: 6,
  name: "Juliana Santos",
  balance: 65,
  department: "Financeiro",
  area: "finance",
  spent: 25,
  totalReceived: 90,
  totalSent: 55
}, {
  id: 7,
  name: "Bruno Almeida",
  balance: 60,
  department: "Atendimento",
  area: "ops",
  spent: 0,
  totalReceived: 60,
  totalSent: 40
}, {
  id: 8,
  name: "Mariana Lima",
  balance: 55,
  department: "Operações",
  area: "ops",
  spent: 35,
  totalReceived: 90,
  totalSent: 25
}, {
  id: 9,
  name: "Fernando Gomes",
  balance: 50,
  department: "Tecnologia",
  area: "tech",
  spent: 40,
  totalReceived: 90,
  totalSent: 30
}, {
  id: 10,
  name: "Isabela Martins",
  balance: 45,
  department: "Marketing",
  area: "marketing",
  spent: 50,
  totalReceived: 95,
  totalSent: 20
}];

// Mock data for recognition history
const recognitionHistory = [{
  id: 1,
  sender: "Carolina Silva",
  recipient: "Lucas Mendes",
  category: "Colaboração Excepcional",
  amount: 25,
  date: new Date(2023, 9, 15),
  status: "aprovado"
}, {
  id: 2,
  sender: "Rafael Costa",
  recipient: "Amanda Oliveira",
  category: "Inovação Constante",
  amount: 10,
  date: new Date(2023, 9, 14),
  status: "aprovado"
}, {
  id: 3,
  sender: "Juliana Santos",
  recipient: "Pedro Henrique",
  category: "Aprendeu por si, falou por todos",
  amount: 15,
  date: new Date(2023, 9, 13),
  status: "pendente"
}, {
  id: 4,
  sender: "Bruno Almeida",
  recipient: "Carolina Silva",
  category: "Liderança Inspiradora",
  amount: 20,
  date: new Date(2023, 9, 12),
  status: "reprovado"
}, {
  id: 5,
  sender: "Mariana Lima",
  recipient: "Rafael Costa",
  category: "Compromisso com Qualidade",
  amount: 15,
  date: new Date(2023, 9, 11),
  status: "aprovado"
}];

// Mock data for dashboard metrics
const topSenders = [{
  name: "Carolina Silva",
  value: 120
}, {
  name: "Rafael Costa",
  value: 95
}, {
  name: "Bruno Almeida",
  value: 85
}, {
  name: "Juliana Santos",
  value: 75
}, {
  name: "Mariana Lima",
  value: 65
}];
const topRecipients = [{
  name: "Lucas Mendes",
  value: 135
}, {
  name: "Amanda Oliveira",
  value: 120
}, {
  name: "Pedro Henrique",
  value: 95
}, {
  name: "Fernando Gomes",
  value: 75
}, {
  name: "Isabela Martins",
  value: 65
}];
const monthlyActivity = [{
  name: "Jan",
  aprovados: 65,
  reprovados: 10
}, {
  name: "Fev",
  aprovados: 75,
  reprovados: 15
}, {
  name: "Mar",
  aprovados: 85,
  reprovados: 20
}, {
  name: "Abr",
  aprovados: 70,
  reprovados: 12
}, {
  name: "Mai",
  aprovados: 80,
  reprovados: 18
}, {
  name: "Jun",
  aprovados: 90,
  reprovados: 25
}, {
  name: "Jul",
  aprovados: 75,
  reprovados: 15
}, {
  name: "Ago",
  aprovados: 85,
  reprovados: 20
}, {
  name: "Set",
  aprovados: 95,
  reprovados: 30
}, {
  name: "Out",
  aprovados: 85,
  reprovados: 22
}, {
  name: "Nov",
  aprovados: 0,
  reprovados: 0
}, {
  name: "Dez",
  aprovados: 0,
  reprovados: 0
}];

// Initial reward data for configuration
const initialRewards: RewardItem[] = [{
  id: 1,
  name: "Day Off",
  description: "Um dia de folga para descansar e recarregar as energias.",
  value: 500,
  areas: ["tech", "marketing", "product", "hr", "sales", "finance", "ops"],
  stock: 10,
  active: true
}, {
  id: 2,
  name: "Vale Presente R$50",
  description: "Vale presente para utilizar em lojas parceiras.",
  value: 100,
  areas: ["tech", "marketing", "product", "hr", "sales", "finance", "ops"],
  stock: 15,
  active: true
}, {
  id: 3,
  name: "Home Office por 1 semana",
  description: "Trabalhe de casa por uma semana inteira.",
  value: 250,
  areas: ["tech", "product", "sales"],
  stock: 5,
  active: false
}];

// Mock data for balance edit history
const balanceEditHistory = [{
  id: 1,
  admin: "Gabriel Costa",
  recipient: "Lucas Mendes",
  previousBalance: 100,
  newBalance: 135,
  difference: 35,
  date: new Date("2025-04-15T10:30:00"),
  reason: "Reconhecimento especial por performance excepcional no projeto XYZ"
}, {
  id: 2,
  admin: "Fernanda Lima",
  recipient: "Amanda Oliveira",
  previousBalance: 150,
  newBalance: 120,
  difference: -30,
  date: new Date("2025-04-14T15:45:00"),
  reason: "Correção de saldo duplicado"
}, {
  id: 3,
  admin: "Gabriel Costa",
  recipient: "Pedro Henrique",
  previousBalance: 75,
  newBalance: 95,
  difference: 20,
  date: new Date("2025-04-13T09:15:00"),
  reason: "Bônus por treinamento da equipe"
}, {
  id: 4,
  admin: "Fernanda Lima",
  recipient: "Carolina Silva",
  previousBalance: 85,
  newBalance: 85,
  difference: 0,
  date: new Date("2025-04-12T11:20:00"),
  reason: "Verificação de saldo"
}];

// Areas definition for the filter
const areas = [{
  id: "tech",
  name: "Tecnologia"
}, {
  id: "marketing",
  name: "Marketing"
}, {
  id: "product",
  name: "Produto"
}, {
  id: "hr",
  name: "RH"
}, {
  id: "sales",
  name: "Vendas"
}, {
  id: "finance",
  name: "Financeiro"
}, {
  id: "ops",
  name: "Operações"
}];

// Initial categories data
const initialCategories: CategoryItem[] = [
  {
    id: 1,
    title: "Fora da Caixa",
    description: "Reconhecimento para soluções criativas e inovadoras que fogem do convencional.",
    icon: "Award",
    areas: ["tech", "marketing", "product"],
    active: true
  },
  {
    id: 2,
    title: "O Quebra Galho",
    description: "Para quem sempre encontra uma solução rápida e eficaz para os problemas.",
    icon: "Star",
    areas: ["tech", "ops", "hr"],
    active: true
  },
  {
    id: 3,
    title: "Aqui é MedCof!",
    description: "Demonstração dos valores e cultura da empresa no dia a dia.",
    icon: "Heart",
    areas: ["tech", "marketing", "product", "hr", "sales", "finance", "ops"],
    active: true
  },
  {
    id: 4,
    title: "Mestre do Improviso",
    description: "Capacidade excepcional de adaptação e solução de problemas inesperados.",
    icon: "Target",
    areas: ["tech", "ops", "sales"],
    active: true
  },
  {
    id: 5,
    title: "Segurador de Rojão",
    description: "Para quem assume responsabilidades extras e resolve situações críticas.",
    icon: "CheckCircle",
    areas: ["tech", "ops", "hr", "finance"],
    active: false
  },
  {
    id: 6,
    title: "O Vidente",
    description: "Capacidade de antecipar problemas e propor soluções preventivas.",
    icon: "Zap",
    areas: ["tech", "product", "finance"],
    active: true
  }
];

type SortField = 'name' | 'department' | 'balance' | 'totalReceived' | 'totalSent';
type SortOrder = 'asc' | 'desc';

// New types for other table sorting
type ApprovalSortField = 'reporter' | 'recipient' | 'category' | 'amount' | 'date';
type RewardSortField = 'user' | 'title' | 'value' | 'status' | 'date';
type HistorySortField = 'date' | 'admin' | 'recipient' | 'previousBalance' | 'newBalance' | 'difference';
type CategorySortField = 'title' | 'description' | 'areas';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [selectedRecognition, setSelectedRecognition] = useState<Recognition | null>(null);
  const [isRecognitionDetailOpen, setIsRecognitionDetailOpen] = useState(false);
  const [isEditBalanceOpen, setIsEditBalanceOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof userBalances[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // State for reward configuration
  const [rewards, setRewards] = useState<RewardItem[]>(initialRewards);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [editingReward, setEditingReward] = useState<RewardItem | null>(null);
  const [rewardSearchTerm, setRewardSearchTerm] = useState("");

  // State for category configuration
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");

  // State for area filter (rewards)
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  // State for category area filter
  const [selectedCategoryAreas, setSelectedCategoryAreas] = useState<string[]>([]);

  // State for user area filter
  const [selectedUserAreas, setSelectedUserAreas] = useState<string[]>([]);

  // State for user sorting
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // State for approval sorting
  const [approvalSortField, setApprovalSortField] = useState<ApprovalSortField>('date');
  const [approvalSortOrder, setApprovalSortOrder] = useState<SortOrder>('desc');

  // State for reward sorting
  const [rewardSortField, setRewardSortField] = useState<RewardSortField>('date');
  const [rewardSortOrder, setRewardSortOrder] = useState<SortOrder>('desc');

  // State for history sorting
  const [historySortField, setHistorySortField] = useState<HistorySortField>('date');
  const [historySortOrder, setHistorySortOrder] = useState<SortOrder>('desc');

  // State for category sorting
  const [categorySortField, setCategorySortField] = useState<CategorySortField>('title');
  const [categorySortOrder, setCategorySortOrder] = useState<SortOrder>('asc');

  // Estado para controle do diálogo de ação (aprovar/rejeitar)
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    id: number;
    action: 'approve' | 'reject';
  }>({
    open: false,
    id: 0,
    action: 'approve'
  });

  // Estado para controle do diálogo de novo reconhecimento especial
  const [isNewRecognitionOpen, setIsNewRecognitionOpen] = useState(false);

  // Estado para controle do diálogo de edição de dados do usuário
  const [isEditUserDataOpen, setIsEditUserDataOpen] = useState(false);

  // Estados para avaliação de recompensas
  const [selectedReward, setSelectedReward] = useState<typeof rewardRequestsData[0] | null>(null);
  const [isRewardEvaluationOpen, setIsRewardEvaluationOpen] = useState(false);
  const [rewardConfirmDialog, setRewardConfirmDialog] = useState<{
    open: boolean;
    id: number;
    action: 'approve' | 'reject' | 'pending';
  }>({
    open: false,
    id: 0,
    action: 'approve'
  });

  // Handler functions that were missing
  const handleEvaluateRecognition = (item: typeof approvalItems[0]) => {
    const recognition: Recognition = {
      id: item.id,
      reporter: item.reporter,
      recipient: item.recipient,
      category: item.category,
      amount: item.amount,
      description: item.description,
      date: item.date,
      status: item.status
    };
    setSelectedRecognition(recognition);
    setIsRecognitionDetailOpen(true);
  };
  const handleApprove = (id: number) => {
    setConfirmDialog({
      open: true,
      id,
      action: 'approve'
    });
  };
  const handleReject = (id: number) => {
    setConfirmDialog({
      open: true,
      id,
      action: 'reject'
    });
  };
  const handleConfirmAction = () => {
    const actionText = confirmDialog.action === 'approve' ? 'aprovado' : 'rejeitado';
    toast({
      title: `Reconhecimento ${actionText}`,
      description: `O reconhecimento #${confirmDialog.id} foi ${actionText} com sucesso.`,
      variant: confirmDialog.action === 'reject' ? 'destructive' : 'default'
    });
    setConfirmDialog({
      ...confirmDialog,
      open: false
    });
    setIsRecognitionDetailOpen(false);
  };
  const handleEditBalance = (user: typeof userBalances[0]) => {
    setSelectedUser(user);
    setIsEditBalanceOpen(true);
  };
  const handleEditUserData = (user: typeof userBalances[0]) => {
    setSelectedUser(user);
    setIsEditUserDataOpen(true);
  };
  const handleBalanceEditComplete = () => {
    toast({
      title: "Saldo atualizado",
      description: "O saldo do usuário foi atualizado com sucesso."
    });
    setIsEditBalanceOpen(false);
  };
  const handleUserDataEditComplete = (userId: number, department: string, squad: string, approvalLeaders: string[], weeklyCoins: number) => {
    toast({
      title: "Dados atualizados",
      description: "Os dados do usuário foram atualizados com sucesso."
    });
    setIsEditUserDataOpen(false);
  };
  const handleAddNewReward = () => {
    setEditingReward(null);
    setIsRewardModalOpen(true);
  };
  const handleEditRewardConfig = (reward: RewardItem) => {
    setEditingReward(reward);
    setIsRewardModalOpen(true);
  };
  const handleSaveReward = (reward: RewardItem) => {
    if (editingReward) {
      setRewards(rewards.map(r => r.id === reward.id ? reward : r));
      toast({
        title: "Recompensa atualizada",
        description: "A recompensa foi atualizada com sucesso."
      });
    } else {
      const newReward = {
        ...reward,
        id: Math.max(...rewards.map(r => r.id)) + 1
      };
      setRewards([...rewards, newReward]);
      toast({
        title: "Recompensa criada",
        description: "A nova recompensa foi criada com sucesso."
      });
    }
    setIsRewardModalOpen(false);
    setEditingReward(null);
  };
  const handleToggleRewardStatus = (id: number, currentStatus: boolean) => {
    setRewards(rewards.map(reward => reward.id === id ? {
      ...reward,
      active: !currentStatus
    } : reward));
    toast({
      title: currentStatus ? "Recompensa desativada" : "Recompensa ativada",
      description: `A recompensa foi ${currentStatus ? 'desativada' : 'ativada'} com sucesso.`
    });
  };
  const getAreaNames = (areas: string[]) => {
    const areaMap: {
      [key: string]: string;
    } = {
      tech: "Tecnologia",
      marketing: "Marketing",
      product: "Produto",
      hr: "RH",
      sales: "Vendas",
      finance: "Financeiro",
      ops: "Operações"
    };
    return areas.map(area => areaMap[area] || area).join(", ");
  };

  // Função para avaliar uma recompensa
  const handleEvaluateReward = (reward: typeof rewardRequestsData[0]) => {
    setSelectedReward(reward);
    setIsRewardEvaluationOpen(true);
  };

  // Nova função para editar uma recompensa
  const handleEditReward = (reward: typeof rewardRequestsData[0]) => {
    setSelectedReward(reward);
    setIsRewardEvaluationOpen(true);
  };

  // Função para alterar status para pendente
  const handleSetPendingReward = (id: number) => {
    setRewardConfirmDialog({
      open: true,
      id,
      action: 'pending'
    });
  };

  // Função para aprovar uma recompensa
  const handleApproveReward = (id: number) => {
    setRewardConfirmDialog({
      open: true,
      id,
      action: 'approve'
    });
  };

  // Função para recusar uma recompensa
  const handleRejectReward = (id: number) => {
    setRewardConfirmDialog({
      open: true,
      id,
      action: 'reject'
    });
  };

  // Função para confirmar a ação da recompensa - atualizada
  const handleConfirmRewardAction = () => {
    const actionText = rewardConfirmDialog.action === 'approve' ? 'aprovada' : rewardConfirmDialog.action === 'reject' ? 'recusada' : 'alterada para pendente';
    toast({
      title: `Recompensa ${actionText}`,
      description: `A solicitação de recompensa #${rewardConfirmDialog.id} foi ${actionText} com sucesso.`,
      variant: rewardConfirmDialog.action === 'reject' ? 'destructive' : 'default'
    });
    setRewardConfirmDialog({
      ...rewardConfirmDialog,
      open: false
    });
    setIsRewardEvaluationOpen(false);
  };
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "aprovado":
        return "bg-green-100 text-green-800 border-green-200";
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "reprovado":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Filter users based on search term and selected areas
  const filteredUsers = userBalances.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedUserAreas.length === 0 || selectedUserAreas.includes(user.area);
    return matchesSearch && matchesArea;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'department':
        aValue = a.department;
        bValue = b.department;
        break;
      case 'balance':
        aValue = a.balance;
        bValue = b.balance;
        break;
      case 'totalReceived':
        aValue = a.totalReceived;
        bValue = b.totalReceived;
        break;
      case 'totalSent':
        aValue = a.totalSent;
        bValue = b.totalSent;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortOrder === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
  });

  // Sort approvals
  const sortedApprovals = [...approvalItems].sort((a, b) => {
    let aValue: string | number | Date;
    let bValue: string | number | Date;

    switch (approvalSortField) {
      case 'reporter':
        aValue = a.reporter;
        bValue = b.reporter;
        break;
      case 'recipient':
        aValue = a.recipient;
        bValue = b.recipient;
        break;
      case 'category':
        aValue = a.category;
        bValue = b.category;
        break;
      case 'amount':
        aValue = a.amount;
        bValue = b.amount;
        break;
      case 'date':
        aValue = a.date;
        bValue = b.date;
        break;
      default:
        aValue = a.date;
        bValue = b.date;
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return approvalSortOrder === 'asc' 
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
      return approvalSortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return approvalSortOrder === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
  });

  // Sort rewards
  const sortedRewards = [...rewardRequestsData].sort((a, b) => {
    let aValue: string | number | Date;
    let bValue: string | number | Date;

    switch (rewardSortField) {
      case 'user':
        aValue = a.user;
        bValue = b.user;
        break;
      case 'title':
        aValue = a.title;
        bValue = b.title;
        break;
      case 'value':
        aValue = a.value;
        bValue = b.value;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'date':
        aValue = a.requestDate;
        bValue = b.requestDate;
        break;
      default:
        aValue = a.requestDate;
        bValue = b.requestDate;
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return rewardSortOrder === 'asc' 
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
      return rewardSortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return rewardSortOrder === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
  });

  // Sort balance edit history
  const sortedHistory = [...balanceEditHistory].sort((a, b) => {
    let aValue: string | number | Date;
    let bValue: string | number | Date;

    switch (historySortField) {
      case 'date':
        aValue = a.date;
        bValue = b.date;
        break;
      case 'admin':
        aValue = a.admin;
        bValue = b.admin;
        break;
      case 'recipient':
        aValue = a.recipient;
        bValue = b.recipient;
        break;
      case 'previousBalance':
        aValue = a.previousBalance;
        bValue = b.previousBalance;
        break;
      case 'newBalance':
        aValue = a.newBalance;
        bValue = b.newBalance;
        break;
      case 'difference':
        aValue = a.difference;
        bValue = b.difference;
        break;
      default:
        aValue = a.date;
        bValue = b.date;
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return historySortOrder === 'asc' 
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
      return historySortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return historySortOrder === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
  });

  // Filter rewards based on search term and selected areas
  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(rewardSearchTerm.toLowerCase()) || reward.description.toLowerCase().includes(rewardSearchTerm.toLowerCase());
    const matchesArea = selectedAreas.length === 0 || selectedAreas.some(selectedArea => reward.areas.includes(selectedArea));
    return matchesSearch && matchesArea;
  });

  // Handler for area filter (rewards)
  const handleAreaToggle = (areaId: string) => {
    setSelectedAreas(prev => prev.includes(areaId) ? prev.filter(id => id !== areaId) : [...prev, areaId]);
  };

  // Handler for user area filter
  const handleUserAreaToggle = (areaId: string) => {
    setSelectedUserAreas(prev => prev.includes(areaId) ? prev.filter(id => id !== areaId) : [...prev, areaId]);
  };

  // Clear area filters (rewards)
  const clearAreaFilters = () => {
    setSelectedAreas([]);
  };

  // Clear user area filters
  const clearUserAreaFilters = () => {
    setSelectedUserAreas([]);
  };

  // Handle sorting for users
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Handle sorting for approvals
  const handleApprovalSort = (field: ApprovalSortField) => {
    if (approvalSortField === field) {
      setApprovalSortOrder(approvalSortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setApprovalSortField(field);
      setApprovalSortOrder('asc');
    }
  };

  // Handle sorting for rewards
  const handleRewardSort = (field: RewardSortField) => {
    if (rewardSortField === field) {
      setRewardSortOrder(rewardSortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setRewardSortField(field);
      setRewardSortOrder('asc');
    }
  };

  // Handle sorting for history
  const handleHistorySort = (field: HistorySortField) => {
    if (historySortField === field) {
      setHistorySortOrder(historySortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setHistorySortField(field);
      setHistorySortOrder('asc');
    }
  };

  // Category handlers
  const handleAddNewCategory = () => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleEditCategoryConfig = (category: CategoryItem) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (category: CategoryItem) => {
    if (editingCategory) {
      setCategories(categories.map(c => c.id === category.id ? category : c));
      toast({
        title: "Categoria atualizada",
        description: "A categoria foi atualizada com sucesso."
      });
    } else {
      const newCategory = {
        ...category,
        id: Math.max(...categories.map(c => c.id)) + 1
      };
      setCategories([...categories, newCategory]);
      toast({
        title: "Categoria criada",
        description: "A nova categoria foi criada com sucesso."
      });
    }
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const handleToggleCategoryStatus = (id: number, currentStatus: boolean) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, active: !currentStatus } : category
    ));
    toast({
      title: currentStatus ? "Categoria desativada" : "Categoria ativada",
      description: `A categoria foi ${currentStatus ? 'desativada' : 'ativada'} com sucesso.`
    });
  };

  // Filter categories based on search term and selected areas
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.title.toLowerCase().includes(categorySearchTerm.toLowerCase()) || 
                         category.description.toLowerCase().includes(categorySearchTerm.toLowerCase());
    const matchesArea = selectedCategoryAreas.length === 0 || 
                       selectedCategoryAreas.some(selectedArea => category.areas.includes(selectedArea));
    return matchesSearch && matchesArea;
  });

  // Sort categories
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (categorySortField) {
      case 'title':
        aValue = a.title;
        bValue = b.title;
        break;
      case 'description':
        aValue = a.description;
        bValue = b.description;
        break;
      case 'areas':
        aValue = a.areas.length;
        bValue = b.areas.length;
        break;
      default:
        aValue = a.title;
        bValue = b.title;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return categorySortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return categorySortOrder === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
  });

  // Handler for category area filter
  const handleCategoryAreaToggle = (areaId: string) => {
    setSelectedCategoryAreas(prev => 
      prev.includes(areaId) ? prev.filter(id => id !== areaId) : [...prev, areaId]
    );
  };

  // Clear category area filters
  const clearCategoryAreaFilters = () => {
    setSelectedCategoryAreas([]);
  };

  // Handle sorting for categories
  const handleCategorySort = (field: CategorySortField) => {
    if (categorySortField === field) {
      setCategorySortOrder(categorySortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setCategorySortField(field);
      setCategorySortOrder('asc');
    }
  };

  // Render sort icon for users
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  // Render sort icon for approvals
  const renderApprovalSortIcon = (field: ApprovalSortField) => {
    if (approvalSortField !== field) return null;
    return approvalSortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  // Render sort icon for rewards
  const renderRewardSortIcon = (field: RewardSortField) => {
    if (rewardSortField !== field) return null;
    return rewardSortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  // Render sort icon for history
  const renderHistorySortIcon = (field: HistorySortField) => {
    if (historySortField !== field) return null;
    return historySortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  // Render sort icon for categories
  const renderCategorySortIcon = (field: CategorySortField) => {
    if (categorySortField !== field) return null;
    return categorySortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      Award, Star, CheckCircle, Users, BookOpen, Activity, Gift, Heart, Target, Zap
    };
    return iconMap[iconName] || Award;
  };

  // Contar estatísticas para os cards
  const approvedCount = recognitionHistory.filter(record => record.status === "aprovado").length;
  const rejectedCount = recognitionHistory.filter(record => record.status === "reprovado").length;
  const pendingCount = recognitionHistory.filter(record => record.status === "pendente").length;
  
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
              <h1 className="ml-3 text-xl font-semibold text-gray-900">CofCoin Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/home')} className="text-gray-600 hover:text-cofcoin-purple">
                <Home className="h-5 w-5 mr-1" />
                <span>Home</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/rewards')} className="text-gray-600 hover:text-cofcoin-purple">
                <Gift className="h-5 w-5 mr-1" />
                <span>Recompensas</span>
              </Button>
              <UserMenu userName="Admin" isAdmin={true} />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Painel de Administração</h2>
          <p className="text-gray-600">Gerencie reconhecimentos, recompensas e visualize estatísticas.</p>
        </div>

        <div className="flex justify-end mb-4">
          <Button onClick={() => setIsNewRecognitionOpen(true)} className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white">
            <Plus className="h-4 w-4 mr-1" />
            Reconhecimento Especial
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="approvals" className="space-y-8">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-white p-1">
            <TabsTrigger value="approvals" className="px-3">
              Aprovações
            </TabsTrigger>
            <TabsTrigger value="rewards" className="px-3">
              Recompensas
            </TabsTrigger>
            <TabsTrigger value="rewardsConfig" className="px-3">
              Configurar Recompensas
            </TabsTrigger>
            <TabsTrigger value="categoriesConfig" className="px-3">
              Configurar Categorias
            </TabsTrigger>
            <TabsTrigger value="ranking" className="px-3">
              Ranking
            </TabsTrigger>
            <TabsTrigger value="balances" className="px-3">Usuários</TabsTrigger>
          </TabsList>

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Aprovações Concluídas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{approvedCount}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                    Aprovações Rejeitadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{rejectedCount}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Award className="h-5 w-5 text-yellow-600 mr-2" />
                    Aprovações Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleApprovalSort('reporter')}
                      >
                        <div className="flex items-center">
                          Solicitante
                          {renderApprovalSortIcon('reporter')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleApprovalSort('recipient')}
                      >
                        <div className="flex items-center">
                          Destinatário
                          {renderApprovalSortIcon('recipient')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleApprovalSort('category')}
                      >
                        <div className="flex items-center">
                          Categoria
                          {renderApprovalSortIcon('category')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleApprovalSort('amount')}
                      >
                        <div className="flex items-center">
                          Valor
                          {renderApprovalSortIcon('amount')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleApprovalSort('date')}
                      >
                        <div className="flex items-center">
                          Data
                          {renderApprovalSortIcon('date')}
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedApprovals.map(item => <TableRow key={item.id}>
                        <TableCell>{item.reporter}</TableCell>
                        <TableCell>{item.recipient}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.amount} CofCoins</TableCell>
                        <TableCell>{format(item.date, 'dd/MM/yyyy')}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                            Pendente
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleEvaluateRecognition(item)}>
                            Avaliar
                          </Button>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Recompensas Aprovadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{approvedCount}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                    Recompensas Rejeitadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{rejectedCount}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Award className="h-5 w-5 text-yellow-600 mr-2" />
                    Recompensas Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recompensas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar recompensa..." className="pl-10" onChange={e => setSearchTerm(e.target.value)} />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleRewardSort('user')}
                      >
                        <div className="flex items-center">
                          Usuário
                          {renderRewardSortIcon('user')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleRewardSort('title')}
                      >
                        <div className="flex items-center">
                          Recompensa
                          {renderRewardSortIcon('title')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleRewardSort('value')}
                      >
                        <div className="flex items-center">
                          Valor
                          {renderRewardSortIcon('value')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleRewardSort('status')}
                      >
                        <div className="flex items-center">
                          Status
                          {renderRewardSortIcon('status')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleRewardSort('date')}
                      >
                        <div className="flex items-center">
                          Data
                          {renderRewardSortIcon('date')}
                        </div>
                      </TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedRewards.map(reward => <TableRow key={reward.id}>
                        <TableCell>{reward.user}</TableCell>
                        <TableCell>{reward.title}</TableCell>
                        <TableCell>{reward.value} CofCoins</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(reward.status)}>
                            {reward.status === 'aprovado' ? 'Aprovado' : reward.status === 'pendente' ? 'Pendente' : 'Reprovado'}
                          </Badge>
                        </TableCell>
                        <TableCell>{format(reward.requestDate, 'dd/MM/yyyy')}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => {
                        if (reward.status === 'pendente') {
                          handleEvaluateReward(reward);
                        } else {
                          handleEditReward(reward);
                        }
                      }}>
                            {reward.status === 'pendente' ? 'Avaliar' : 'Editar'}
                          </Button>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Configuration Tab */}
          <TabsContent value="rewardsConfig">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Configuração de Recompensas</CardTitle>
                <Button onClick={handleAddNewReward} className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark">
                  <Plus className="h-4 w-4 mr-1" />
                  Nova Recompensa
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Buscar recompensa..." className="pl-10" value={rewardSearchTerm} onChange={e => setRewardSearchTerm(e.target.value)} />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="min-w-[200px] justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        {selectedAreas.length > 0 ? `${selectedAreas.length} área(s) selecionada(s)` : "Filtrar por áreas"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white">
                      {areas.map(area => <DropdownMenuCheckboxItem key={area.id} checked={selectedAreas.includes(area.id)} onCheckedChange={() => handleAreaToggle(area.id)}>
                          {area.name}
                        </DropdownMenuCheckboxItem>)}
                      {selectedAreas.length > 0 && <>
                          <div className="h-px bg-gray-200 my-1" />
                          <DropdownMenuCheckboxItem checked={false} onCheckedChange={clearAreaFilters} className="text-red-600">
                            Limpar filtros
                          </DropdownMenuCheckboxItem>
                        </>}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <TooltipProvider>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Áreas</TableHead>
                        <TableHead>Estoque</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRewards.map(reward => <TableRow key={reward.id}>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help">{reward.name}</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{reward.name}</p>
                              </TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help truncate max-w-[200px] inline-block">
                                  {reward.description}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{reward.description}</p>
                              </TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help">{reward.value} CofCoins</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{reward.value} CofCoins</p>
                              </TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help truncate max-w-[150px] inline-block">
                                  {getAreaNames(reward.areas)}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{getAreaNames(reward.areas)}</p>
                              </TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help">{reward.stock}</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Estoque atual: {reward.stock} unidades</p>
                              </TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell>
                            <Switch checked={reward.active} onCheckedChange={() => handleToggleRewardStatus(reward.id, reward.active)} className="data-[state=checked]:bg-cofcoin-purple" />
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleEditRewardConfig(reward)}>
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </TooltipProvider>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Categories Configuration Tab */}
          <TabsContent value="categoriesConfig">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Configuração de Categorias</CardTitle>
                <Button onClick={handleAddNewCategory} className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark">
                  <Plus className="h-4 w-4 mr-1" />
                  Nova Categoria
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Buscar categoria..." 
                      className="pl-10" 
                      value={categorySearchTerm} 
                      onChange={e => setCategorySearchTerm(e.target.value)} 
                    />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="min-w-[200px] justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        {selectedCategoryAreas.length > 0 ? `${selectedCategoryAreas.length} área(s) selecionada(s)` : "Filtrar por áreas"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white">
                      {areas.map(area => (
                        <DropdownMenuCheckboxItem 
                          key={area.id} 
                          checked={selectedCategoryAreas.includes(area.id)} 
                          onCheckedChange={() => handleCategoryAreaToggle(area.id)}
                        >
                          {area.name}
                        </DropdownMenuCheckboxItem>
                      ))}
                      {selectedCategoryAreas.length > 0 && (
                        <>
                          <div className="h-px bg-gray-200 my-1" />
                          <DropdownMenuCheckboxItem 
                            checked={false} 
                            onCheckedChange={clearCategoryAreaFilters} 
                            className="text-red-600"
                          >
                            Limpar filtros
                          </DropdownMenuCheckboxItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <TooltipProvider>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ícone</TableHead>
                        <TableHead 
                          className="cursor-pointer select-none hover:bg-gray-50"
                          onClick={() => handleCategorySort('title')}
                        >
                          <div className="flex items-center">
                            Título
                            {renderCategorySortIcon('title')}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer select-none hover:bg-gray-50"
                          onClick={() => handleCategorySort('description')}
                        >
                          <div className="flex items-center">
                            Descrição
                            {renderCategorySortIcon('description')}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer select-none hover:bg-gray-50"
                          onClick={() => handleCategorySort('areas')}
                        >
                          <div className="flex items-center">
                            Áreas
                            {renderCategorySortIcon('areas')}
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedCategories.map(category => {
                        const IconComponent = getIconComponent(category.icon);
                        return (
                          <TableRow key={category.id}>
                            <TableCell>
                              <IconComponent className="h-5 w-5 text-cofcoin-purple" />
                            </TableCell>
                            <TableCell>
                              <UITooltip>
                                <TooltipTrigger asChild>
                                  <span className="cursor-help">{category.title}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{category.title}</p>
                                </TooltipContent>
                              </UITooltip>
                            </TableCell>
                            <TableCell>
                              <UITooltip>
                                <TooltipTrigger asChild>
                                  <span className="cursor-help truncate max-w-[300px] inline-block">
                                    {category.description}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{category.description}</p>
                                </TooltipContent>
                              </UITooltip>
                            </TableCell>
                            <TableCell>
                              <UITooltip>
                                <TooltipTrigger asChild>
                                  <span className="cursor-help truncate max-w-[150px] inline-block">
                                    {getAreaNames(category.areas)}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{getAreaNames(category.areas)}</p>
                                </TooltipContent>
                              </UITooltip>
                            </TableCell>
                            <TableCell>
                              <Switch 
                                checked={category.active} 
                                onCheckedChange={() => handleToggleCategoryStatus(category.id, category.active)} 
                                className="data-[state=checked]:bg-cofcoin-purple" 
                              />
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" onClick={() => handleEditCategoryConfig(category)}>
                                <Edit className="h-4 w-4 mr-1" />
                                Editar
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TooltipProvider>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Ranking Tab */}
          <TabsContent value="ranking" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Atividade Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyActivity}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="aprovados" name="CofCoins Aprovados" fill="#8884d8" />
                        <Bar dataKey="reprovados" name="CofCoins Reprovados" fill="#FF8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição entre Categorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={recognitionCategories} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={({
                        name,
                        percent
                      }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                          {recognitionCategories.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip formatter={value => [`${value} reconhecimentos`, 'Quantidade']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição entre Equipes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={teamsData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="recognitions" nameKey="name" label={({
                        name,
                        percent
                      }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                          {teamsData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => {
                        const data = props.payload;
                        return [<div key="tooltip">
                                <div>{`Reconhecimentos: ${data.recognitions}`}</div>
                                <div>{`CofCoins: ${data.cofcoins}`}</div>
                              </div>, 'Estatísticas'];
                      }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top 5 Recipientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topRecipients} layout="vertical" margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}>
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="value" name="CofCoins" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Balances Tab */}
          <TabsContent value="balances" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usuários</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Buscar usuário..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="min-w-[200px] justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        {selectedUserAreas.length > 0 ? `${selectedUserAreas.length} área(s) selecionada(s)` : "Filtrar por áreas"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white">
                      {areas.map(area => <DropdownMenuCheckboxItem key={area.id} checked={selectedUserAreas.includes(area.id)} onCheckedChange={() => handleUserAreaToggle(area.id)}>
                          {area.name}
                        </DropdownMenuCheckboxItem>)}
                      {selectedUserAreas.length > 0 && <>
                          <div className="h-px bg-gray-200 my-1" />
                          <DropdownMenuCheckboxItem checked={false} onCheckedChange={clearUserAreaFilters} className="text-red-600">
                            Limpar filtros
                          </DropdownMenuCheckboxItem>
                        </>}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center">
                          Nome
                          {renderSortIcon('name')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleSort('department')}
                      >
                        <div className="flex items-center">
                          Departamento
                          {renderSortIcon('department')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleSort('balance')}
                      >
                        <div className="flex items-center">
                          Saldo
                          {renderSortIcon('balance')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleSort('totalReceived')}
                      >
                        <div className="flex items-center">
                          Total Recebido
                          {renderSortIcon('totalReceived')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleSort('totalSent')}
                      >
                        <div className="flex items-center">
                          Total Enviado
                          {renderSortIcon('totalSent')}
                        </div>
                      </TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedUsers.map(user => <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>{user.balance} CofCoins</TableCell>
                        <TableCell>{user.totalReceived} CofCoins</TableCell>
                        <TableCell>{user.totalSent} CofCoins</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditBalance(user)}>
                              <Edit className="h-4 w-4 mr-1" />
                              Editar Saldo
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditUserData(user)}>
                              <Settings className="h-4 w-4 mr-1" />
                              Editar Dados
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Edições de Saldo</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleHistorySort('date')}
                      >
                        <div className="flex items-center">
                          Data
                          {renderHistorySortIcon('date')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleHistorySort('admin')}
                      >
                        <div className="flex items-center">
                          Admin
                          {renderHistorySortIcon('admin')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleHistorySort('recipient')}
                      >
                        <div className="flex items-center">
                          Usuário
                          {renderHistorySortIcon('recipient')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleHistorySort('previousBalance')}
                      >
                        <div className="flex items-center">
                          Saldo Anterior
                          {renderHistorySortIcon('previousBalance')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleHistorySort('newBalance')}
                      >
                        <div className="flex items-center">
                          Novo Saldo
                          {renderHistorySortIcon('newBalance')}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer select-none hover:bg-gray-50"
                        onClick={() => handleHistorySort('difference')}
                      >
                        <div className="flex items-center">
                          Diferença
                          {renderHistorySortIcon('difference')}
                        </div>
                      </TableHead>
                      <TableHead>Motivo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedHistory.map(record => <TableRow key={record.id}>
                        <TableCell>{format(record.date, 'dd/MM/yyyy HH:mm')}</TableCell>
                        <TableCell>{record.admin}</TableCell>
                        <TableCell>{record.recipient}</TableCell>
                        <TableCell>{record.previousBalance} CofCoins</TableCell>
                        <TableCell>{record.newBalance} CofCoins</TableCell>
                        <TableCell>
                          <span className={record.difference > 0 ? 'text-green-600' : record.difference < 0 ? 'text-red-600' : 'text-gray-600'}>
                            {record.difference > 0 ? '+' : ''}{record.difference}
                          </span>
                        </TableCell>
                        <TableCell>{record.reason}</TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialogs */}
      <RecognitionDetailDialog open={isRecognitionDetailOpen} onOpenChange={setIsRecognitionDetailOpen} recognition={selectedRecognition} showActions={true} onApprove={handleApprove} onReject={handleReject} />
      
      <ConfirmationDialog open={confirmDialog.open} onOpenChange={open => setConfirmDialog({
      ...confirmDialog,
      open
    })} title={confirmDialog.action === 'approve' ? "Aprovar Reconhecimento" : "Rejeitar Reconhecimento"} description={`Tem certeza que deseja ${confirmDialog.action === 'approve' ? 'aprovar' : 'rejeitar'} este reconhecimento?`} onConfirm={handleConfirmAction} />
      
      <RewardEvaluationDialog open={isRewardEvaluationOpen} onOpenChange={setIsRewardEvaluationOpen} reward={selectedReward} onApprove={handleApproveReward} onReject={handleRejectReward} onPending={handleSetPendingReward} isEditing={selectedReward?.status !== 'pendente'} />

      <ConfirmationDialog open={rewardConfirmDialog.open} onOpenChange={open => setRewardConfirmDialog({
      ...rewardConfirmDialog,
      open
    })} title={rewardConfirmDialog.action === 'approve' ? "Aprovar Recompensa" : rewardConfirmDialog.action === 'reject' ? "Recusar Recompensa" : "Alterar para Pendente"} description={`Tem certeza que deseja ${rewardConfirmDialog.action === 'approve' ? 'aprovar' : rewardConfirmDialog.action === 'reject' ? 'recusar' : 'alterar para pendente'} esta solicitação de recompensa?`} onConfirm={handleConfirmRewardAction} variant={rewardConfirmDialog.action === 'reject' ? 'destructive' : 'default'} />
      
      <NewRecognitionDialog open={isNewRecognitionOpen} onOpenChange={setIsNewRecognitionOpen} isAdmin={true} />
      
      <EditUserBalanceDialog open={isEditBalanceOpen} onOpenChange={setIsEditBalanceOpen} user={selectedUser} onBalanceEditComplete={handleBalanceEditComplete} />
      
      <RewardConfigModal open={isRewardModalOpen} onOpenChange={setIsRewardModalOpen} onSave={handleSaveReward} editingReward={editingReward} />

      <EditUserDataDialog open={isEditUserDataOpen} onOpenChange={setIsEditUserDataOpen} user={selectedUser} onSave={handleUserDataEditComplete} />

      <CategoryConfigModal 
        open={isCategoryModalOpen} 
        onOpenChange={setIsCategoryModalOpen} 
        onSave={handleSaveCategory} 
        editingCategory={editingCategory} 
      />
    </div>
  );
};

export default AdminDashboard;
