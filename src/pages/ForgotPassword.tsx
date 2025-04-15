
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email) {
        toast({
          title: "Email enviado",
          description: "Verifique sua caixa de entrada para redefinir sua senha.",
        });
      } else {
        toast({
          title: "Email inválido",
          description: "Por favor, informe um email válido.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um problema ao enviar o email. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cofcoin-purple/10 via-white to-cofcoin-orange/10">
      <div className="container mx-auto px-4 py-8">
        <Link to="/login" className="inline-flex items-center text-cofcoin-purple hover:text-cofcoin-purple-dark mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para login
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
                <CardTitle className="text-2xl">Esqueceu sua senha?</CardTitle>
                <CardDescription>
                  Informe seu email para redefinir sua senha
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
                    <Button
                      type="submit"
                      className="bg-cofcoin-purple hover:bg-cofcoin-purple-dark text-white w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          Enviando...
                        </div>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar email de recuperação
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t px-6 py-4">
                <div className="text-sm text-center text-gray-500">
                  Lembrou sua senha? {" "}
                  <Link to="/login" className="text-cofcoin-purple hover:underline">
                    Voltar para login
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
