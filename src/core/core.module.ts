import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [CommentsModule, UsersModule, RolesModule, PostsModule]
})
export class CoreModule {}
