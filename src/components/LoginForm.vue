<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast/use-toast';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import apiClient from '@/services/authService';
import { checkAuthInitData } from '@/services/authChecker';

const username = ref('');
const password = ref('');
const router = useRouter();
const { toast } = useToast();

// Функция для авторизации
const login = async () => {
  if (!username.value.trim() || !password.value.trim()) {
    toast({
      title: 'Ошибка при авторизации',
      description: 'Имя пользователя и пароль обязательны.',
      variant: 'destructive',
    });
    return;
  }

  try {
    const response = await apiClient.post('login/', {
      username: username.value,
      password: password.value,
    });

    if (response.data.access && response.data.refresh) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      checkAuthInitData();
      router.push('/');
    }
  } catch (error) {
    console.error(error);

    toast({
      title: 'Ошибка при авторизации',
      description: 'Неверное имя пользователя или пароль.',
      variant: 'destructive',
    });
  }
};
</script>

<template>
  <div>
    <Card class="w-[412px]">
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
        <CardDescription>
          Введите данные ниже, чтобы войти в учетную запись.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-4" @submit.prevent="login">
          <!-- Поле для ввода имени пользователя -->
          <div class="flex flex-col space-y-1.5">
            <Label for="username">Имя пользователя</Label>
            <Input
              id="username"
              type="text"
              placeholder="ExampleName"
              v-model="username"
            />
          </div>

          <!-- Поле для ввода пароля -->
          <div class="flex flex-col space-y-1.5">
            <Label for="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              v-model="password"
            />
          </div>

          <!-- Кнопка "Войти" внутри формы -->
          <Button type="submit" class="w-full">Войти</Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped></style>
