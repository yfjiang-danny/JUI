import React, { useContext, useMemo, useState } from 'react';
import { BaseOptionModel, BaseOptionModelWithPosKey, PanelModel } from './type';
import { buildKeyEntities, buildLevelEntities } from './util';

interface UseCreateCascaderContextValueProps<T> {
  defaultValues?: string[][];
  options: T[];
}

function useCreateCascaderContextValue<T extends BaseOptionModel>({
  defaultValues = [],
  options,
}: UseCreateCascaderContextValueProps<T>) {
  const levelEntitiesMap = useMemo(() => {
    return buildLevelEntities(new Map<number, Set<T>>(), options);
  }, [options]);

  const keyEntitiesMap = useMemo(() => {
    return buildKeyEntities(new Map<string, T>(), options);
  }, [options]);

  const [panels, setPanels] = useState<PanelModel[]>([
    { level: 0, options: options },
  ]);
  const [values, setValues] = useState<string[][]>(defaultValues);
  const [halfValues, setHalfValues] = useState<string[]>([]);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  function onPanelsChange(level: number, option: BaseOptionModelWithPosKey) {
    setPanels((pre) => {
      const res = pre.slice(0, level);
      if (option.children) {
        res.push({
          level: level,
          parentPosKey: option.posKey,
          options: option.children,
        });
      }
      return res;
    });
  }

  function toChecked(option: BaseOptionModelWithPosKey) {
    /**
     * Update parents' status, might be（allChecked/halfChecked）
     * Should track from bottom to top
     */
    /**
     * Set all children's status to checked
     * Should track from top to bottom
     */
  }

  function checkedToNull(option: BaseOptionModelWithPosKey) {
    /**
     * Update parent status（allChecked/halfChecked）
     * Should track from bottom to top
     */
    /**
     * Set all children's status to unchecked
     * Should track from top to bottom
     */
  }

  return {
    levelEntitiesMap,
    keyEntitiesMap,
    panels,
    setPanels,
    values,
    setValues,
    halfValues,
    setHalfValues,
    activeKeys,
    setActiveKeys,
  };
}

interface CascaderContextProps<T> {
  panels: T[][];
  setPanels: React.Dispatch<React.SetStateAction<T[][]>>;
  values: string[][];
  setValues: React.Dispatch<React.SetStateAction<string[][]>>;
  halfValues: string[];
  setHalfValues: React.Dispatch<React.SetStateAction<string[]>>;
  activeKeys: string[];
  setActiveKeys: React.Dispatch<React.SetStateAction<string[]>>;
}

const CascaderContext =
  React.createContext<CascaderContextProps<BaseOptionModel> | null>(null);

function useCascader() {
  return useContext(CascaderContext);
}

export { useCreateCascaderContextValue, CascaderContext, useCascader };
