import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from '../posts/posts.module';
import { UsersModule } from '../users/users.module';
import CommentsLoader from './comments.loader';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => UsersModule),
    forwardRef(() => PostsModule),
  ],
  providers: [CommentsResolver, CommentsService, CommentsLoader],
  exports: [CommentsService],
})
export class CommentsModule {}
