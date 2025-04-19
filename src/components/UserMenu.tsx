
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  LogOut, 
  Settings, 
  User as UserIcon, 
  Bell 
} from 'lucide-react';

interface UserMenuProps {
  userName?: string;
  isAdmin?: boolean;
  className?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ 
  userName = "Usuário", 
  isAdmin = false, 
  className 
}) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/login');
  };

  // Use the first letter of the userName, or 'U' as a fallback
  const userInitial = userName && userName.length > 0 ? userName.charAt(0) : 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-cofcoin-purple-dark flex items-center justify-center text-white font-medium">
            {userInitial}
          </div>
          <span className="hidden md:inline">{userName}</span>
          <ChevronDown className="h-4 w-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {isAdmin ? 'Administrador' : 'Colaborador'}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="flex items-center cursor-pointer" onClick={() => navigate('/profile')}>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="flex items-center cursor-pointer" onClick={() => navigate('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="flex items-center cursor-pointer" onClick={() => navigate('/notifications')}>
          <Bell className="mr-2 h-4 w-4" />
          <span>Notificações</span>
          <span className="ml-auto bg-cofcoin-purple text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
            3
          </span>
        </DropdownMenuItem>
        
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Painel Admin</span>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="flex items-center cursor-pointer text-red-600" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
