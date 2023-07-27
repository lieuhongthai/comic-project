import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
  /**
   * How to use User decorator
   * Usage 1 :
   * @Get()
   * async findOne(@User() user: UserEntity) {
   * 	console.log(user);
   * }
   *
   * Usage 2:
   * @Get()
   * async findOne(
   * 	@User(new ValidationPipe({ validateCustomDecorators: true }))
   * 	user: UserEntity,
   * ) {
   * 	console.log(user);
   * }
   */
);
