import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthUserLoginDto } from './dto/auth-user-login.dto';
import { ReturnUser } from './dto/index.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

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
	signIn(
		@Body(ValidationPipe) authUserLoginDto: AuthUserLoginDto,
	): Promise<{ token: string; username: string; id: number }> {
		return this.authService.signIn(authUserLoginDto);
	}
}
