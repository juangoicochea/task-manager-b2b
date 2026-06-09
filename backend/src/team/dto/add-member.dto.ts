import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class AddMemberDto {

    @ApiProperty({ example: '1fa4gg6...' })
    @IsUUID()
    userId: string;

}