import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
	@IsString()
	@ApiProperty({
		description: 'The name of the product',
		example: 'Product 1',
	})
	name: string;

	@IsString()
	@ApiProperty({
		description: 'The description of the product',
		example: 'This is a product description',
	})
	description: string;

	@IsNumber()
	@Type(() => Number)
	@ApiProperty({
		description: 'The price of the product',
		example: 100,
	})
	price: number;

	@IsNumber()
	@Type(() => Number)
	@ApiProperty({
		description: 'The category id of the product',
		example: 1,
	})
	category_id: number;
}
