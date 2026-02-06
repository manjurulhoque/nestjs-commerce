import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductImageRepository } from './product-image.repository';
import { ProductImageService } from './product-image.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductImage } from './product-image.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Product, ProductImage]),
		AuthModule,
	],
	controllers: [ProductController],
	providers: [ProductService, ProductImageService, ProductRepository, ProductImageRepository],
})
export class ProductsModule { }
