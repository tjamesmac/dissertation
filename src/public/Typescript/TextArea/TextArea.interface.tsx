import { IResponse } from '../maain/main.interface';

export interface ITextArea {
  children?: JSX.Element[] | JSX.Element;
  response: IResponse | null;
}
