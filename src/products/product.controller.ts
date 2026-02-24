import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Delete,
	Param,
	Patch,
	Body,
	ValidationPipe,
	Post,
	UseGuards,
	UploadedFiles,
	UseInterceptors,
	Logger,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './product.entity';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiConsumes,
	ApiCreatedResponse,
	ApiTags,
	ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { ReturnUser } from 'src/auth/dto/index.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { productImagesConfig } from './product-images.config';
import { ProductImageService } from './product-image.service';
import { CreateProductImageDTO } from './dto/create-product-image.dto';
import { AdminGuard } from 'src/auth/guards/roles.guard';

@Controller('products')
@ApiTags('products')
export class ProductController {
	private readonly logger = new Logger(ProductController.name);

	constructor(
		private productService: ProductService,
		private productImageService: ProductImageService,
	) { }

	@Post('')
	@UseGuards(AuthGuard(), AdminGuard)
	@ApiBearerAuth('JWT-auth')
	@UseInterceptors(FilesInterceptor('images', 20, productImagesConfig))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				name: {
					type: 'string',
					description: 'The name of the product',
					example: 'Product 1',
				},
				description: {
					type: 'string',
					description: 'The description of the product',
					example: 'This is a product description',
				},
				price: {
					type: 'number',
					description: 'The price of the product',
					example: 100,
				},
				category_id: {
					type: 'number',
					description: 'The category id of the product',
					example: 1,
				},
				images: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary',
					},
				},
			},
			required: ['images', 'name', 'description', 'price', 'category_id'],
		},
	})
	@ApiBadRequestResponse()
	public async create(
		@UploadedFiles() images,
		@Body(ValidationPipe) createProductDto: CreateProductDTO,
	): Promise<Product> {
		const newProduct = await this.productService.createProduct(createProductDto);
		for (const image of images) {
			const productImageDto = new CreateProductImageDTO();
			productImageDto.image_url = image.path;
			productImageDto.product_id = newProduct.id;
			const productImage = await this.productImageService.createProductImage(productImageDto);
		}
		return newProduct;
	}

	@Get('')
	public async getAll(@GetUser() user: ReturnUser): Promise<Product[]> {
		const products = await this.productService.getProducts();
		return products;
	}

	@Patch('/edit/:id')
	@UseGuards(AuthGuard())
	@ApiBearerAuth('JWT-auth')
	@UseInterceptors(FilesInterceptor('images', 20, productImagesConfig))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				name: {
					type: 'string',
					description: 'The name of the product',
					example: 'Product 1',
				},
				description: {
					type: 'string',
					description: 'The description of the product',
					example: 'This is a product description',
				},
				price: {
					type: 'number',
					description: 'The price of the product',
					example: 100,
				},
				category_id: {
					type: 'number',
					description: 'The category id of the product',
					example: 1,
				},
				images: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary',
					},
				},
			},
			required: ['name', 'description', 'price', 'category_id'],
		},
	})
	@ApiBadRequestResponse()
	public async edit(
		@Body(ValidationPipe) createProductDto: CreateProductDTO,
		@Param('id') id: number,
	): Promise<Product> {
		const product = await this.productService.editProduct(
			id,
			createProductDto,
		);
		return product;
	}

	@Delete('/delete/:id')
	@UseGuards(AuthGuard())
	@ApiBearerAuth('JWT-auth')
	public async deleteById(@Param('id') productId: number) {
		const deleted = await this.productService.deleteProduct(productId);
		return deleted;
	}

	@Get('/:productId')
	public async getProduct(@Param('productId') id: number) {
		const product = await this.productService.getProduct(id);
		return product;
	}
}
