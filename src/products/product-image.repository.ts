import { Repository, EntityRepository } from 'typeorm';
import { CreateProductImageDTO } from './dto/create-product-image.dto';
import { ProductImage } from './product-image.entity';

@EntityRepository(ProductImage)
export class ProductImageRepository extends Repository<ProductImage> {
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
