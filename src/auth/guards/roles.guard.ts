import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const user: User = request.user;

		return user.isAdmin;
	}
}
