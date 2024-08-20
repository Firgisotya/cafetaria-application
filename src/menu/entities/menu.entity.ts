import { ApiProperty } from "@nestjs/swagger";

export class Menu {
    @ApiProperty({
        type: Number,
        description: "Menu ID",
        example: 1,
        nullable: false,
        required: true,
    })
    id: number;

    @ApiProperty({
        type: String,
        description: "Menu Name",
        example: "Caramel Macchiato",
        nullable: false,
        required: true,
    })
    name: string;

    @ApiProperty({
        type: Number,
        description: "Menu Price",
        example: 25000,
        nullable: false,
        required: true,
    })
    price: number;

    @ApiProperty({
        type: Boolean,
        description: "Menu Recommended",
        example: true,
        nullable: false,
        required: true,
    })
    isRecommended: boolean;

    @ApiProperty({
        type: Number,
        description: "Cafe ID",
        example: 1,
        nullable: false,
        required: true,
    })
    cafeId: number;
}