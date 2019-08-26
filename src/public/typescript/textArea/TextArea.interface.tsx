import { IResponse } from '../main/ain.interface';

export interface ITextArea {
  children?: JSX.Element[] | JSX.Element;
  response: IResponse | null;
}
