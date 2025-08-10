import { useState, useCallback } from 'react';
import type { KeyboardConfig, KeycapConfig } from '../types/index';
import { DEFAULT_LEFT_KEYS, DEFAULT_RIGHT_KEYS, CORNE_LAYOUT_LABELS } from '../constants/keyboard';

export const useKeyboard = () => {
  const initializeKeys = useCallback(() => {
    const leftKeys = DEFAULT_LEFT_KEYS.map((key) => {
      if (key.keyType === 'main') {
        const mainIndex = key.id.split('-')[2];
        const index = parseInt(mainIndex);
        const row = Math.floor(index / 6);
        const col = index % 6;
        return {
          ...key,
          label: CORNE_LAYOUT_LABELS.left.main[row]?.[col] || '',
        };
      } else {
        const thumbIndex = key.id.split('-')[2];
        const index = parseInt(thumbIndex);
        return {
          ...key,
          label: CORNE_LAYOUT_LABELS.left.thumb[index] || '',
        };
      }
    });
    
    const rightKeys = DEFAULT_RIGHT_KEYS.map((key) => {
      if (key.keyType === 'main') {
        const mainIndex = key.id.split('-')[2];
        const index = parseInt(mainIndex);
        const row = Math.floor(index / 6);
        const col = index % 6;
        return {
          ...key,
          label: CORNE_LAYOUT_LABELS.right.main[row]?.[col] || '',
        };
      } else {
        const thumbIndex = key.id.split('-')[2];
        const index = parseInt(thumbIndex);
        return {
          ...key,
          label: CORNE_LAYOUT_LABELS.right.thumb[index] || '',
        };
      }
    });

    return { leftKeys, rightKeys };
  }, []);

  const [keyboardConfig, setKeyboardConfig] = useState<KeyboardConfig>(() => {
    const { leftKeys, rightKeys } = initializeKeys();
    return {
      leftKeys,
      rightKeys,
      cableColor: '#000000',
    };
  });

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [customColors, setCustomColors] = useState<string[]>([]);

  // Multi-key selection handlers
  const toggleKeySelection = useCallback((keyId: string, isCtrlOrCmd: boolean = false) => {
    setSelectedKeys(prev => {
      const newSelection = new Set(prev);
      
      if (!isCtrlOrCmd) {
        // Single selection mode - clear others and select this one
        newSelection.clear();
        newSelection.add(keyId);
      } else {
        // Multi-selection mode - toggle this key
        if (newSelection.has(keyId)) {
          newSelection.delete(keyId);
        } else {
          newSelection.add(keyId);
        }
      }
      
      return newSelection;
    });
  }, []);

  const selectAllKeys = useCallback(() => {
    const allKeyIds = [...keyboardConfig.leftKeys, ...keyboardConfig.rightKeys].map(key => key.id);
    setSelectedKeys(new Set(allKeyIds));
  }, [keyboardConfig]);

  const clearSelection = useCallback(() => {
    setSelectedKeys(new Set());
  }, []);

  const updateKey = useCallback((keyId: string, updates: Partial<KeycapConfig>) => {
    setKeyboardConfig(prev => ({
      ...prev,
      leftKeys: prev.leftKeys.map(key => 
        key.id === keyId ? { ...key, ...updates } : key
      ),
      rightKeys: prev.rightKeys.map(key => 
        key.id === keyId ? { ...key, ...updates } : key
      ),
    }));
  }, []);

  // Bulk update for selected keys
  const updateSelectedKeys = useCallback((updates: Partial<KeycapConfig>) => {
    setKeyboardConfig(prev => ({
      ...prev,
      leftKeys: prev.leftKeys.map(key => 
        selectedKeys.has(key.id) ? { ...key, ...updates } : key
      ),
      rightKeys: prev.rightKeys.map(key => 
        selectedKeys.has(key.id) ? { ...key, ...updates } : key
      ),
    }));
  }, [selectedKeys]);

  const updateCableColor = useCallback((color: string) => {
    setKeyboardConfig(prev => ({ ...prev, cableColor: color }));
  }, []);

  const getSelectedKeysConfig = useCallback((): KeycapConfig[] => {
    const allKeys = [...keyboardConfig.leftKeys, ...keyboardConfig.rightKeys];
    return allKeys.filter(key => selectedKeys.has(key.id));
  }, [selectedKeys, keyboardConfig]);

  // Custom color management
  const addCustomColor = useCallback((color: string) => {
    setCustomColors(prev => {
      // Avoid duplicates and limit to 12 custom colors
      if (prev.includes(color)) return prev;
      const newColors = [color, ...prev];
      return newColors.slice(0, 12);
    });
  }, []);

  const resetToDefault = useCallback(() => {
    const { leftKeys, rightKeys } = initializeKeys();
    setKeyboardConfig({
      leftKeys,
      rightKeys,
      cableColor: '#000000',
    });
    setSelectedKeys(new Set());
  }, [initializeKeys]);

  return {
    keyboardConfig,
    selectedKeys,
    customColors,
    toggleKeySelection,
    selectAllKeys,
    clearSelection,
    updateKey,
    updateSelectedKeys,
    updateCableColor,
    getSelectedKeysConfig,
    addCustomColor,
    resetToDefault,
  };
};