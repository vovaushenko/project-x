import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { IAVXUser } from '@project-x/model';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findCurrentUser(@AuthUser() user: IAVXUser) {
    return this.usersService.getUserInfoById(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateCurrentUser(
    @AuthUser() user: IAVXUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserInfoById(user.id, updateUserDto);
  }
}
