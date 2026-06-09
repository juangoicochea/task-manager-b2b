import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class CreateTeamDto {

    @ApiProperty({ example: 'Engineering' })
    @IsString()
    @Length(1, 100)
    name: string;

    @ApiPropertyOptional({ example: 'Main product development team' })
    @IsOptional()
    @IsString()
    @Length(1, 255)
    description?: string;
}