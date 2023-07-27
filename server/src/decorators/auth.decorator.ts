// import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
// import { Role } from 'src/database/entities/role.entity';
// import { RolesGuard } from 'src/guards/roles.guard';

// export function Auth(...roles: Role[]) {
//   return applyDecorators(
//     SetMetadata('roles', roles),
//     UseGuards(AuthGuard, RolesGuard),
//     ApiBearerAuth(),
//     ApiUnauthorizedResponse({ description: 'Unauthorized' }),
//   );
// }
// function ApiBearerAuth(): ClassDecorator | MethodDecorator | PropertyDecorator {
//   throw new Error('Function not implemented.');
// }

// function ApiUnauthorizedResponse(arg0: {
//   description: string;
// }): ClassDecorator | MethodDecorator | PropertyDecorator {
//   throw new Error('Function not implemented.');
// }
