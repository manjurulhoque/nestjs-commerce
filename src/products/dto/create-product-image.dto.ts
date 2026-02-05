import { IsString, IsNumber } from 'class-validator';

export class CreateProductImageDTO {
	@IsNumber()
	product_id: number;

	@IsString()
	image_url: string = ' ';
}
