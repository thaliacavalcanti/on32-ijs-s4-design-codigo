import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserValidation } from './user.validation'

@Injectable()
export class UserService {
  private users: User[] = [];

  createUser(
    name: string,
    email: string,
    password: string,
    cpf: string,
    userType: 'customer' | 'manager' | 'admin',
    superPassword?: string,
  ): User {

    if (UserValidation.EmailValidation(email)){
      throw new Error('Invalid email');
    }
    
    
    if (UserValidation.PasswordValidation(password)) {
      throw new Error('Invalid password');
    }

    if (
      superPassword && UserValidation.PasswordValidation(superPassword)
    ) {
      throw new Error('Invalid super password');
    }


    if (this.users.some((user) => user.email === email)) {
      throw new Error('Email already in use');
    }


    if (this.users.some((user) => user.cpf === cpf)) {
      throw new Error('CPF already in use');
    }


    if (UserValidation.CPFValidation(cpf)) {
      throw new Error('Invalid CPF');
    }
    

    if(UserValidation.CPFDigitValidation(cpf)) {
      throw new Error('Invalid CPF');
    }

    const userCode = `${Date.now().toString()}${this.users.length}`;
    const user = new User(
      name,
      email,
      password,
      cpf,
      userType,
      userCode,
      `${this.users.length + 1}`,
      superPassword,
    );

    this.users.push(user);
    return user;
  }

  updateUser(
    id: string,
    name: string,
    email: string,
    password: string,
    cpf: string,
    userType: 'customer' | 'manager' | 'admin',
    superPassword?: string,
  ): User {
    // valida user data
    if (UserValidation.EmailValidation(email)){
      throw new Error('Invalid email');
    }
    
    
    if (UserValidation.PasswordValidation(password)) {
      throw new Error('Invalid password');
    }

    if (
      superPassword && UserValidation.PasswordValidation(superPassword)
    ) {
      throw new Error('Invalid super password');
    }


    if (this.users.some((user) => user.email === email)) {
      throw new Error('Email already in use');
    }


    if (this.users.some((user) => user.cpf === cpf)) {
      throw new Error('CPF already in use');
    }


    if (UserValidation.CPFValidation(cpf)) {
      throw new Error('Invalid CPF');
    }
    

    if(UserValidation.CPFDigitValidation(cpf)) {
      throw new Error('Invalid CPF');
    }

    const user = this.users.find((user) => user.id === id);

    if (user) {
      user.name = name;
      user.email = email;
      user.password = password;
      user.cpf = cpf;
      user.userType = userType;

      if (superPassword) {
        user.superPassword = superPassword;
      }
    }

    return user;
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  listUsers(): User[] {
    return this.users;
  }
}
