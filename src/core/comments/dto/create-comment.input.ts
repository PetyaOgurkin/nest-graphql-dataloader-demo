import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => Int)
  authorId: number;

  @Field(() => Int)
  postId: number;

  @Field()
  text: string;
}
