import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Mesh } from 'three';
import type { KeycapConfig } from '../types/index';
import type { ColorTheme } from '../constants/themes';

interface Keycap3DProps {
  keycap: KeycapConfig;
  position: [number, number, number];
  rotation?: [number, number, number];
  onSelect: (keyId: string, isCtrlOrCmd: boolean) => void;
  isSelected: boolean;
  theme: ColorTheme;
}

export const Keycap3D: React.FC<Keycap3DProps> = ({
  keycap,
  position,
  rotation: layoutRotation = [0, 0, 0],
  onSelect,
  isSelected,
  theme
}) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<Group>(null);

  // Load the GLTF keycap model
  const { scene } = useGLTF('/scene.gltf');

  // Animation for selected keys
  useFrame((state) => {
    if (groupRef.current && isSelected) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.05 + 0.1;
    } else if (groupRef.current && !isSelected) {
      groupRef.current.position.y = position[1];
    }
  });

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const isCtrlOrCmd = (event.nativeEvent as MouseEvent)?.ctrlKey || (event.nativeEvent as MouseEvent)?.metaKey || false;
    onSelect(keycap.id, isCtrlOrCmd);
  };


  // Get keycap scale based on type
  const getKeycapScale = (): [number, number, number] => {
    const baseScale = 0.0008; // Really tiny scale
    // All keys should be the same size
    return [baseScale, baseScale, baseScale];
  };

  // Get rotation based on key position (different rows have different angles in Cherry profile)
  const getKeycapRotation = (): [number, number, number] => {
    if (keycap.keyType === 'main') {
      const row = keycap.position.row;
      switch (row) {
        case 0: // Top row
          return [-0.15, 0, 0];
        case 1: // Home row
          return [-0.05, 0, 0];
        case 2: // Bottom row
          return [0.1, 0, 0];
      }
    } else if (keycap.keyType === 'thumb') {
      return [-0.1, 0, 0];
    }
    return [0, 0, 0];
  };

  const scale = getKeycapScale();
  const cherryProfileRotation = getKeycapRotation();
  const clonedScene = scene.clone();

  // Combine thumb rotation (from layout) with Cherry profile rotation
  const finalRotation: [number, number, number] = [
    cherryProfileRotation[0] + layoutRotation[0],
    cherryProfileRotation[1] + layoutRotation[1], 
    cherryProfileRotation[2] + layoutRotation[2]
  ];

  // Apply custom materials to the cloned scene
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof Mesh && child.material) {
        child.material = child.material.clone();
        child.material.color.set(keycap.color);
        child.material.metalness = 0.1;
        child.material.roughness = 0.6;
        child.material.emissive.set(isSelected ? theme.colors.accent : hovered ? '#444444' : '#000000');
        child.material.emissiveIntensity = isSelected ? 0.2 : hovered ? 0.08 : 0;
      }
    });
  }, [clonedScene, keycap.color, isSelected, hovered, theme.colors.accent]);

  return (
    <group ref={groupRef} position={position} rotation={finalRotation}>
      {/* GLTF Keycap Model */}
      <group
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive
          object={clonedScene}
          scale={scale}
        />
      </group>

      {/* Selection indicator ring */}
      {isSelected && (
        <mesh position={[0, 0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.45, 32]} />
          <meshBasicMaterial color={theme.colors.accent} transparent opacity={0.8} />
        </mesh>
      )}


      {/* Hover effect */}
      {hovered && !isSelected && (
        <mesh position={[0, 0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.45, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
};

// Preload the GLTF model
useGLTF.preload('/scene.gltf');
