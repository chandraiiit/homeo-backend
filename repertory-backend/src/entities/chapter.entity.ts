import { Rubric } from 'src/entities/rubric.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity('chapter')
@Unique(['name'])
export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Rubric, (rubric) => rubric.chapter, {
    cascade: true,
  })
  rubrics: Rubric[];
}