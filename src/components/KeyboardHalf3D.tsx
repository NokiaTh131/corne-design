import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { Keycap3D } from './Keycap3D';
import type { KeycapConfig } from '../types/index';
import type { ColorTheme } from '../constants/themes';
import { COLUMN_STAGGER } from '../constants/keyboard';

interface KeyboardHalf3DProps {
  keys: KeycapConfig[];
  side: 'left' | 'right';
  position: [number, number, number];
  onKeySelect: (keyId: string, isCtrlOrCmd: boolean) => void;
  selectedKeys: Set<string>;
  theme: ColorTheme;
}

export const KeyboardHalf3D: React.FC<KeyboardHalf3DProps> = ({
  keys,
  side,
  position,
  onKeySelect,
  selectedKeys,
  theme
}) => {
  const groupRef = useRef<Group>(null);

  // Optional: Add subtle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });



  const getKeyPosition3D = (key: KeycapConfig): [number, number, number] => {
    const { row, col } = key.position;

    // Base key spacing (matching 2D version)
    const keySpacing = 1.1; // Space between keys
    const rowSpacing = 1.1; // Space between rows

    // Calculate base position
    let x = col * keySpacing;
    let z = -row * rowSpacing;
    let y = 0;

    // Apply column stagger exactly like 2D version (to Z-axis for depth stagger)
    if (key.keyType === 'main' || key.keyType === 'special') {
      let staggerIndex;
      if (side === 'left') {
        staggerIndex = Math.max(col, 0);
      } else {
        staggerIndex = Math.min(Math.max(5 - col, 0), 5);
      }
      // Convert pixel stagger to 3D units - apply to Z-axis (depth) not Y-axis (height)
      z += (COLUMN_STAGGER[staggerIndex] || 0) * 0.015;
    }

    // Handle different key types exactly like 2D
    if (key.keyType === 'extra') {
      // Extra keys at outer columns
      x = side === 'left' ? -keySpacing : 6 * keySpacing;
    } else if (key.keyType === 'special') {
      // Special keys at inner columns
      x = side === 'left' ? 5 * keySpacing : 0;
      // Special keys offset like in 2D (translateY(24px) -> 3D equivalent)
      y += 0.24;
    } else if (key.keyType === 'thumb') {
      // Thumb cluster positioning matching 2D version
      if (side === 'left') {
        // Left thumb cluster: positioned under left keys
        x = 3 + (col - 1.5) * keySpacing * 1.05;
      } else {
        // Right thumb cluster: positioned under right keys (further to the right)
        x = 0.5 + (col - 1.5) * keySpacing * 1.05;
      }
      z = 1.8; // mt-6 equivalent

      // Apply column stagger to thumb keys too (they should follow the stagger pattern)
      let staggerIndex;
      if (side === 'left') {
        staggerIndex = Math.max(Math.round(col), 0);
      } else {
        staggerIndex = Math.min(Math.max(5 - Math.round(col), 0), 5);
      }
      z += (COLUMN_STAGGER[staggerIndex] || 0) * 0.015;

      // Apply thumb key micro-adjustments from 2D version
      // translateX -> X-axis, translateY -> Y-axis (height, not depth)
      if (side === 'left') {
        if (col === 1.5) { x -= 0.08; y -= 0.16; } // translateX(-8px) translateY(-16px)
        if (col === 2.5) { y -= 0.08; } // translateY(-8px)
        if (col === 3.5) { x += 0.08; } // translateX(8px)
      } else {
        if (col === 1.5) { x -= 0.08; } // translateX(-8px) - same direction
        if (col === 2.5) { y -= 0.08; } // translateY(-8px)
        if (col === 3.5) { x += 0.08; y -= 0.16; } // translateX(8px) translateY(-16px) - same direction
      }
    }

    return [x, y, z];
  };

  const getKeyRotation = (key: KeycapConfig): [number, number, number] => {
    if (key.keyType === 'thumb') {
      // Find thumb key index (same logic as 2D version)
      const thumbKeys = keys.filter(k => k.keyType === 'thumb').sort((a, b) => a.position.col - b.position.col);
      const thumbIndex = thumbKeys.findIndex(k => k.id === key.id);

      if (side === 'left') {
        if (thumbIndex === 0) return [0, 0, 0]; // No rotation
        if (thumbIndex === 1) return [0, -0.175, 0]; // rotate(10deg) -> radians
        if (thumbIndex === 2) return [0, -0.349, 0]; // rotate(20deg) -> radians
      } else {
        if (thumbIndex === 0) return [0, 0.349, 0]; // rotate(-20deg) -> radians
        if (thumbIndex === 1) return [0, -0.175, 0]; // rotate(-10deg) -> radians
        if (thumbIndex === 2) return [0, 0, 0]; // No rotation
      }
    }
    return [0, 0, 0];
  };

  return (
    <group ref={groupRef} position={position}>
      {/* Render all keys */}
      {keys.map((key) => (
        <Keycap3D
          key={key.id}
          keycap={key}
          position={getKeyPosition3D(key)}
          rotation={getKeyRotation(key)}
          onSelect={onKeySelect}
          isSelected={selectedKeys.has(key.id)}
          theme={theme}
        />
      ))}
    </group>
  );
};
