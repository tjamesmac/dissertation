import { IResponse } from '../Main/Main.helpers';

export interface ITextArea {
  children?: JSX.Element[] | JSX.Element;
  response: IResponse[] | null;
}
