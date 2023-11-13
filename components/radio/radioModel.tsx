"use client";

import {
  OrbitControls,
  Text,
  RenderTexture,
  OrthographicCamera,
} from "@react-three/drei";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMotionValue, useMotionValueEvent } from "framer-motion";
import { motion } from "framer-motion-3d";
import SplineLoader from "@splinetool/loader";
import { useGraph, useLoader } from "@react-three/fiber";
import type { Object3D } from "three";
import { useSelector } from "react-redux";
import { RadioStoreState } from "./audioState/store";

type Output = {
  nodes: Record<string, any>;
  materials: Record<string, any>;
};
function useSpline(url: string): Output {
  const scene = useLoader(SplineLoader, url);
  return useGraph(scene as unknown as Object3D);
}

const loopNum = (cur: number, max = 100, min = 0, delta = 0.05) => {
  const next = cur - delta;
  return cur - delta < min ? max : next;
};

function Screen({ geometry, ...props }: any) {
  const textRef = useRef<any>();
  const texTitletRef = useRef<any>();
  const screenRef = useRef<THREE.Mesh>(null);
  const cameraRef = useRef<THREE.OrthographicCamera>(null);

  const isPlaying = useSelector(
    (state: RadioStoreState) => state.radioReducer.isPlaying
  );
  const audioTitle = useSelector(
    (state: RadioStoreState) => state.radioReducer.currentAudio.title
  );

  const currentChannel = useSelector(
    (state: RadioStoreState) => state.radioReducer.currentChannel
  );

  console.log("test", isPlaying, audioTitle);

  const typeText = currentChannel.name ?? `radio - news Hello World Hello`;
  const title = audioTitle ?? "FM 88.7";
  useEffect(() => {
    if (texTitletRef.current) {
      texTitletRef.current.position.x = 0;
    }
  }, [title]);

  useFrame(() => {
    if (textRef.current && texTitletRef.current) {
      const textWidth =
        textRef.current.geometry.boundingBox.max.x -
        textRef.current.geometry.boundingBox.min.x;
      const textTitleWidth =
        texTitletRef.current.geometry.boundingBox.max.x -
        texTitletRef.current.geometry.boundingBox.min.x;
      const rangeWidth = textTitleWidth + 5;
      if (isPlaying) {
        // textRef.current.position.x = loopNum(
        //   textRef.current.position.x,
        //   65,
        //   -rangeWidth
        // );
        texTitletRef.current.position.x = loopNum(
          texTitletRef.current.position.x,
          65,
          -rangeWidth
        );
      }
    }
  });

  return (
    <mesh
      ref={screenRef}
      name="display"
      geometry={geometry}
      position={[-9.89, 34.1, -5.61]}
      {...props}
    >
      <meshBasicMaterial toneMapped={false}>
        <RenderTexture attach="map" anisotropy={16}>
          <OrthographicCamera
            makeDefault
            manual
            bottom={-11}
            right={34}
            top={11}
            left={-34}
            ref={cameraRef}
            near={-100}
            far={100}
            position={[34, 0, 100]}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <Text
            ref={textRef}
            font="/wqyh.ttf"
            position={[0, 4, 0.1]}
            fontSize={10}
            anchorX="left"
            anchorY="middle"
          >
            {typeText}
          </Text>
          <Text
            ref={texTitletRef}
            font="/wqyh.ttf"
            position={[0, -6, 0.1]}
            fontSize={10}
            anchorX="left"
            anchorY="middle"
          >
            {title}
          </Text>
        </RenderTexture>
      </meshBasicMaterial>
    </mesh>
  );
}

const min = -50;
const max = 53;

function Scene({
  ...props
}: RadioProps & { setOrbitEnabled: (v: boolean) => void }) {
  const {
    setOrbitEnabled,
    playPause,
    playNext,
    playPre,
    nextChannel,
    setVolume,
    setPlayPause,
  } = props;

  const { nodes, materials } = useSpline(
    "https://prod.spline.design/E-3IANRieazM6PML/scene.splinecode"
  );
  const { y, pointerDown, pointerLeave } = useMotionY(
    min,
    max,
    setOrbitEnabled
  );
  const [powerOn, setPowerOn] = useState(false);
  useMotionValueEvent(y, "change", (latest: number) => {
    setVolume((100 * (latest - min)) / (max - min));
    if (latest === min) {
      setPowerOn((pre) => {
        if (pre) {
          setPlayPause(false);
        }
        return false;
      });
    } else {
      setPowerOn((pre) => {
        if (!pre) {
          setPlayPause(true);
        }
        return true;
      });
    }
  });

  return (
    <>
      <group {...props} dispose={null}>
        <scene name="Scene" onPointerLeave={pointerLeave}>
          <group
            name="grille"
            position={[-144.67, 19.59, 12.15]}
            scale={[0.17, 0.17, 1]}
          >
            <mesh
              name="Shape 0"
              geometry={nodes["Shape 0"].geometry}
              material={materials["Shape 0 Material"]}
              castShadow
              receiveShadow
              position={[342.2, -84.5, 0]}
            />
            <mesh
              name="Shape 1"
              geometry={nodes["Shape 1"].geometry}
              material={materials["Shape 1 Material"]}
              castShadow
              receiveShadow
              position={[129.1, -213.4, 0.01]}
            />
            <mesh
              name="Shape 2"
              geometry={nodes["Shape 2"].geometry}
              material={materials["Shape 2 Material"]}
              castShadow
              receiveShadow
              position={[565.8, -213, 0.02]}
            />
            <mesh
              name="Shape 3"
              geometry={nodes["Shape 3"].geometry}
              material={materials["Shape 3 Material"]}
              castShadow
              receiveShadow
              position={[351.7, -342, 0.03]}
            />
            <mesh
              name="Shape 4"
              geometry={nodes["Shape 4"].geometry}
              material={materials["Shape 4 Material"]}
              castShadow
              receiveShadow
              position={[118.6, -471.3, 0.04]}
            />
            <mesh
              name="Shape 5"
              geometry={nodes["Shape 5"].geometry}
              material={materials["Shape 5 Material"]}
              castShadow
              receiveShadow
              position={[569.5, -473, 0.05]}
            />
            <mesh
              name="Shape 6"
              geometry={nodes["Shape 6"].geometry}
              material={materials["Shape 6 Material"]}
              castShadow
              receiveShadow
              position={[342.3, -601.4, 0.06]}
            />
          </group>
          <group name="mainPanelGroup" position={[93.89, -51.9, 14.91]}>
            <group
              name="mainBtnsGroup"
              position={[-13.51, -16.67, 6.91]}
              scale={[0.96, 1, 1]}
            >
              <group name="nextChannel" position={[63.7, -6, -12]}>
                <group
                  name="nextChannel1"
                  position={[-3, 10.5, -0.5]}
                  scale={[0.3, 0.3, 1]}
                >
                  <mesh
                    name="Shape 01"
                    geometry={nodes["Shape 01"].geometry}
                    material={materials["Shape 01 Material"]}
                    castShadow
                    receiveShadow
                    position={[4, -11, 0]}
                  />
                  <mesh
                    name="Shape 02"
                    geometry={nodes["Shape 02"].geometry}
                    material={materials["Shape 02 Material"]}
                    castShadow
                    receiveShadow
                    position={[8.54, -5.66, 0.01]}
                  />
                  <mesh
                    name="Shape 03"
                    geometry={nodes["Shape 03"].geometry}
                    material={materials["Shape 03 Material"]}
                    castShadow
                    receiveShadow
                    position={[5.71, -2.83, 0.02]}
                  />
                  <mesh
                    name="Shape 04"
                    geometry={nodes["Shape 04"].geometry}
                    material={materials["Shape 04 Material"]}
                    castShadow
                    receiveShadow
                    position={[2.88, 0, 0.03]}
                  />
                  <mesh
                    name="Shape 05"
                    geometry={nodes["Shape 05"].geometry}
                    material={materials["Shape 05 Material"]}
                    castShadow
                    receiveShadow
                    position={[12.78, -2.83, 0.04]}
                  />
                  <mesh
                    name="Shape 06"
                    geometry={nodes["Shape 06"].geometry}
                    material={materials["Shape 06 Material"]}
                    castShadow
                    receiveShadow
                    position={[15.61, 0, 0.05]}
                  />
                </group>
                <group
                  name="pausePlay"
                  position={[0, -4.32, -0.5]}
                  scale={[1.5, 1.5, 1]}
                >
                  <motion.mesh
                    name="btn"
                    geometry={nodes.btn.geometry}
                    material={materials["btn Material"]}
                    castShadow
                    receiveShadow
                    position={[0, 0, -1]}
                    whileTap={{ z: -2 }}
                    onTap={nextChannel}
                  />
                  <mesh
                    name="Ellipse"
                    geometry={nodes.Ellipse.geometry}
                    material={materials["Ellipse Material"]}
                    castShadow
                    receiveShadow
                  />
                </group>
              </group>
              <group name="nextGroup " position={[23.8, -6, -12]}>
                <group
                  name="next"
                  position={[3.5, 11.93, -0.5]}
                  scale={[-0.3, 0.3, 1]}
                >
                  <mesh
                    name="Shape 07"
                    geometry={nodes["Shape 07"].geometry}
                    material={materials["Shape 07 Material"]}
                    castShadow
                    receiveShadow
                    position={[2, -2, 0]}
                  />
                </group>
                <group
                  name="pausePlay1"
                  position={[0, -4.32, -0.5]}
                  scale={[1.5, 1.5, 1]}
                >
                  <motion.mesh
                    name="btn1"
                    geometry={nodes.btn1.geometry}
                    material={materials["btn1 Material"]}
                    castShadow
                    receiveShadow
                    position={[0, 0, -1]}
                    whileTap={{ z: -2 }}
                    onTap={playNext}
                  />
                  <mesh
                    name="Ellipse1"
                    geometry={nodes.Ellipse1.geometry}
                    material={materials["Ellipse1 Material"]}
                    castShadow
                    receiveShadow
                  />
                </group>
              </group>
              <group name="preGroup " position={[-16.1, -6, -12]}>
                <group
                  name="pre"
                  position={[-3.47, 11.93, -0.5]}
                  scale={[0.3, 0.3, 1]}
                >
                  <mesh
                    name="Shape 08"
                    geometry={nodes["Shape 08"].geometry}
                    material={materials["Shape 08 Material"]}
                    castShadow
                    receiveShadow
                    position={[2, -2, 0]}
                  />
                </group>
                <group
                  name="pausePlay2"
                  position={[0, -4.32, -0.5]}
                  scale={[1.5, 1.5, 1]}
                >
                  <motion.mesh
                    name="btn2"
                    geometry={nodes.btn2.geometry}
                    material={materials["btn2 Material"]}
                    castShadow
                    receiveShadow
                    position={[0, 0, -1]}
                    whileTap={{ z: -2 }}
                    onTap={playPre}
                  />
                  <mesh
                    name="Ellipse2"
                    geometry={nodes.Ellipse2.geometry}
                    material={materials["Ellipse2 Material"]}
                    castShadow
                    receiveShadow
                  />
                </group>
              </group>
              <group name="playGroup" position={[-56, -6, -12]}>
                <group
                  name="playPause"
                  position={[-3.69, 12.04, 0]}
                  scale={[0.02, 0.02, 1]}
                >
                  <mesh
                    name="Shape 09"
                    geometry={nodes["Shape 09"].geometry}
                    material={materials["Shape 09 Material"]}
                    castShadow
                    receiveShadow
                  />
                </group>
                <group
                  name="pausePlay3"
                  position={[0, -4.32, -0.5]}
                  scale={[1.5, 1.5, 1]}
                >
                  <motion.mesh
                    name="btn3"
                    geometry={nodes.btn3.geometry}
                    material={materials["btn3 Material"]}
                    castShadow
                    receiveShadow
                    position={[0, 0, -1]}
                    whileTap={{ z: -2 }}
                    onTap={playPause}
                  />
                  <mesh
                    name="Ellipse3"
                    geometry={nodes.Ellipse3.geometry}
                    material={materials["Ellipse3 Material"]}
                    castShadow
                    receiveShadow
                  />
                </group>
              </group>
            </group>
            <group name="volumePowerGroup" position={[69.11, -0.22, -3.91]}>
              <group
                name="volume"
                position={[-3, 66.18, 1]}
                scale={[0.25, 0.25, 1]}
              >
                <mesh
                  name="Shape 010"
                  geometry={nodes["Shape 010"].geometry}
                  material={materials["Shape 010 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, -2, 0]}
                />
                <mesh
                  name="Shape 011"
                  geometry={nodes["Shape 011"].geometry}
                  material={materials["Shape 011 Material"]}
                  castShadow
                  receiveShadow
                  position={[19, -7.1, 0.01]}
                />
                <mesh
                  name="Shape 012"
                  geometry={nodes["Shape 012"].geometry}
                  material={materials["Shape 012 Material"]}
                  castShadow
                  receiveShadow
                  position={[19, -0.01, 0.02]}
                />
              </group>
              <motion.mesh
                name="volumeBtn"
                geometry={nodes.volumeBtn.geometry}
                material={materials["volumeBtn Material"]}
                castShadow
                receiveShadow
                onPointerDown={pointerDown}
                position={[0, y, -1]}
              />
              <group name="power" position={[0.65, -61.03, 1.21]}>
                <group
                  name="power1"
                  position={[-0.65, 3.15, -3]}
                  scale={[0.3, 0.3, 100]}
                >
                  <mesh
                    name="Shape 013"
                    geometry={nodes["Shape 013"].geometry}
                    material={materials["Shape 013 Material"]}
                    castShadow
                    receiveShadow
                    position={[11, -2, 0]}
                  />
                  <mesh
                    name="Shape 014"
                    geometry={nodes["Shape 014"].geometry}
                    material={materials["Shape 014 Material"]}
                    castShadow
                    receiveShadow
                    position={[3, -4.13, 0]}
                  />
                </group>
                <mesh
                  name="Ellipse4"
                  geometry={nodes.Ellipse4.geometry}
                  castShadow
                  receiveShadow
                  position={[-3.65, -0.85, -3.21]}
                >
                  <motion.meshBasicMaterial
                    attach="material"
                    toneMapped={false}
                    color={powerOn ? "#00FF00" : "gray"}
                  />
                </mesh>
              </group>
              <mesh
                name="volumeSlide"
                geometry={nodes.volumeSlide.geometry}
                material={materials["volumeSlide Material"]}
                castShadow
                receiveShadow
                position={[0.5, 0.15, -2]}
              />
            </group>
            <mesh
              name="display"
              geometry={nodes.display.geometry}
              material={materials["display Material"]}
              castShadow
              receiveShadow
              position={[-9.89, 34.1, -5.91]}
            />
            <Screen geometry={nodes.display.geometry} />
            <mesh
              name="mainpanel"
              geometry={nodes.mainpanel.geometry}
              material={materials["mainpanel Material"]}
              castShadow
              receiveShadow
              position={[0, 0, -6.81]}
              scale={[0.95, 0.95, 1]}
            />
          </group>
          <mesh
            name="Antenne"
            geometry={nodes.Antenne.geometry}
            material={nodes.Antenne.material}
            castShadow
            receiveShadow
            position={[-70.08, 90.49, -49.32]}
            rotation={[0, 0, -0.68]}
          />
          <mesh
            name="Rectangle"
            geometry={nodes.Rectangle.geometry}
            material={materials["Rectangle Material"]}
            castShadow
            receiveShadow
            position={[13.01, -52.97, -79.71]}
          />

          <directionalLight
            color={"#ffffff"} // 白色光源
            intensity={1.5} // 较低强度以保持光源柔和
            position={[10, 10, 10]} // 光源位置
            castShadow // 允许投射阴影
          />

          <hemisphereLight
            name="Default Ambient Light"
            intensity={1.75}
            color="#000000"
          />
        </scene>
      </group>
    </>
  );
}

const useMotionY = (
  min = 0,
  max = 100,
  setOrbitEnabled: (v: boolean) => void
) => {
  const mouseDown = useRef(false);
  const initY = useRef(0);
  const y = useMotionValue(min);
  const tempYRef = useRef(min);
  const three = useThree();
  const threeRef = useRef(three);
  threeRef.current = three;

  const pointerDown = useCallback((e: any) => {
    mouseDown.current = true;
    const { raycaster, scene, camera } = threeRef.current;
    const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
    const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const point = intersects[0].point;
      initY.current = point.y;
      setOrbitEnabled(false);
    }
  }, []);
  const pointerLeave = useCallback(() => {
    mouseDown.current = false;
    tempYRef.current = y.get();
    setOrbitEnabled(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: PointerEvent) => {
      const { raycaster, scene, camera } = threeRef.current;
      if (!mouseDown.current) return;
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const point = intersects[0].point;

        y.set(
          Math.min(
            Math.max(tempYRef.current + point.y - initY.current, min),
            max
          )
        );
      }
    };

    window.addEventListener("pointermove", handleMouseMove);
    window.addEventListener("pointerup", pointerLeave);
    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("pointerup", pointerLeave);
    };
  }, []);

  return { y, pointerDown, pointerLeave };
};

type RadioProps = {
  playPause: () => void;
  setPlayPause: (v: boolean) => void;
  playNext: () => void;
  playPre: () => void;
  setVolume: (v: number) => void;
  nextChannel: () => void;
};

const CanvasScene = (props: RadioProps) => {
  const [orbitEnabled, setOrbitEnabled] = useState(true);
  return (
    <div className="h-full w-screen fixed inset-0">
      <Canvas
        shadows
        flat
        linear
        camera={{ fov: 45, near: 5, far: 4000, position: [90, 90, 500] }}
      >
        <Suspense fallback={null}>
          <Scene setOrbitEnabled={setOrbitEnabled} {...props} />
        </Suspense>
        <OrbitControls enabled={orbitEnabled} />
      </Canvas>
    </div>
  );
};
export default CanvasScene;
