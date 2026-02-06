import { Repository, DataSource } from 'typeorm';
import { CreateProductImageDTO } from './dto/create-product-image.dto';
import { ProductImage } from './product-image.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductImageRepository extends Repository<ProductImage> {

	constructor(private dataSource: DataSource) {
		// Pass the Entity and EntityManager to the base Repository
		super(ProductImage, dataSource.createEntityManager());
	}

	public async createProductImage(
		createProductImageDto: CreateProductImageDTO,
	): Promise<ProductImage> {
		const { product_id, image_url } = createProductImageDto;
		const productImage = new ProductImage();
		productImage.product_id = product_id;
		productImage.image_url = image_url;
		await productImage.save();
		return productImage;
	}
}
