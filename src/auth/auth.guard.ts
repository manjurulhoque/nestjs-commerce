// import { CanActivate, ExecutionContext, Injectable, Scope } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthException } from './exceptions/auth.exception';
// import { JwtTokenTypeEnum } from './jwt-token-type.enum';

// @Injectable({ scope: Scope.REQUEST })
// export class AuthGuard implements CanActivate {
//     constructor(
//         private readonly authService: AuthService,
//     ) { }

//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const request = context.switchToHttp().getRequest();
//         const token = request.headers.authorization;

//         if (!token) {
//             throw AuthException.incorrectAuthorizationToken();
//         }

//         const payload = await this.authService.decodeToken(token, JwtTokenTypeEnum.token);
//         const user = await this.authService.getUserFromTokenPayload(payload);

//         request.user = user;

//         return true;
//     }
// }

import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGaurd } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends PassportAuthGaurd('jwt') {
	constructor(private readonly reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.get<boolean>(
			'isPublic',
			context.getHandler(),
		);

		if (isPublic) {
			return true;
		}

		return super.canActivate(context);
	}
}
