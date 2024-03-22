import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  handle(val: { message: string; status: number }) {
    if (val.status === HttpStatus.BAD_REQUEST) {
      throw new BadRequestException(val.message);
    }

    if (val.status === HttpStatus.UNAUTHORIZED) {
      throw new UnauthorizedException(val.message);
    }

    if (val.status === HttpStatus.NOT_FOUND) {
      throw new NotFoundException(val.message);
    }
  }
}
