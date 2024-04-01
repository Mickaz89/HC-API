import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export enum Languages {
  ENGLISH = 'english',
  DEUTSH = 'deutsh',
  FRANÇAIS = 'français',
  ESPERANTO = 'esperanto',
  LATIN = 'latin',
}

export class CreateFormDto {
  @IsString()
  given_name: string;

  @IsString()
  family_name: string;

  @IsOptional()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2: string;

  @IsString()
  house_number: string;

  @IsString()
  postcode: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  gender: string;

  @IsString()
  height: string;

  @IsBoolean()
  driving_license: boolean;

  @IsEnum(Languages)
  language: Languages;

  @IsString()
  favorite_color: string;

  jobId: string;
}
