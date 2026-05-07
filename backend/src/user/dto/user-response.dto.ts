import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../user.entity";

export class UserResponseDto {

    @ApiProperty()
    id: string;

    @ApiProperty()
    firstname: string;

    @ApiProperty()
    lastname: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ enum: UserRole })
    userRole: UserRole;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
    
}