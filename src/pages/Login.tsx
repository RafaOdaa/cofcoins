
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock login - in a real app this would connect to an authentication API
      console.log('Logging in with:', email, password);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any non-empty credentials
      if (email && password) {
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo à plataforma CofCoins!",
        });
        navigate('/home'); // Changed from '/dashboard' to '/home'
      } else {
        toast({
          title: "Erro no login",
          description: "Por favor, verifique seu email e senha.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um problema ao fazer login. Tente novamente.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cofcoin-purple/10 via-white to-cofcoin-orange/10">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-cofcoin-purple hover:text-cofcoin-purple-dark mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a página inicial
        </Link>
        
        <div className="flex justify-center items-center flex-1 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="border-cofcoin-purple/20 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cofcoin-purple/20">
                  <div className="h-8 w-8 rounded-full bg-cofcoin-purple flex items-center justify-center">
                    <span className="text-white font-bold">C</span>
                  </div>
                </div>
                <CardTitle className="text-2xl">Acesso à Plataforma</CardTitle>
                <CardDescription>
                  Entre com suas credenciais para acessar o CofCoinf
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium">
                          Senha
                        </label>
                        <Link to="/forgot-password" className="text-xs text-cofcoin-purple hover:underline">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          Entrando...
                        </div>
                      ) : (
                        <>
                          <LogIn className="mr-2 h-4 w-4" />
                          Entrar
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t px-6 py-4">
                <div className="text-sm text-center text-gray-500">
                  Ainda não tem uma conta?
                </div>
                <Button
                  variant="outline"
                  className="w-full border-cofcoin-purple text-cofcoin-purple hover:bg-cofcoin-purple/10"
                  onClick={() => navigate('/register')}
                >
                  Criar Conta
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
