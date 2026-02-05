import {
	BaseEntity,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Column } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImage extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: string;

	@Column({ type: 'int' })
	product_id!: number;

	@Column()
	image_url!: string;

	@ManyToOne(() => Product, (product) => product.images)
	@JoinColumn({
		name: 'product_id',
	})
	product: Product;
}
