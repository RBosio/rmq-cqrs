import { CreateUserDto, USER_SERVICE, UpdateUserDto } from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from '../error/error-handler.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private userClient: ClientRMQ,
    private errorHandler: ErrorHandlerService,
  ) {}

  @Get()
  findUsers() {
    return this.userClient.send({ cmd: 'findUsers' }, {});
  }

  @Get(':userId')
  findUser(@Param('userId') userId: string) {
    return this.userClient.send({ cmd: 'findUser' }, userId).pipe(
      catchError((val) => {
        this.errorHandler.handle(val);

        return val;
      }),
    );
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userClient.send({ cmd: 'createUser' }, createUserDto).pipe(
      catchError((val) => {
        this.errorHandler.handle(val);

        return val;
      }),
    );
  }

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userClient
      .send(
        { cmd: 'updateUser' },
        {
          userId,
          updateUserDto,
        },
      )
      .pipe(
        catchError((val) => {
          this.errorHandler.handle(val);

          return val;
        }),
      );
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userClient.send({ cmd: 'deleteUser' }, userId).pipe(
      catchError((val) => {
        this.errorHandler.handle(val);

        return val;
      }),
    );
  }
}
