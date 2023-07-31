import React from 'react';
import CascaderItem from '../Item';
import { BaseOptionModel } from '../type';

interface CascaderPanelProps<T extends BaseOptionModel> {
  parents: string[];
  values?: string[][];
  halfValues?: string[];
  options: T[];
  depth: number;
  onPanelChange?: (depth: number, option: T, parents: string[]) => void;
  onSelectedChange?: (values: string[][]) => void;
}

/**
 * 级联面板
 * @returns
 */
export default function CascaderPanel<T extends BaseOptionModel>({
  parents,
  values,
  halfValues,
  options,
  depth,
  onPanelChange,
  onSelectedChange,
}: CascaderPanelProps<T>) {
  if (depth > 6) {
    return null;
  }

  function onMouseEnter(v: string, option: BaseOptionModel) {
    onPanelChange?.(depth, option as T, parents);
  }

  return options && options.length > 0 ? (
    <div className={`cascader-panel depth-${depth}`}>
      {options.map((option) => {
        return option.value ? (
          <CascaderItem
            parents={parents}
            key={option.value}
            onMouseEnter={onMouseEnter}
            option={option}
            depth={depth}
            values={values}
            halfValues={halfValues}
            onSelectedChange={onSelectedChange}
          />
        ) : null;
      })}
    </div>
  ) : null;
}
