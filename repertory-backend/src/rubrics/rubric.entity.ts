import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Rubric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  chapter: string;
}