import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(CategoryRepository)
		private categoryRepository: CategoryRepository,
	) {}

	public async create(
		createCategoryDto: CreateCategoryDto,
	): Promise<Category> {
		return await this.categoryRepository.save(createCategoryDto);
	}

	public async findAll(): Promise<Category[]> {
		return await this.categoryRepository.find();
	}

	findOne(id: number) {
		return `This action returns a #${id} category`;
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return `This action updates a #${id} category`;
	}

	remove(id: number) {
		return `This action removes a #${id} category`;
	}
}
