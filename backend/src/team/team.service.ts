import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../user/user.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {

    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
        private readonly usersService: UsersService,
    ) { }

    async create(createTeamDto: CreateTeamDto): Promise<Team> {
        const existingTeam = await this.teamRepository.findOne({
            where: { name: createTeamDto.name },
        });

        if (existingTeam) {
            throw new ConflictException('A team with this name already exists.');
        }

        const team = this.teamRepository.create(createTeamDto);
        return this.teamRepository.save(team);
    }

    async findAll(): Promise<Team[]> {
        return this.teamRepository.find({
            relations: ['members'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Team> {
        const team = await this.teamRepository.findOne({
            where: { id },
            relations: ['members', 'tasks'],
        });

        if (!team) {
            throw new NotFoundException(`Team with id ${id} not found`);
        }

        return team;
    }

    async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
        const team = await this.findOne(id);

        if (updateTeamDto.name && updateTeamDto.name !== team.name) {
            const nameTaken = await this.teamRepository.findOne({
                where: { name: updateTeamDto.name },
            });

            if (nameTaken) {
                throw new ConflictException('A team with this name already exists.')
            }
        }

        Object.assign(team, UpdateTeamDto);
        return this.teamRepository.save(team);
    }

    async remove(id: string): Promise<void> {
        const team = await this.findOne(id);
        await this.teamRepository.remove(team);
    }

    async addMember(teamId: string, userId: string): Promise<Team> {
        const team = await this.findOne(teamId);
        const user = await this.usersService.findOne(userId);

        const alreadyMember = team.members.some((member) => member.id === userId);

        if (alreadyMember) {
            throw new ConflictException('User is already a member of this team');
        }

        team.members.push(user);
        return this.teamRepository.save(team);
    }

    async removeMember(teamId: string, userId: string): Promise<Team> {
        const team = await this.findOne(teamId);

        const isMember = team.members.some((member) => member.id === userId);

        if (!isMember) {
            throw new NotFoundException('User is not a member of this team');
        }

        team.members = team.members.filter((member) => member.id !== userId);
        return this.teamRepository.save(team);
    }

}
