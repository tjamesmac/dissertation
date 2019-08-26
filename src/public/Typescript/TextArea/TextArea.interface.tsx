import { IResponse } from '../Main/main.interface';

export interface ITextArea {
  children?: JSX.Element[] | JSX.Element;
  response: IResponse | null;
}
