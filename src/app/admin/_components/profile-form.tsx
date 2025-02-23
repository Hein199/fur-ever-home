"use client";
import { useFormState } from 'react-dom';
import { useAuth } from '@/context/auth-context';
import { useActionState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { updateAdmin } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ProfileFormProps {
  admin: {
    admin_name: string;
    admin_email: string;
    admin_phone: string;
  };
}

export default function ProfileForm({ admin }: ProfileFormProps) {
  const [state, formAction] = useActionState(updateAdmin, null);
  const { toast } = useToast();
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success",
        description: state.message,
      });
      router.refresh();
    } else if (state?.success === false) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, router]);

  return (
    <Card className="max-w-xs mx-auto w-full">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                defaultValue={admin.admin_name}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                defaultValue={admin.admin_email}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                defaultValue={admin.admin_phone}
              />
            </div>

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
            <Button
              type="button"
              onClick={() => logout()}
              className="w-full mt-4"
              variant="destructive"
            >
              Logout
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}