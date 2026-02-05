import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { AuthUserLoginDto } from './dto/auth-user-login.dto';
import { ReturnUser } from './dto/index.dto';
import { AuthTokenPayloadDTO } from './dto/auth-token-payload.dto';
import { JwtTokenTypeEnum } from './jwt-token-type.enum';
import { AuthException } from './exceptions/auth.exception';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class AuthService {
	private logger = new Logger('AuthService');

	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
		private jwtService: JwtService,
	) {}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<ReturnUser> {
		return this.userRepository.signUp(authCredentialsDto);
	}

	async signIn(
		authCredentialsDto: AuthUserLoginDto,
	): Promise<{ token: string; username: string; id: number }> {
		let { username } = authCredentialsDto;
		const found = await this.userRepository.findOneBy({ username });
		let token;
		{
			// tslint:disable-next-line:no-shadowed-variable
			const username =
				await this.userRepository.validateUserPassword(
					authCredentialsDto,
				);

			if (!username) {
				throw new UnauthorizedException('Invalid credentials');
			}

			const payload: JwtPayload = { username };
			token = await this.jwtService.sign(payload);
			this.logger.debug(
				`Generated JWT Token with payload ${JSON.stringify(payload)}`,
			);
		}

		username = found.username;
		const id = found.id;

		return { token, username, id };
	}

	public async getUserFromTokenPayload(
		payload: AuthTokenPayloadDTO,
	): Promise<ReturnUser> {
		return await this.userRepository.findOneBy({
			username: payload.username,
		});
	}

	public async decodeToken(
		token: string,
		tokenType: JwtTokenTypeEnum,
	): Promise<AuthTokenPayloadDTO | any> {
		if (tokenType === JwtTokenTypeEnum.refreshToken) {
			// secret = this.configService.get(EnvKeyEnum.JWTRefreshSecretKey);
		}

		token = token.replace('Bearer ', '');

		try {
			return this.jwtService.verify(token);
		} catch (err) {
			throw AuthException.incorrectAuthorizationToken();
		}
	}
}
