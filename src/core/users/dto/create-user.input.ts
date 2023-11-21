import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field(() => [Int], {
    nullable: true,
  })
  roles?: number[];
}
