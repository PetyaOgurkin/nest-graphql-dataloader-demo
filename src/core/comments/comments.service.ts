import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
  ) {}

  create(createCommentInput: CreateCommentInput) {
    const comment = this.commentsRepository.create(createCommentInput);
    return this.commentsRepository.save(comment);
  }

  findAll() {
    return this.commentsRepository.find();
  }

  findOne(id: number) {
    return this.commentsRepository.findOneByOrFail({ id });
  }

  findByAuthorIds(ids: number[]) {
    return this.commentsRepository.find({ where: { authorId: In(ids) } });
  }

  findByPostIds(ids: number[]) {
    return this.commentsRepository.find({ where: { postId: In(ids) } });
  }

  async update(id: number, updateCommentInput: UpdateCommentInput) {
    const comment = await this.findOne(id);
    return this.commentsRepository.save({ ...comment, ...updateCommentInput });
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    await this.commentsRepository.delete({ id });
    return comment;
  }
}
