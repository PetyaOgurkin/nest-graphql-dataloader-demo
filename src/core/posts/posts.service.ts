import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  create(createPostInput: CreatePostInput) {
    const post = this.postsRepository.create(createPostInput);
    return this.postsRepository.save(post);
  }

  findAll() {
    return this.postsRepository.find();
  }

  findOne(id: number) {
    return this.postsRepository.findOneByOrFail({ id });
  }

  findByIds(ids: number[]) {
    return this.postsRepository.find({ where: { id: In(ids) } });
  }

  findByAuthorIds(ids: number[]) {
    return this.postsRepository.find({ where: { authorId: In(ids) } });
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    const post = await this.findOne(id);
    return this.postsRepository.save({ ...post, ...updatePostInput });
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    await this.postsRepository.delete({ id });
    return post;
  }
}
