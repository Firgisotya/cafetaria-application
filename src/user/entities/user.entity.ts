import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class User {
    @ApiProperty({
        type: Number,
        description: "User ID",
        example: 1,
        nullable: false,
        required: true,
    })
    id: number;

    @ApiProperty({
        type: String,
        description: "Username",
        example: "admin",
        nullable: false,
        required: true,
    })
    username: string;

    @ApiProperty({
        type: String,
        description: "Fullname",
        example: "Admin",
        nullable: false,
        required: true,
    })
    fullname: string;

    @Exclude()
    password: string;

    @ApiProperty({
        type: String,
        description: "Role (SUPERADMIN, MANAGER, OWNER)",
        example: "SUPERADMIN",
        nullable: false,
        required: true,
    })
    role: string;
}