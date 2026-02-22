import { Remedy } from "src/remedies/remedy.entity";
import { Rubric } from "src/rubrics/rubric.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RubricRemedy {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rubric)
  rubric: Rubric;

  @ManyToOne(() => Remedy)
  remedy: Remedy;

  @Column()
  grade: number;
}