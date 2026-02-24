import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiBody,
	ApiQuery,
	ApiResponse,
} from '@nestjs/swagger';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthUserLoginDto } from './dto/auth-user-login.dto';
import { ReturnUser } from './dto/index.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('/signup')
	@ApiOperation({
		description: 'Register new user',
		summary: 'User registration',
	})
	@ApiBody({
		type: AuthCredentialsDto,
	})
	signUp(
		@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
	): Promise<ReturnUser> {
		return this.authService.signUp(authCredentialsDto);
	}

	@Post('/signin')
	@ApiOperation({
		description: 'Login a user',
		summary: 'User login',
	})
	@ApiBody({
		type: AuthUserLoginDto,
	})
	@ApiResponse({
		status: 200,
		description: 'Login successful',
		schema: {
			type: 'object',
			properties: {
				token: {
					type: 'string',
					example:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE2MDAwMDAwMDB9.example',
					description: 'JWT token to use for authenticated requests',
				},
				username: {
					type: 'string',
					example: 'johndoe',
				},
				id: {
					type: 'number',
					example: 1,
				},
			},
		},
	})
	signIn(
		@Body(ValidationPipe) authUserLoginDto: AuthUserLoginDto,
	): Promise<{ token: string; username: string; id: number }> {
		return this.authService.signIn(authUserLoginDto);
	}
}
