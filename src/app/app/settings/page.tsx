
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Shield, KeyRound, Trash2, Save } from 'lucide-react';

const settingsFormSchema = z.object({
  hidePhotos: z.boolean().default(false),
  limitVisibility: z.boolean().default(false),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine(data => {
    if(data.newPassword || data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
    }
    return true;
}, {
    message: "New passwords do not match.",
    path: ["confirmPassword"],
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const defaultValues: Partial<SettingsFormValues> = {
  hidePhotos: false,
  limitVisibility: false,
};

export default function SettingsPage() {
    const { toast } = useToast();

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues,
        mode: "onChange",
    });

    function onSubmit(data: SettingsFormValues) {
        console.log(data);
        toast({
            title: "Settings Saved!",
            description: "Your privacy and account settings have been updated.",
        });
    }

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div>
                <h1 className="text-3xl font-headline font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account and privacy settings.</p>
            </div>

             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Shield /> Privacy Settings</CardTitle>
                            <CardDescription>Control who can see your profile and photos.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <FormField
                                control={form.control}
                                name="hidePhotos"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Hide Photos</FormLabel>
                                            <FormDescription>
                                                Only show your photos to members you connect with.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="limitVisibility"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Limit Profile Visibility</FormLabel>
                                            <FormDescription>
                                                Only allow verified members to view your profile.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                     <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><KeyRound/> Change Password</CardTitle>
                             <CardDescription>For your security, we recommend using a strong password.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    
                    <div className="flex justify-end pt-4">
                        <Button type="submit" size="lg"><Save className="mr-2 h-4 w-4"/> Save Settings</Button>
                    </div>
                </form>
            </Form>

             <Card className="shadow-lg border-destructive">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive"><Trash2/> Delete Account</CardTitle>
                    <CardDescription>Permanently delete your account and all associated data.</CardDescription>
                </CardHeader>
                <CardContent>
                   <p className="text-sm text-muted-foreground mb-4">This action is irreversible. All your profile data, messages, and matches will be permanently removed. Please be certain before you proceed.</p>
                   <Button variant="destructive">I understand, delete my account</Button>
                </CardContent>
            </Card>

        </div>
    );
}
