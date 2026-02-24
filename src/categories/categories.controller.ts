import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guards/roles.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
	constructor(private categoriesService: CategoriesService) { }

	@Get()
	public async findAll(): Promise<Category[]> {
		return await this.categoriesService.findAll();
	}

	@Post()
	@UseGuards(AuthGuard(), AdminGuard)
	@ApiBearerAuth('JWT-auth')
	public async create(
		@Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
	): Promise<Category> {
		return await this.categoriesService.create(createCategoryDto);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.categoriesService.findOne(+id);
	}

	@Put(':id')
	update(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		return this.categoriesService.update(+id, updateCategoryDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoriesService.remove(+id);
	}
}
