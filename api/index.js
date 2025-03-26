
// This file serves as the entry point for our NestJS backend
// For now, we're implementing a simple backend for our shoe e-commerce
// In a proper monorepo setup, this would be in a separate package

const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./src/app.module');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for frontend requests
  await app.listen(3000);
  console.log('NestJS backend running on port 3000');
}

bootstrap().catch(err => console.error('Failed to start NestJS backend:', err));
