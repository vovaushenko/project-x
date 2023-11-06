import {
  Body,
  Controller,
  Headers,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import {
  IAVXClientUser,
  ISalesRefreshTokenApiResponse,
  ISalesSignInApiResponse,
  registerUserSchema,
} from '@project-x/model';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('sign-up')
  @UsePipes(new ZodValidationPipe(registerUserSchema))
  async signUp(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<IAVXClientUser> {
    return this.usersService.create(registerUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<ISalesSignInApiResponse> {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<ISalesRefreshTokenApiResponse> {
    return this.authService.refreshAccessToken(refreshTokenDto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('invalidate-token')
  async invalidateToken(@Headers('authorization') authorization: string) {
    // TODO: improve
    const token = authorization.split(' ')[1];
    await this.authService.invalidateToken(token);
    return { message: 'Success' };
  }
}
