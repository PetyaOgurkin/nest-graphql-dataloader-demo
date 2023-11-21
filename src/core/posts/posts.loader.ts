import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { CommentsService } from '../comments/comments.service';
import { UsersService } from '../users/users.service';

@Injectable()
export default class PostsLoader {
  constructor(
    private readonly usersService: UsersService,
    private readonly commentsService: CommentsService,
  ) {}

  public readonly batchAuthors = new DataLoader(
    async (authorsIds: number[]) => {
      const authors = await this.usersService.findByIds(authorsIds);
      return authorsIds.map((authorsId) =>
        authors.find((author) => author.id === authorsId),
      );
    },
  );

  public readonly batchComments = new DataLoader(async (postIds: number[]) => {
    const comments = await this.commentsService.findByPostIds(postIds);
    return postIds.map((postId) =>
      comments.filter((comment) => comment.postId === postId),
    );
  });
}
