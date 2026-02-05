import { Product } from 'src/products/product.entity';
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Index(['id'])
export class Category {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	// @Column({ type: 'int' })
	// product_id: number;

	@OneToMany(() => Product, (product) => product.category, { eager: true })
	// @JoinColumn({
	//     name: 'product_id'
	// })
	products: Product[];
}
