import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryRepository } from './categories.repository';
import { Category } from './entities/category.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Category]), AuthModule],
	controllers: [CategoriesController],
	providers: [CategoriesService, CategoryRepository],
})
export class CategoriesModule { }
