# Frontend документация

- Здесь можно найти основную информация по установке фронтенда мониторинга за аквакультурой и его функциональных аспектах.

- Backend репозиторий мониторинга за аквакультурой https://github.com/noobweer/fishfarm-backend

### **Установка на Windows**

1. **Скачайте Node.js:**
   - Официальный сайт https://nodejs.org/
2. **Клонируйте проект с GitHub:**

   ```bash
   git clone https://github.com/noobweer/fishfarm-frontend.git
   cd fishfarm-frontend
   ```

3. **Установка зависимостей**
   ```bash
   npm install
   ```
4. **Запуск проекта в тестовом виде**
   ```bash
   npm run dev
   ```

### **Установка на Ubuntu**

1. **Скачайте Node.js:**
   ```bash
   sudo apt-get install -y nodejs
   ```
2. **Клонируйте проект с GitHub:**
   ```bash
   git clone https://github.com/noobweer/fishfarm-frontend.git
   cd fishfarm-frontend
   ```
3. **Установка зависимостей**
   ```bash
   npm install
   ```
4. **Запуск проекта в тестовом виде**
   ```bash
   npm run dev
   ```
5. **Сделайте сборку проекта**
   ```bash
   npm run build
   ```
6. **Настройка Nginx**

   ```bash
   sudo apt install nginx
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

   Создайте конфигурационный файл для вашего проекта:

   ```bash
   sudo nano /etc/nginx/sites-available/fishfarm
   ```

   Конфигурация:

   ```bash
   server {
       listen 80;
       server_name your-domain.com;

       root /path/to/fishfarm-frontend/dist;
       index index.html;

       location / {
           try_files $uri /index.html;
       }
   }
   ```

   Создайте символическую ссылку:

   ```bash
   sudo ln -s /etc/nginx/sites-available/fishfarm /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### **Общая информации по проекту**

- При открытие сайта, выполняется функция, которая проверяет наличие токенов авторизации в localStorage, если они есть, то пользователь сотается на странице выбора бассейнов и делаются запросы на бэкенд для получения данных о бассейнах.

- Если токенов в localStorage нет, то пользователя кидает на логин страницу, где он авторизуется.

- При клике на нужный бассейн, делаются дополнительные запросы на бэк, которые получают данные по датчикам.

- Трансояция работает через библиотеку, которая поддерживает формат hls и принимает по ссылке, которая ведет на сервер. Сервер выдает лишь медиа-файлы на фронтенд.
