import { IsBoolean, IsInt, IsString } from "class-validator";

export class CreateMenuDto {
    @IsString()
    name: string;
    
    @IsInt()
    price: number;
    
    @IsBoolean()
    isRecommended: boolean;

    @IsInt()
    cafeId: number;
}