import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookMarked } from 'lucide-react';
import { SEO } from '@/components/SEO';
const loginSchema = z.object({
  email: z.string().email({ message: 'Pros��m, zadajte platnú e-mailovú adresu.' }),
  password: z.string().min(1, { message: 'Prosím, zadajte heslo.' }),
});
type LoginFormValues = z.infer<typeof loginSchema>;
export function AdminLoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@cestabasnikov.sk',
      password: 'password123',
    },
  });
  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Prihlásenie zlyhalo.');
      }
      login(result.token);
      toast.success('Boli ste úspešne prihlásený.');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Vyskytla sa chyba.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <SEO title="Admin Login" description="Prihlásenie do administrácie Cesta básnikov." />
      <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex items-center justify-center gap-2">
              <BookMarked className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-display text-3xl">Admin Panel</CardTitle>
            <CardDescription>Prihláste sa pre správu obsahu</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="admin@example.com" {...register('email')} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Heslo</Label>
                <Input id="password" type="password" {...register('password')} />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Prihlasujem...' : 'Prihlásiť sa'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}