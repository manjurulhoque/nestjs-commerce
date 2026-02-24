import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConsoleLogger, Logger } from '@nestjs/common';

const serverConfig = config.get('server');

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new ConsoleLogger({
			json: true,
		}),
	});

	const config = new DocumentBuilder()
		.setTitle('NestJS E-commerce API')
		.setDescription('E-commerce API')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document, {
		swaggerOptions: { defaultModelsExpandDepth: -1 },
	});

	await app.listen(serverConfig.port);

	const logger = new Logger('bootstrap');
	logger.log(`Server is running on ${await app.getUrl()}`);
}
bootstrap();
