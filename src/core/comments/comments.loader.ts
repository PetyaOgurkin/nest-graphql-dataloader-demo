import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';

@Injectable()
export default class CommentsLoader {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  public readonly batchAuthors = new DataLoader(async (authorIds: number[]) => {
    const authors = await this.usersService.findByIds(authorIds);
    return authorIds.map((authorId) =>
      authors.find((user) => user.id === authorId),
    );
  });

  public readonly batchPosts = new DataLoader(async (postIds: number[]) => {
    const posts = await this.postsService.findByIds(postIds);
    return postIds.map((postId) => posts.find((post) => post.id === postId));
  });
}
