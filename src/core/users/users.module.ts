import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import UsersLoader from './users.loader';
import { RolesModule } from '../roles/roles.module';
import { PostsModule } from '../posts/posts.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => PostsModule),
    forwardRef(() => CommentsModule),
    RolesModule,
  ],
  providers: [UsersResolver, UsersService, UsersLoader],
  exports: [UsersService],
})
export class UsersModule {}
