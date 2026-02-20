import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserLoginDto {
	@ApiProperty({
		description: 'Username for login',
		example: 'johndoe',
		minLength: 4,
		maxLength: 20,
	})
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	username: string;

	@ApiProperty({
		description: 'User password',
		example: 'Password123!',
		minLength: 8,
		maxLength: 20,
	})
	@IsString()
	@MinLength(8)
	@MaxLength(20)
	password: string;
}
