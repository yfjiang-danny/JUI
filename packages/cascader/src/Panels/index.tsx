import React, { forwardRef, useImperativeHandle, useState } from 'react';
import CascaderPanel from '../Panel';
import '../styles/index.less';
import { BaseOptionModel } from '../type';

interface CascaderContextProps<T> {
  panels: T[][];
  setPanels: React.Dispatch<React.SetStateAction<T[][]>>;
}

const CascaderContext =
  React.createContext<CascaderContextProps<BaseOptionModel> | null>(null);

interface CascaderPanelsProps<T> {
  defaultValues?: string[][];
  options: T[];
  onChange?: (v: string[][]) => void;
}

export interface CascaderPanelsRef {
  setValues: (v: string[][]) => void;
}

/**
 * CascaderPanels
 * @returns
 */
export default forwardRef(
  <T extends BaseOptionModel>(
    { options, defaultValues = [], onChange }: CascaderPanelsProps<T>,
    ref: React.Ref<CascaderPanelsRef>,
  ) => {
    const [panels, setPanels] = useState<{ parents: string[]; options: T[] }[]>(
      [{ parents: [], options: options }],
    );
    const [values, setValues] = useState<string[][]>(defaultValues);
    const [halfValues, setHalfValues] = useState<string[]>([]);

    useImperativeHandle(
      ref,
      () => {
        return {
          setValues: (v) => setValues(v),
        };
      },
      [],
    );

    function onPanelChange(
      depth: number,
      option: BaseOptionModel,
      parents: string[],
    ) {
      setPanels((pre) => {
        const res = pre.slice(0, depth + 1);
        if (option.children) {
          res.push({
            parents: [...parents, option.value],
            options: option.children as T[],
          });
        }
        return res;
      });
    }

    function onSelectedChange(v: string[][]) {
      setValues(v);
      onChange?.(v);
    }

    return (
      <div className="cascader-panels">
        {panels.map((panel, index) => {
          return (
            <CascaderPanel
              values={values}
              key={index}
              options={panel.options}
              depth={index}
              onPanelChange={onPanelChange}
              parents={panel.parents}
              onSelectedChange={onSelectedChange}
            />
          );
        })}
      </div>
    );
  },
);
