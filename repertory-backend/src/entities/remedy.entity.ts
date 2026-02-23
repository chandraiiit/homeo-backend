import { RubricRemedy } from 'src/entities/rubric-remedy.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity('remedy')
@Unique(['name'])
export class Remedy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(
    () => RubricRemedy,
    (rubricRemedy) => rubricRemedy.remedy,
  )
  rubricRemedies: RubricRemedy[];
}