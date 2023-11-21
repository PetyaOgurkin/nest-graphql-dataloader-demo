import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/core/posts/entities/post.entity';
import { User } from 'src/core/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  text: string;

  @Column()
  @Field(() => Int)
  authorId: number;

  @Column()
  @Field(() => Int)
  postId: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'author_id' })
  @Field(() => User)
  author: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  @Field(() => Post)
  post: Post;
}
