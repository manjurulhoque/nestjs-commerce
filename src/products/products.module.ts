import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductImageRepository } from './product-image.repository';
import { ProductImageService } from './product-image.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ProductRepository, ProductImageRepository]),
		AuthModule,
	],
	controllers: [ProductController],
	providers: [ProductService, ProductImageService],
})
export class ProductsModule {}
