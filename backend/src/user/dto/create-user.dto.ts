import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { UserRole } from "../user.entity";

export class CreateUserDto {

    @ApiProperty({ example: 'Juan' })
    @IsString()
    @Length(1, 100)
    firstname: string;

    @ApiProperty({ example: 'Goicochea' })
    @IsString()
    @Length(1, 100)
    lastname: string;

    @ApiProperty({ example: 'juan@company.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'auth0|64f3c' })
    @IsString()
    auth0Id: string;

    @ApiPropertyOptional({ enum: UserRole, default: UserRole.COLLABORATOR })
    @IsEnum(UserRole)
    @IsOptional()
    userRole?: UserRole;
}