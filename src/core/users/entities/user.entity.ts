import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/core/comments/entities/comment.entity';
import { Post } from 'src/core/posts/entities/post.entity';
import { Role } from 'src/core/roles/entities/role.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  Entity,
} from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Role)
  @JoinTable()
  @Field(() => [Role], { nullable: true })
  roles?: Role[];

  @OneToMany(() => Post, (post) => post.author)
  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];
}
