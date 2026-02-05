import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductImageDTO } from './dto/create-product-image.dto';
import { ProductImage } from './product-image.entity';
import { ProductImageRepository } from './product-image.repository';

@Injectable()
export class ProductImageService {
	constructor(
		@InjectRepository(ProductImageRepository)
		private productImageRepository: ProductImageRepository,
	) {}

	public async createProductImage(
		createProductImageDto: CreateProductImageDTO,
	): Promise<ProductImage> {
		return await this.productImageRepository.createProductImage(
			createProductImageDto,
		);
	}
}
