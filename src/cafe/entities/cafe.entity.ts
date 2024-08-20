import { ApiProperty } from "@nestjs/swagger";

export class Cafe {
    @ApiProperty({
        type: Number,
        description: "Cafe ID",
        example: 1,
        nullable: false,
        required: true,
    })
    id: number;

    @ApiProperty({
        type: String,
        description: "Cafe Name",
        example: "Kopi Kenangan",
        nullable: false,
        required: true,
    })
    name: string;

    @ApiProperty({
        type: String,
        description: "Cafe Address",
        example: "Jl. Boulevard Raya Blok QJ1 No. 19, Kelapa Gading, Jakarta Utara",
        nullable: false,
        required: true,
    })
    address: string;

    @ApiProperty({
        type: String,
        description: "Cafe Phone",
        example: "081234567890",
        nullable: false,
        required: true,
    })
    phoneNumber: string;

    @ApiProperty({
        type: Number,
        description: "Owner ID",
        example: 1,
        nullable: false,
        required: true,
    })
    ownerId: number;

    @ApiProperty({
        type: Number,
        description: "Manager ID",
        example: 1,
        nullable: true,
        required: false,
    })
    managerId: number;
}