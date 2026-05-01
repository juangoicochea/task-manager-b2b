import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Team } from "../team/team.entity";
import { Task } from "../task/task.entity";

export enum UserRole {
    ADMIN = 'ADMIN',
    PROCESS_LEADER = 'PROCESS_LEADER',
    COLLABORATOR = 'COLLABORATOR',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    auth0Id: string;

    @Column({ length: 100 })
    firstname: string;

    @Column({ length: 100 })
    lastname: string;

    @Column({ unique: true })
    email: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.COLLABORATOR,
    })
    userRole: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Team, (team) => team.members)
    teams: Team[];

    @OneToMany(() => Task, (task) => task.assignee)
    assignedTasks: Task[];

    @OneToMany(() => Task, (task) => task.createdBy)
    createdTasks: Task[];
}