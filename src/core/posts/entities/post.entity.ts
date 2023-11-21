import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/core/comments/entities/comment.entity';
import { User } from 'src/core/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  text: string;

  @Column()
  @Field(() => Int)
  authorId: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  @Field(() => User)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];
}
