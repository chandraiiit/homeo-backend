import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Remedy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}