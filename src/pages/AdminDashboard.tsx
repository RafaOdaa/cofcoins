import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; 
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { 
  Users, 
  Gift, 
  TrendingUp, 
  DollarSign, 
  Home, 
  MoreHorizontal, 
  Edit,
  Plus,
  Search,
  ChevronDown,
  Check,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Settings,
  Tag
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import UserMenu from '@/components/UserMenu';
import AnimatedCoinBalance from '@/components/AnimatedCoinBalance';
import EditUserDataDialog from '@/components/EditUserDataDialog';
import EditUserBalanceDialog from '@/components/EditUserBalanceDialog';
import RewardConfigModal from '@/components/RewardConfigModal';

// Mock data for areas
const areas = [
  "Desenvolvimento",
  "Marketing",
  "Vendas",
  "Design",
  "Atendimento",
  "Financeiro",
  "Recursos Humanos",
  "Todas as áreas"
];

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@example.com",
    area: "Desenvolvimento",
    coins: 1200,
    isAdmin: false,
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    area: "Marketing",
    coins: 800,
    isAdmin: true,
  },
  {
    id: 3,
    name: "Carlos Souza",
    email: "carlos.souza@example.com",
    area: "Vendas",
    coins: 500,
    isAdmin: false,
  }
];

// Mock approvals data
const mockApprovals = [
  {
    id: 1,
    user: "João Silva",
    type: "Recompensa",
    description: "Vale Café",
    date: new Date("2025-04-15T10:00:00"),
    status: "pendente" as const,
  },
  {
    id: 2,
    user: "Maria Oliveira",
    type: "Saldo",
    description: "Adição de 500 CofCoins",
    date: new Date("2025-04-14T15:30:00"),
    status: "aprovado" as const,
  }
];

// Mock rewards data
const mockRewards = [
  {
    id: 1,
    title: "Vale Café",
    description: "Um café especial na cafeteria parceira",
    value: 150,
    icon: Gift,
    areas: ["Todas as áreas"]
  },
  {
    id: 2,
    title: "Day Off",
    description: "Um dia de folga para descansar",
    value: 1000,
    icon: Gift,
    areas: ["Desenvolvimento", "Marketing", "Vendas"]
  }
];

// Mock categories data
const mockCategories = [
  {
    id: 1,
    title: "Liderança",
    description: "Reconhecimentos relacionados a capacidade de liderança e gestão",
    icon: "Crown",
    areas: ["Desenvolvimento", "Marketing", "Vendas"]
  },
  {
    id: 2,
    title: "Inovação",
    description: "Ideias criativas e soluções inovadoras",
    icon: "Lightbulb",
    areas: ["Desenvolvimento", "Design"]
  },
  {
    id: 3,
    title: "Colaboração",
    description: "Trabalho em equipe e colaboração entre departamentos",
    icon: "Users",
    areas: ["Todas as áreas"]
  },
  {
    id: 4,
    title: "Excelência",
    description: "Desempenho excepcional e qualidade superior",
    icon: "Award",
    areas: ["Vendas", "Atendimento", "Marketing"]
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Users state
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [editUserDataOpen, setEditUserDataOpen] = useState(false);
  const [editUserBalanceOpen, setEditUserBalanceOpen] = useState(false);

  // Rewards state
  const [rewards, setRewards] = useState(mockRewards);
  const [rewardConfigOpen, setRewardConfigOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<typeof mockRewards[0] | null>(null);

  // Categories state
  const [categories, setCategories] = useState(mockCategories);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [categoryAreaFilter, setCategoryAreaFilter] = useState<string[]>([]);
  const [categorySortConfig, setCategorySortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Users tab handlers
  const openEditUserData = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
    setEditUserDataOpen(true);
  };

  const openEditUserBalance = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
    setEditUserBalanceOpen(true);
  };

  // Rewards tab handlers
  const openRewardConfig = (reward?: typeof mockRewards[0]) => {
    if (reward) {
      setSelectedReward(reward);
    } else {
      setSelectedReward(null);
    }
    setRewardConfigOpen(true);
  };

  // Categories handlers
  const handleCategorySort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (categorySortConfig && categorySortConfig.key === key && categorySortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setCategorySortConfig({ key, direction });
  };

  const getSortIcon = (columnKey: string, sortConfig: any) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === 'asc' ? 
      <ArrowUp className="ml-2 h-4 w-4" /> : 
      <ArrowDown className="ml-2 h-4 w-4" />;
  };

  // Filter and sort categories
  const filteredAndSortedCategories = React.useMemo(() => {
    let filtered = categories.filter(category => {
      const matchesSearch = category.title.toLowerCase().includes(categorySearchTerm.toLowerCase()) ||
                           category.description.toLowerCase().includes(categorySearchTerm.toLowerCase());
      
      const matchesArea = categoryAreaFilter.length === 0 || 
                         categoryAreaFilter.some(area => 
                           category.areas.includes(area) || category.areas.includes("Todas as áreas")
                         );
      
      return matchesSearch && matchesArea;
    });

    if (categorySortConfig) {
      filtered.sort((a, b) => {
        let aValue = a[categorySortConfig.key as keyof typeof a];
        let bValue = b[categorySortConfig.key as keyof typeof b];
        
        if (typeof aValue === 'string') aValue = aValue.toLowerCase();
        if (typeof bValue === 'string') bValue = bValue.toLowerCase();
        
        if (aValue < bValue) return categorySortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return categorySortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [categories, categorySearchTerm, categoryAreaFilter, categorySortConfig]);

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
              <span className="text-xl font-bold text-gray-900">Admin Dashboard</span>
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
              <UserMenu userName="Admin" isAdmin={true} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600">Gerencie usuários, recompensas, categorias e mais</p>
          </div>
          <AnimatedCoinBalance balance={0} />
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="approvals">Aprovações</TabsTrigger>
            <TabsTrigger value="rewards">Configurar Recompensas</TabsTrigger>
            <TabsTrigger value="categories">Configurar Categorias</TabsTrigger>
            <TabsTrigger value="balance-history">Histórico de Saldo</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Usuários</CardTitle>
                <CardDescription>Gerencie os usuários da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Área</TableHead>
                        <TableHead>Coins</TableHead>
                        <TableHead>Admin</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map(user => (
                        <TableRow key={user.id} className="hover:bg-gray-50">
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.area}</TableCell>
                          <TableCell>{user.coins}</TableCell>
                          <TableCell>{user.isAdmin ? "Sim" : "Não"}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button size="sm" variant="outline" onClick={() => openEditUserData(user)}>Editar</Button>
                            <Button size="sm" variant="outline" onClick={() => openEditUserBalance(user)}>Saldo</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approvals Tab */}
          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle>Aprovações</CardTitle>
                <CardDescription>Gerencie as aprovações pendentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockApprovals.map(approval => (
                        <TableRow key={approval.id} className="hover:bg-gray-50">
                          <TableCell>{approval.user}</TableCell>
                          <TableCell>{approval.type}</TableCell>
                          <TableCell>{approval.description}</TableCell>
                          <TableCell>{format(approval.date, 'dd/MM/yyyy')}</TableCell>
                          <TableCell>{approval.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Gift className="mr-2 h-5 w-5 text-cofcoin-purple" />
                      Configurar Recompensas
                    </CardTitle>
                    <CardDescription>
                      Gerencie as recompensas disponíveis na plataforma
                    </CardDescription>
                  </div>
                  <Button className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark" onClick={() => openRewardConfig()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Recompensa
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Áreas</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rewards.map(reward => (
                        <TableRow key={reward.id} className="hover:bg-gray-50">
                          <TableCell>{reward.title}</TableCell>
                          <TableCell>{reward.description}</TableCell>
                          <TableCell>{reward.value}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {reward.areas ? reward.areas.map((area, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">{area}</Badge>
                              )) : null}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Abrir menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem className="cursor-pointer" onClick={() => openRewardConfig(reward)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Tag className="mr-2 h-5 w-5 text-cofcoin-purple" />
                      Configurar Categorias
                    </CardTitle>
                    <CardDescription>
                      Gerencie as categorias de reconhecimento disponíveis na plataforma
                    </CardDescription>
                  </div>
                  <Button className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Categoria
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por nome ou descrição..."
                        value={categorySearchTerm}
                        onChange={(e) => setCategorySearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full sm:w-[200px] justify-between"
                      >
                        {categoryAreaFilter.length === 0
                          ? "Todas as áreas"
                          : `${categoryAreaFilter.length} área(s) selecionada(s)`}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Buscar área..." />
                        <CommandList>
                          <CommandEmpty>Nenhuma área encontrada.</CommandEmpty>
                          <CommandGroup>
                            {areas.map((area) => (
                              <CommandItem
                                key={area}
                                onSelect={() => {
                                  setCategoryAreaFilter(prev =>
                                    prev.includes(area)
                                      ? prev.filter(item => item !== area)
                                      : [...prev, area]
                                  );
                                }}
                              >
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={categoryAreaFilter.includes(area)}
                                    onChange={() => {}}
                                  />
                                  <span>{area}</span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50 select-none"
                          onClick={() => handleCategorySort('icon')}
                        >
                          <div className="flex items-center">
                            Ícone
                            {getSortIcon('icon', categorySortConfig)}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50 select-none"
                          onClick={() => handleCategorySort('title')}
                        >
                          <div className="flex items-center">
                            Título
                            {getSortIcon('title', categorySortConfig)}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50 select-none"
                          onClick={() => handleCategorySort('description')}
                        >
                          <div className="flex items-center">
                            Descrição
                            {getSortIcon('description', categorySortConfig)}
                          </div>
                        </TableHead>
                        <TableHead>Áreas Disponibilizadas</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedCategories.length > 0 ? (
                        filteredAndSortedCategories.map((category) => (
                          <TableRow key={category.id} className="hover:bg-gray-50">
                            <TableCell>
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cofcoin-purple/10">
                                <Tag className="h-4 w-4 text-cofcoin-purple" />
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{category.title}</TableCell>
                            <TableCell className="max-w-xs">
                              <p className="text-sm text-gray-600 truncate" title={category.description}>
                                {category.description}
                              </p>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {category.areas.map((area, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {area}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Abrir menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40">
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                            Nenhuma categoria encontrada.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Balance History Tab */}
          <TabsContent value="balance-history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Saldo</CardTitle>
                <CardDescription>Visualize o histórico de alterações de saldo dos usuários</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder content */}
                <p className="text-gray-600">Em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Visualize dados e métricas da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder content */}
                <p className="text-gray-600">Em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit User Data Dialog */}
      <EditUserDataDialog
        open={editUserDataOpen}
        user={selectedUser}
        onOpenChange={setEditUserDataOpen}
        onSave={(updatedUser) => {
          setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
          setEditUserDataOpen(false);
          toast({
            title: "Usuário atualizado",
            description: `Dados do usuário ${updatedUser.name} foram atualizados com sucesso.`,
          });
        }}
      />

      {/* Edit User Balance Dialog */}
      <EditUserBalanceDialog
        open={editUserBalanceOpen}
        user={selectedUser}
        onOpenChange={setEditUserBalanceOpen}
        onSave={(updatedUser) => {
          setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
          setEditUserBalanceOpen(false);
          toast({
            title: "Saldo atualizado",
            description: `Saldo do usuário ${updatedUser.name} foi atualizado com sucesso.`,
          });
        }}
      />

      {/* Reward Config Modal */}
      <RewardConfigModal
        open={rewardConfigOpen}
        reward={selectedReward}
        onOpenChange={setRewardConfigOpen}
        onSave={(updatedReward) => {
          if (updatedReward.id) {
            setRewards(prev => prev.map(r => r.id === updatedReward.id ? updatedReward : r));
          } else {
            const newReward = { ...updatedReward, id: rewards.length > 0 ? Math.max(...rewards.map(r => r.id)) + 1 : 1 };
            setRewards(prev => [...prev, newReward]);
          }
          setRewardConfigOpen(false);
          toast({
            title: "Recompensa salva",
            description: `Recompensa ${updatedReward.title} foi salva com sucesso.`,
          });
        }}
      />
    </div>
  );
};

export default AdminDashboard;
