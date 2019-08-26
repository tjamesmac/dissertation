import { IResponse } from '../Main/Main.interface';

export interface ITextArea {
  children?: JSX.Element[] | JSX.Element;
  response: IResponse | null;
}
