import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class CreateProductDTO {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsNumber()
	@Type(() => Number)
	price: number;

	@IsNumber()
	@Type(() => Number)
	category_id: number;
}
