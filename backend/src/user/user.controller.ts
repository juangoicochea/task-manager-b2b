import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('user')
export class UserController {

    constructor(private readonly userService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create new user' })
    @ApiResponse({ status: 201, type: UserResponseDto })
    @ApiResponse({ status: 409, description: 'Email already exists '})
    create(@Body() createUSerDto: CreateUserDto) {
        return this.userService.create(createUSerDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [UserResponseDto] })
    findAll() {
        return this.userService.findAll();
    }

    @Get('id')
    @ApiOperation({ summary: 'Get a user by id' })
    @ApiResponse({ status: 200, type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a user' })
    @ApiResponse({ status: 200, type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 409, description: 'Email already in use' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 204, description: 'User deleted succesfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    remove(@Param('id') id: string) {
        this.userService.remove(id);
    }

}
