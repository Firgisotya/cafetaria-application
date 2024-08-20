import { IsInt, IsString, Matches } from 'class-validator';

export class CreateCafeDto {
    @IsString()
    name: string;
    
    @IsString()
    address: string;
    
    @IsString()
    @Matches(/^\+62\d+$/)
    phoneNumber: string;
    
    @IsInt()
    ownerId: number;
    
    @IsInt()
    managerId?: number;
}