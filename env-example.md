# Environment Variables Örneği

Vercel dashboard'da aşağıdaki environment variables'ları ayarlayın:

## MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/garden-cicekcilik?retryWrites=true&w=majority

## JWT
JWT_SECRET=your-super-secret-jwt-key-here

## iyzico Configuration
IYZICO_API_KEY=sandbox-afXhZPW0MQlE4dCUUlHcEopnMBgXnAZI
IYZICO_SECRET_KEY=sandbox-wbwpzKJDmlBmGdO6JYXrlIYHqYJqbU1q
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
IYZICO_CALLBACK_URL=https://your-domain.vercel.app/payment/callback
IYZICO_CANCEL_URL=https://your-domain.vercel.app/payment/cancel
IYZICO_MERCHANT_ID=GardenCicekcilik
IYZICO_MERCHANT_NAME=Garden Çiçekçilik
IYZICO_MERCHANT_WEBSITE=https://gardencicekcilik.com
IYZICO_CURRENCY=TRY
IYZICO_LOCALE=tr

## Port (Vercel otomatik ayarlar)
PORT=3000 