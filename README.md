# OpenGL Projects

고려대학교 COSE436 (컴퓨터 그래픽스) 과제 모음 — 2024년 가을학기

OpenGL 3.3+, FreeGLUT, GLEW를 사용한 4개의 과제로, 기초 변환부터 볼륨 렌더링까지 다양한 그래픽스 기법을 다룹니다.

## 프로젝트 구조

```
OpenGL/
├── Assign_1_2/
│   ├── 1/   ← 과제 1: 3D 변환 (Translation, Rotation, Projection)
│   └── 2/   ← 과제 2: Phong / Toon / Silhouette 셰이딩
├── Assign_3/  ← 과제 3: 마인크래프트 스타일 씬 + 실시간 반사 매핑
└── Assign_4/  ← 과제 4: 볼륨 렌더링 (MIP, Isosurface, DVR)
```

## 과제별 설명

### 과제 1 — 3D 변환 (Transformations & MVP)

기본적인 Model-View-Projection 행렬 파이프라인을 구현합니다.

- GLUT 프리미티브(주전자, 구, 원기둥) 와이어프레임 렌더링
- 키보드로 Translation(X/Y/Z) 및 Rotation(X/Y/Z) 조작
- Orthographic / Perspective 투영 전환 (`o` / `p`)
- 참조 좌표축 표시 (X=빨강, Y=파랑, Z=초록)

**조작법:** 화살표 키(이동/회전), `m`(모델 변경), `o`/`p`(투영 전환)

### 과제 2 — 다중 셰이더 시스템

OFF 포맷 메시를 로드하고, 세 가지 셰이딩 모드를 전환합니다.

| 모드 | 설명 |
|------|------|
| **Phong Shading** | 3개 광원(R/G/B), ambient·diffuse·specular 파라미터 실시간 조절 |
| **Toon Shading** | 셀 셰이딩 + 실루엣 라인, 음영 단계 수 조절 (`2`–`9`) |
| **Silhouette** | 뒷면 팽창 기법 윤곽선 렌더링, 두께 조절 (`+`/`-`) |

**조작법:** `p`(모드 전환), `s`(광원 선택), `1`/`3`(diffuse), `4`/`6`(ambient), `7`/`9`(specular)

### 과제 3 — 마인크래프트 스타일 씬 + 반사 매핑

FBO 기반 큐브맵 반사와 계층적 캐릭터 애니메이션을 결합한 복합 3D 씬입니다.

- **지형:** 16×16 하이트맵, 잔디·나무·진달래 블록 텍스처
- **캐릭터 애니메이션:** Steve, Candy, Spiderman — 머리·팔·다리 관절 회전
- **실시간 반사:** 6면 FBO 큐브맵 캡처 → 광택 큐브에 환경 반사
- **카메라:** 트랙볼 회전(LMB), 패닝(MMB), 줌(휠/RMB)

### 과제 4 — 볼륨 렌더링 (Direct Volume Rendering)

레이 캐스팅 기반 의료/과학 볼륨 데이터 시각화입니다.

| 모드 | 키 | 설명 |
|------|-----|------|
| **MIP** | `1` | 최대 강도 투영 — 레이 경로상 최대 밀도 출력 |
| **Isosurface** | `2` | 등가면 검출 + Phong 조명 |
| **Alpha Compositing** | `3` | 전이 함수(Transfer Function) 기반 컬러/투명도 합성 |

- **데이터셋:** CT Head (512³), Bonsai, Lung, Tooth, Bucky
- **전이 함수 에디터:** 별도 GLUT 윈도우에서 실시간 컬러/투명도 편집
- **카메라:** 트랙볼 회전(LMB), 줌(RMB)

> `data/CThead_512_512_452.raw.압축해제필요.7z`는 압축 해제 후 사용해야 합니다.

## 빌드

**요구사항:** CMake 3.16+, MSVC (Windows)

```bash
cd Assign_3          # 또는 Assign_4
cmake -B build .
cmake --build build
```

> 과제 1, 2는 Visual Studio 솔루션 파일(`.sln`)을 직접 열어 빌드합니다.
> 필요한 DLL(`freeglut.dll`, `glew32.dll`)은 각 프로젝트 폴더에 포함되어 있습니다.

## 공통 기술 스택

- **OpenGL 3.3+** — VAO, VBO, IBO, FBO, 3D Texture
- **FreeGLUT** — 윈도우 관리, 입력 처리, GLUT 프리미티브
- **GLEW** — OpenGL 확장 로딩
- **Angel Library** — 행렬/벡터 수학 (`vec3`, `vec4`, `mat4`)
- **GLSL** — 커스텀 버텍스/프래그먼트 셰이더
- **CMake** — 빌드 시스템 (과제 3, 4)

## 과제 요약

| # | 주제 | 난이도 | 핵심 개념 |
|---|------|--------|-----------|
| 1 | 3D 변환 | ★☆☆ | MVP 행렬, 투영 |
| 2 | 다중 셰이더 | ★★☆ | Phong, Toon, Silhouette |
| 3 | 반사 매핑 | ★★★ | FBO, 큐브맵, 텍스처, 애니메이션 |
| 4 | 볼륨 렌더링 | ★★★ | 레이 캐스팅, DVR, 전이 함수 |
