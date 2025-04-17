
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Check, ChevronRight, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<'email' | 'verification'>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, informe seu email para continuar.",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, informe um email válido.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to send verification code
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Código de verificação enviado",
        description: `Um código de verificação foi enviado para ${email}.`,
      });
      
      setStep('verification');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar o código de verificação.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode) {
      toast({
        title: "Código de verificação obrigatório",
        description: "Por favor, informe o código de verificação para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to verify code
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Você já pode fazer login na plataforma.",
      });
      
      navigate('/login');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Código de verificação inválido.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cofcoin-purple/30 via-white to-cofcoin-orange/30 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cofcoin-purple to-cofcoin-orange flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <CardTitle className="text-2xl">CofCoins</CardTitle>
          </div>
          <CardDescription>
            {step === 'email' ? 'Crie sua conta para começar' : 'Digite o código de verificação enviado para seu email'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    autoComplete="email"
                    tabIndex={1}
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-cofcoin-purple hover:bg-cofcoin-purple-dark"
                disabled={isLoading}
                tabIndex={2}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Enviando...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Próximo passo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verification-code">Código de Verificação</Label>
                <Input 
                  id="verification-code"
                  type="text"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                  autoComplete="one-time-code"
                />
                <p className="text-sm text-gray-500 mt-2">
                  O código foi enviado para {email}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep('email')}
                  disabled={isLoading}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
                <Button 
                  type="submit"
                  className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Verificando...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Verificar
                      <Check className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="w-full h-px bg-gray-200" />
          <div className="text-sm text-gray-500 w-full text-center">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-cofcoin-purple hover:underline">
              Faça login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
