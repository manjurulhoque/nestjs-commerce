import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ReturnUser } from './dto/index.dto';

export const GetUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): ReturnUser => {
		const req = ctx.switchToHttp().getRequest();
		return req.user;
	},
);
