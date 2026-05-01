import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Team } from "../team/team.entity";
import { User } from "../user/user.entity";

export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progresss',
    IN_REVIEW = 'in_review',
    DONE = 'done',
}

export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical',
}

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 150 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.TODO,
    })
    status: TaskStatus;

    @Column({
        type: 'enum',
        enum: TaskPriority,
        default: TaskPriority.MEDIUM,
    })
    priority: TaskPriority;

    @Column({ type: 'date', nullable: true })
    dueDate: Date;

    @Column({ default: false })
    isArchived: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Team, (team) => team.tasks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'team_id' })
    team: Team;

    @Column({ name: 'team_id' })
    teamId: string;

    @ManyToOne(() => User, (user) => user.assignedTasks, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'user_id' })
    assignee: User;

    @Column({ name: 'userId' })
    assigneeId: string;

    @ManyToOne(() => User, (user) => user.createdTasks, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'created_by_id' })
    createdBy: User;

    @Column({ name: 'created_by_id' })
    createdById: string;
}