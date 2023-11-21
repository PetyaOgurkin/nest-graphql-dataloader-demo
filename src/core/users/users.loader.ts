import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { RolesService } from '../roles/roles.service';
import { PostsService } from '../posts/posts.service';
import { CommentsService } from '../comments/comments.service';

@Injectable()
export default class UsersLoader {
  constructor(
    private readonly rolesService: RolesService,
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  public readonly batchRoles = new DataLoader(async (roleIds: number[][]) => {
    const roles = await this.rolesService.findByIds(
      Array.from(new Set(roleIds.flat())),
    );
    return roleIds.map((ids) =>
      ids.map((id) => roles.find((role) => role.id === id)),
    );
  });

  public readonly batchPosts = new DataLoader(async (userIds: number[]) => {
    const posts = await this.postsService.findByAuthorIds(userIds);
    return userIds.map((userId) =>
      posts.filter((post) => post.authorId === userId),
    );
  });

  public readonly batchComments = new DataLoader(async (userIds: number[]) => {
    const comments = await this.commentsService.findByAuthorIds(userIds);
    return userIds.map((userId) =>
      comments.filter((comment) => comment.authorId === userId),
    );
  });
}
