import { useEffect, useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';

import {starsImg} from '../utils/index.js';

export default function Stars({ count = 5000, size = 0.2 }) {
  const texture = useTexture(starsImg);
  const starsRef = useRef();

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;
    }

    return positions;
  }, [count]);

  const animate = (time) => {
    starsRef.current.rotation.y += 0.000025;
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animate);
  }, []);

  return (
    <group ref={starsRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          map={texture}
          size={size}
          sizeAttenuation
          transparent={false}
          alphaTest={0.5}
          opacity={1.0}
        />
      </points>
    </group>
  );
}
