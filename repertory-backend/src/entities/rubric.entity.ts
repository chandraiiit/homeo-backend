import { Chapter } from 'src/entities/chapter.entity';
import { RubricRemedy } from 'src/entities/rubric-remedy.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
  JoinColumn,
} from 'typeorm';

@Entity('rubric')
@Unique(['chapter', 'section', 'subsection', 'modality'])
export class Rubric {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chapter, (chapter) => chapter.rubrics, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chapter_id' })
  chapter: Chapter;

  @Column({ nullable: false })
  section: string;

  @Column({ nullable: true })
  subsection: string;

  @Column({ nullable: true })
  modality: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @OneToMany(
    () => RubricRemedy,
    (rubricRemedy) => rubricRemedy.rubric,
    { cascade: true },
  )
  rubricRemedies: RubricRemedy[];
}