import { userInterface } from './user.interfaz.model';
import { userPlataform } from './user.plataform.model';
export class User {
  public id: string;
  public usuario: string;
  public telefono: string;
  public email: string;
  public nombre: string;
  public apellidop: string;
  public apellidom: string;
  public rol: string;
  public status: boolean;
  public password: string;
  public interfaz: userInterface;
  public plataformas: Array<userPlataform>;
}
