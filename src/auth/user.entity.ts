import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Unique,
	OneToMany,
	BeforeInsert,
	Index,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['username'])
@Index(['id'])
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column()
	salt: string;

	@Column({ type: 'bool', default: false, name: 'is_admin' })
	isAdmin: boolean;

	@ApiProperty({ example: '2021-08-10T05:59:36.708Z' })
	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	createdAt: Date;

	@ApiProperty({ example: '2021-08-10T05:59:36.708Z' })
	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	updatedAt: Date;

	@BeforeInsert()
	beforeInsert = () => {
		this.username = this.username.toLowerCase();
	};

	async validatePassword(password: string): Promise<boolean> {
		const hash = await bcrypt.hash(password, this.salt);
		return hash === this.password;
	}
}
