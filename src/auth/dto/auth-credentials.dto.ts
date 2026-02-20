import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
	@ApiProperty({
		description: 'Username for registration',
		example: 'johndoe',
		minLength: 3,
		maxLength: 20,
	})
	@IsString()
	@MinLength(3)
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
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'password too weak',
	})
	password: string;
}
