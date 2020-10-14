# Angular Fox Stickers Bot

Попробовать бота [@angular_fox_sticker_bot](https://t.me/@angular_fox_sticker_bot) в telegram.

## 1. Подготовка к установке

### 1.1 Создание бота

Создать бота через бота [@BotFather](https://t.me/BotFather) и соранить его API TOKEN.

### 1.2 Настройка: Allow Groups?

Разрешить созданному боту добавляться в группы через бота [@BotFather](https://t.me/BotFather).

### 1.3 Создание трех каналов

Создать три канала в телеграмме.

1. TELEGRAM_STICKERS_CHANNEL: канал для стикеров
2. TELEGRAM_LOGGER_CHANNEL: канал для логирования сообщений
3. TELEGRAM_ERRORS_CHANNEL: канал для логирования ошибок

Добавить бота во все каналы и сделать его админом.

## 2. Установка

Бот поддерживает два режима работы, для разработки подойдет режим Polling (п. 2.1), а для продакшена неободим режим WebHook (п.2.2).

### 2.1 Polling

> Пропустите пункт, если хотите настроить WebHook

Создать и заполнить файл `.env` со следующими параметрами:
```
TELEGRAM_API_TOKEN=1111111111:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
TELEGRAM_STICKERS_CHANNEL=STICKERS_CHANNEL_ID
TELEGRAM_LOGGER_CHANNEL=LOGGER_CHANNEL_ID
TELEGRAM_ERRORS_CHANNEL=ERRORS_CHANNEL_ID
TELEGRAM_WEBHOOK_ENABLED=false
```

1. TELEGRAM_API_TOKEN — API TOKEN бота 
2. TELEGRAM_STICKERS_CHANNEL — id канала для стикеров, имеет вид -1000000000
3. TELEGRAM_LOGGER_CHANNEL — id канала для логирования сообщений, имеет вид -1000000000
4. TELEGRAM_ERRORS_CHANNEL — id канала для логирования ошибок, имеет вид -1000000000


### 2.2 WebHook

> Пропустите пункт, если хотите настроить Polling

Создать и заполнить файл `.env` со следующими параметрами:
```
TELEGRAM_API_TOKEN=1111111111:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
TELEGRAM_STICKERS_CHANNEL=STICKERS_CHANNEL_ID
TELEGRAM_LOGGER_CHANNEL=LOGGER_CHANNEL_ID
TELEGRAM_ERRORS_CHANNEL=ERRORS_CHANNEL_ID
TELEGRAM_WEBHOOK_ENABLED=true
TELEGRAM_WEBHOOK_KEY=.telegram/private.key
TELEGRAM_WEBHOOK_PEM=.telegram/public.pem
TELEGRAM_WEBHOOK_HOST=DOMAIN
TELEGRAM_WEBHOOK_PATH=RANDOM_PATH
TELEGRAM_WEBHOOK_PORT=8443
```

1. TELEGRAM_API_TOKEN — API TOKEN бота 
2. TELEGRAM_STICKERS_CHANNEL — id канала для стикеров, имеет вид -1000000000
3. TELEGRAM_LOGGER_CHANNEL — id канала для логирования сообщений, имеет вид -1000000000
4. TELEGRAM_ERRORS_CHANNEL — id канала для логирования ошибок, имеет вид -1000000000
5. TELEGRAM_WEBHOOK_KEY — пусть до файла .key
6. TELEGRAM_WEBHOOK_PEM — пусть до файла .pem
7. TELEGRAM_WEBHOOK_HOST — адрес хоста для webhook
8. TELEGRAM_WEBHOOK_PATH — путь в url для webhook
9. TELEGRAM_WEBHOOK_PORT — порт хоста для webhook

## 3. Запуск

Просто выполните команду:
```
docker-compose up -d
```

Чтобы посмотреть логи, выполните команду:
```
docker-compose logs -f
```
