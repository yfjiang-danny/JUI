import { ReactNode } from 'react';

export type SelectedStateType = 'checked' | 'half' | 'none';

export interface BaseOptionModel {
  label:
    | ReactNode
    | ((option: BaseOptionModel, state: SelectedStateType) => ReactNode);
  value: string;
  disabled?: boolean;
  children?: BaseOptionModel[];
}
