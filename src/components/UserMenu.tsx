
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
  Bell, 
  ShieldCheck
} from 'lucide-react';

interface UserMenuProps {
  userName: string;
  isAdmin?: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ userName, isAdmin = false }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real app, we would clear the session
    navigate('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-cofcoin-purple-dark flex items-center justify-center text-white font-medium">
            {userName.charAt(0)}
          </div>
          <span className="hidden md:inline">{userName}</span>
          <ChevronDown className="h-4 w-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/notifications')} className="cursor-pointer">
          <Bell className="mr-2 h-4 w-4" />
          <span>Notificações</span>
          <span className="ml-auto bg-cofcoin-purple text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
            3
          </span>
        </DropdownMenuItem>
        
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer">
              <ShieldCheck className="mr-2 h-4 w-4" />
              <span>Painel Admin</span>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
