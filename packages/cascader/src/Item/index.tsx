import React, { useMemo } from 'react';
import { SVGChecked, SVGChevronRight } from 'rui-icons/dist/normal';
import { BaseOptionModel, SelectedStateType } from '../type';

interface CascaderItemProps<T extends BaseOptionModel> {
  parents: string[];
  depth: number;
  values?: string[][];
  halfValues?: string[];
  option: T;
  onMouseEnter: (value: string, option: T) => void;
  onSelectedChange?: (values: string[][]) => void;
}

export default function CascaderItem<T extends BaseOptionModel>({
  parents,
  depth,
  values = [],
  halfValues = [],
  option,
  onMouseEnter,
  onSelectedChange,
}: CascaderItemProps<T>) {
  const state: SelectedStateType = useMemo(() => {
    const halfIndex = halfValues.findIndex((v) => v === option.value);
    if (halfIndex !== -1) return 'half';
    for (let i = 0; i < values.length; i++) {
      const element = values[i];
      if (element[depth] === option.value) {
        return 'checked';
      }
    }
    return 'none';
  }, [depth, halfValues, values, option.value]);

  function onClick() {
    onSelectedChange?.([[...parents, option.value]]);
  }

  return (
    <div
      className={`cascader-item ${state === 'checked' ? 'checked' : ''}`}
      onMouseEnter={() => onMouseEnter(option.value, option)}
      onClick={!!option.value && !option.children ? onClick : undefined}
    >
      {typeof option.label === 'function'
        ? option.label(option, state)
        : option.label}
      {option.children && option.children.length > 0 && <SVGChevronRight />}
      {!option.children && state === 'checked' && <SVGChecked />}
    </div>
  );
}
