import { DataSource, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository extends Repository<Category> {

	constructor(private dataSource: DataSource) {
		// Pass the Entity and EntityManager to the base Repository
		super(Category, dataSource.createEntityManager());
	}
}
