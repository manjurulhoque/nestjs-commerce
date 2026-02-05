import { Repository, EntityRepository } from 'typeorm';
import {
	ConflictException,
	InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthUserLoginDto } from './dto/auth-user-login.dto';
import { Logger } from '@nestjs/common';
import { ReturnUser } from './dto/index.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	logger = new Logger('UserRepository');

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<ReturnUser> {
		const { username, password } = authCredentialsDto;

		const user = new User();
		user.username = username;
		user.salt = await bcrypt.genSalt();
		user.password = await this.hashPassword(password, user.salt);

		try {
			await user.save();
			this.logger.log('Saving user to Database');
			return user;
		} catch (error) {
			if (error.code === '23505') {
				// duplicate username
				throw new ConflictException('Username already exists');
			} else {
				throw new InternalServerErrorException();
			}
		}
	}

	async validateUserPassword(
		authUserLoginDto: AuthUserLoginDto,
	): Promise<string> {
		const { username, password } = authUserLoginDto;
		const user = await this.findOneBy({ username });

		if (user && (await user.validatePassword(password))) {
			return user.username;
		} else {
			return null;
		}
	}

	private async hashPassword(
		password: string,
		salt: string,
	): Promise<string> {
		return bcrypt.hash(password, salt);
	}
}
