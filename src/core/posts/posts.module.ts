import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from '../comments/comments.module';
import { UsersModule } from '../users/users.module';
import { Post } from './entities/post.entity';
import PostsLoader from './posts.loader';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    forwardRef(() => UsersModule),
    forwardRef(() => CommentsModule),
  ],
  providers: [PostsResolver, PostsService, PostsLoader],
  exports: [PostsService],
})
export class PostsModule {}
