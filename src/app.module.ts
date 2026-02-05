import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfig),
		AuthModule,
		ProductsModule,
		CategoriesModule,
	],
	controllers: [AppController],
})
export class AppModule {}
