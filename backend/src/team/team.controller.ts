import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { TeamsService } from './team.service';

@ApiTags('teams')
@ApiBearerAuth()
@Controller('teams')
export class TeamsController {

    constructor(private readonly teamsService: TeamsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new team' })
    @ApiResponse({ status: 201, description: 'Team created successfully' })
    @ApiResponse({ status: 409, description: 'Team name already exists' })
    create(@Body() createTeamDto: CreateTeamDto) {
        return this.teamsService.create(createTeamDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all teams' })
    @ApiResponse({ status: 200, description: 'List of all teams' })
    findAll() {
        return this.teamsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a team by id' })
    @ApiResponse({ status: 200, description: 'Team found' })
    @ApiResponse({ status: 404, description: 'Team not found' })
    findOne(@Param('id') id: string) {
        return this.teamsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a team' })
    @ApiResponse({ status: 200, description: 'Team updated successfully' })
    @ApiResponse({ status: 404, description: 'Team not found' })
    @ApiResponse({ status: 409, description: 'Team name already in use' })
    update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
        return this.teamsService.update(id, updateTeamDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a team' })
    @ApiResponse({ status: 204, description: 'Team deleted successfully' })
    @ApiResponse({ status: 404, description: 'Team not found' })
    remove(@Param('id') id: string) {
        return this.teamsService.remove(id);
    }

    @Post(':id/members')
    @ApiOperation({ summary: 'Add a member to a team' })
    @ApiResponse({ status: 201, description: 'Member added successfully' })
    @ApiResponse({ status: 404, description: 'Team or user not found' })
    @ApiResponse({ status: 409, description: 'User already a member' })
    addMember(@Param('id') id: string, @Body() addMemberDto: AddMemberDto) {
        return this.teamsService.addMember(id, addMemberDto.userId);
    }

    @Delete(':id/members/:userId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remove a member from a team' })
    @ApiResponse({ status: 204, description: 'Member removed successfully' })
    @ApiResponse({ status: 404, description: 'Team or user not found' })
    removeMember(@Param('id') id: string, @Param('userId') userId: string) {
        return this.teamsService.removeMember(id, userId);
    }
}