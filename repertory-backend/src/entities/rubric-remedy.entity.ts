import { Remedy } from 'src/entities/remedy.entity';
import { Rubric } from 'src/entities/rubric.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity('rubric_remedy')
@Unique(['rubric', 'remedy'])
export class RubricRemedy {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rubric, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'rubric_id' })
  rubric: Rubric;

  @ManyToOne(() => Remedy, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'remedy_id' })
  remedy: Remedy;

  @Column({ type: 'int' })
  grade: number; // 1–3
}