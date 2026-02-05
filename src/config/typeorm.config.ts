import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { join } from 'path';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: dbConfig.type,
	host: dbConfig.host,
	port: dbConfig.port,
	username: 'postgres',
	password: 'postgres',
	database: dbConfig.database,
	entities: [join(__dirname, '/..', '/**', '/*.entity{.ts,.js}')],
	synchronize: dbConfig.synchronize,
	logging: true,
};
