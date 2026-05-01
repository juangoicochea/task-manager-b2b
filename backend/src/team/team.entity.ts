import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Task } from "../task/task.entity";

@Entity('teams')
export class Team {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 150 })
    name: string;

    @Column({ nullable: true, length: 255 })
    description: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => User, (user) => user.teams)
    @JoinTable({
        name: 'team_members',
        joinColumn: { name: 'team_id' },
        inverseJoinColumn: { name: 'user_id' }
    })
    members: User[];

    @OneToMany(() => Task, (task) => task.team)
    tasks: Task[];
}