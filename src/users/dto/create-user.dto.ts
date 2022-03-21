import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 10)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 30)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
