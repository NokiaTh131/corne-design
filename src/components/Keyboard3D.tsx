import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { KeyboardHalf3D } from './KeyboardHalf3D';
import type { KeyboardConfig } from '../types/index';
import type { ColorTheme } from '../constants/themes';

interface Keyboard3DProps {
  keyboardConfig: KeyboardConfig;
  selectedKeys: Set<string>;
  onKeySelect: (keyId: string, isCtrlOrCmd: boolean) => void;
  theme: ColorTheme;
}

export const Keyboard3D: React.FC<Keyboard3DProps> = ({
  keyboardConfig,
  selectedKeys,
  onKeySelect,
  theme
}) => {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}>
      <Canvas
        camera={{ position: [0, 8, 12], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={theme.colors.accent} wireframe />
          </mesh>
        }>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
          />
          <directionalLight
            position={[-5, 5, 5]}
            intensity={0.3}
          />

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* Left keyboard half */}
          <KeyboardHalf3D
            keys={keyboardConfig.leftKeys}
            side="left"
            position={[-4, 0, 0]}
            onKeySelect={onKeySelect}
            selectedKeys={selectedKeys}
            theme={theme}
          />


          {/* Right keyboard half */}
          <KeyboardHalf3D
            keys={keyboardConfig.rightKeys}
            side="right"
            position={[4, 0, 0]}
            onKeySelect={onKeySelect}
            selectedKeys={selectedKeys}
            theme={theme}
          />

          {/* Camera controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={8}
            maxDistance={20}
            target={[2.2, 0, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
