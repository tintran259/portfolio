"use client";

import {
  Suspense, useRef, useEffect, useCallback, createRef,
  forwardRef, useImperativeHandle,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls, RoundedBox, Environment, PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { Wrapper, CanvasWrapper, DragHint } from "./styles";

/* ─── Geometry ───────────────────────────────────────────── */
const CUBIE = 1.034;
const GAP = 1.062;
const STICKER = 0.858;
const SOFF = CUBIE / 2 + 0.005;

/* ─── Face / tech config ─────────────────────────────────── */
type FaceName = "front" | "back" | "right" | "left" | "top" | "bottom";

interface FaceCfg { brand: string; svg: string; }

const FACE_CFGS: Record<FaceName, FaceCfg> = {
  /* React — front face */
  front: {
    brand: "#61DAFB",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="#20232A"/>
      <g fill="none" stroke="#61DAFB" stroke-width="4">
        <ellipse cx="50" cy="50" rx="37" ry="13.5"/>
        <ellipse cx="50" cy="50" rx="37" ry="13.5" transform="rotate(60,50,50)"/>
        <ellipse cx="50" cy="50" rx="37" ry="13.5" transform="rotate(120,50,50)"/>
      </g>
      <circle cx="50" cy="50" r="6" fill="#61DAFB"/>
    </svg>`,
  },
  /* Next.js — back face */
  back: {
    brand: "#cccccc",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#000"/>
      <path d="M30 30h8l32 42V30h8v40h-8L38 28V70H30V30z" fill="#fff"/>
    </svg>`,
  },
  /* Javascript — right face */
  right: {
    brand: "#F7DF1E",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#F7DF1E"/>
      <text x="50" y="65" text-anchor="middle" font-size="38" font-weight="bold" fill="#000" font-family="Arial,sans-serif">JS</text>
    </svg>`,
  },
  /* Expo — left face */
  left: {
    brand: "#aaaaff",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264.58333 215">
      <path d="m153.33845 45.652481c-1.80934 0-3.48944.387729-5.04032.904673 3.29558 2.19706 5.10493 5.104961 6.00963 8.400551.0648.45233.19386.775444.25856 1.227759.0648.387729.12916.775444.12916 1.163171.2586 5.686509-1.48628 6.397323-2.71403 9.757543-1.87398 4.329529-1.35704 8.982133.90466 12.730079.19387.452318.45234.969275.77546 1.421618-2.45558-16.348759 11.17919-18.804304 13.69932-23.90924.19386-4.458761-3.48944-7.431263-6.39731-9.499092-2.77864-1.680104-5.29884-2.197062-7.62513-2.197062zm20.54903 3.683318c-.25858 1.486247-.0647 1.09853-.12913 1.873973-.0647.516945-.0647 1.163157-.12914 1.680102-.12914.516959-.2586 1.033904-.45236 1.550886-.12913.516945-.32309 1.033903-.51694 1.550847-.2586.516983-.45234.969301-.71082 1.486258-.19385.258585-.32309.516945-.51695.775443-.12914.193857-.25858.387715-.38771.581572-.32309.452355-.64621.904673-.96929 1.292387-.38774.387729-.71083.840046-1.16319 1.163171v.0647c-.38771.3231-.77543.710815-1.22775 1.033903-1.35702 1.033902-2.90787 1.809344-4.32952 2.778644-.45231.323088-.90468.581587-1.29238.9693-.45233.323088-.84006.646176-1.22776 1.033903-.45236.387715-.77545.775442-1.16318 1.227784-.32309.387728-.7108.840048-.96927 1.292402-.32312.452317-.6462.904661-.9047 1.35699-.25857.516944-.45233.969299-.71081 1.486245-.19385.516944-.38773.969301-.51695 1.486244-.19386.581586-.3231 1.098544-.45234 1.615514-.0647.258583-.0647.58156-.12914.840045-.0648.258584-.0648.516945-.12913.775443 0 .516944-.0647 1.09853-.0647 1.615475 0 .387727 0 .775441.0647 1.163169 0 .516946.0647 1.033892.19385 1.615476.0647.516944.19384 1.033902.32312 1.550885.19386.516944.3231 1.033902.51694 1.550847.12916.323126.32309.646213.45236.904673l-14.86252-5.75114c-2.52018-.710815-4.9757-1.35699-7.49588-1.938576-1.357-.323087-2.714-.646198-4.07102-.969299-3.87719-.77543-7.81895-1.356991-11.76076-1.744705-.12913 0-.19385-.06471-.32309-.06471-3.8772-.387714-7.68973-.581572-11.5669-.581572-2.84328 0-5.68656.129131-8.465201.323088-3.941798.258584-7.883602.775442-11.825373 1.421617-.969302.129144-1.938602.323125-2.907905.516984-2.003199.387689-3.941771.840044-5.815742 1.292386-.9693.258584-1.938602.516958-2.907903.775419-.96927.387713-1.87394.84007-2.778642 1.227784-.710811.323088-1.421619.646187-2.132431.9693-.129139.06471-.25858.06471-.32309.129144-.64621.323087-1.22779.581547-1.809341.904671-.193861.06471-.323122.129132-.452351.193859-.71081.323089-1.421618.710803-2.003201 1.033902-.45235.193858-.90467.452343-1.292389.646213-.193862.129131-.452353.258572-.581582.323088-.581579.323088-1.16316.646174-1.680111.9693-.581581.323087-1.098532.646175-1.550882.969263-.452318.323125-.904667.581585-1.29239.904672-.06474.06471-.129139.06471-.193861.129145-.387719.258583-.840039.581571-1.227758.904696 0 0-.06473.0647-.12914.129142-.32309.258584-.646212.516947-.969301.775407-.129138.06471-.258581.193857-.38772.258583-.32309.258586-.64618.581586-.969271.84007-.06473.129143-.193859.193858-.258581.258585-.38772.387715-.775441.710802-1.163161 1.09853-.06473 0-.06473.06471-.129139.129131-.38772.3231-.775439.710816-1.163159 1.098543-.06473.06471-.06473.12913-.12914.12913-.32309.323089-.64618.646213-.969301 1.033902-.129137.129143-.32309.258586-.452319.387715-.32309.387728-.710811.775443-1.09853 1.163171-.06473.129132-.19386.193858-.258582.323087-.516952.516983-.969302 1.033928-1.486252 1.550885-.06473.06471-.129138.129128-.193859.193858-1.033931 1.098529-2.132463 2.197059-3.295594 3.166352-1.163159 1.0339-2.390922 2.0032-3.618711 2.84325-1.292392.9047-2.520152 1.68011-3.877173 2.45555-1.292392.71079-2.649412 1.35701-4.071032 1.9386-1.357022.58157-2.778641 1.09854-4.200264 1.55085-2.714041.58157-5.492684 1.68011-7.883605 1.87397-.51695 0-1.098531.12915-1.615482.19385-.581578.12914-1.098529.25859-1.615479.38774-.516951.19384-1.033931.38771-1.550883.58156-.516951.19386-1.033901.45235-1.550852.71083-.45235.32308-.969299.58157-1.421651.90466-.452322.32309-.904672.7108-1.292393 1.09853-.452319.32312-.904669.77545-1.29239 1.16315-.387721.45237-.77544.84008-1.0985304 1.29239-.3230901.51695-.7108108.96931-.9693016 1.48627-.32309.45235-.6461799.96929-.9046707 1.48622-.2585815.58161-.5169498 1.09855-.7108107 1.68014-.1938599.51695-.3877199 1.09852-.5815799 1.68011-.1291382.51694-.2585813 1.0339-.3230898 1.55083 0 .0648-.064719.12916-.064719.19387-.1291392.58161-.1291392 1.35706-.1938608 1.74479-.064719.45232-.1291373.84002-.1291373 1.29238 0 .25858 0 .58155.064719.84003.064719.45236.1291371.84007.2585814 1.22782.1291382.38766.2585815.77539.4523201 1.16312v.0647c.1938599.38775.4523506.77545.7108108 1.16317.2585814.38772.5169804.77544.8400704 1.16317.3230899.32309.7108109.71078 1.0985304 1.03389.3877209.38772.7754421.71081 1.2277611 1.0339 1.550881 1.35703 1.938601 1.80938 3.941806 2.84327.323087.19387.64621.32311 1.03393.51697.06473 0 .129139.0647.193859.0647 0 .12913 0 .19387.06473.32313.06472.51696.193859 1.03389.32309 1.55086.129138.58158.323121 1.09855.516981 1.55087.19386.38773.32309.77543.516951 1.16317.06472.12915.12914.25858.19386.32309.258581.51694.51695.96932.77541 1.42162.323121.45233.64621.90466.969299 1.35703.323092.3877.710813.84004 1.098532 1.22775.387721.38773.775442.71083 1.227793 1.09852 0 0 .06473.0648.129137.0648.387722.32312.77544.64622 1.163162.90466.45232.32311.90467.58157 1.421619.84007.452351.25858.969302.51695 1.486252.71082.387721.19386.84004.32311 1.292392.45234.06473.0648.129138.0648.258582.12916.258581.0648.581548.12912.840039.19384-.193859 3.48945-.258582 6.78504.258583 7.94822.58155 1.29238 3.424821-2.64941 6.268094-7.17277-.387719 4.45875-.646211 9.6929 0 11.24381.710809 1.61545 4.587982-3.42487 7.948203-8.98215 45.815262-10.59757 87.62418 21.066 92.01829 65.78273-.84006-6.97892-9.43446-10.85608-13.37623-9.88677-1.93861 4.78183-5.2342 10.92068-10.53299 14.73324.45233-4.2649.25856-8.65901-.64619-12.92392-1.42165 5.94501-4.2003 11.50232-8.01287 16.28415-6.138857.45232-12.277729-2.52019-15.50872-6.97891-.258582-.19388-.323091-.58159-.516951-.84006-.193862-.45238-.387719-.90467-.516951-1.35703-.193859-.45232-.323089-.90467-.387719-1.35699-.06473-.45236-.06473-.90469-.06473-1.42163 0-.32312 0-.6462 0-.96928.06473-.45238.19386-.90471.323091-1.35705.129138-.45232.25858-.90467.45235-1.35701.258582-.45231.45232-.90466.775441-1.35698 1.09853-3.10178 1.09853-5.62192-.90467-7.10816-.387721-.25858-.775441-.45236-1.227791-.64622-.258584-.0647-.581582-.19386-.84004-.25857-.193861-.0647-.32309-.12916-.516951-.19387-.452351-.12914-.904702-.25859-1.357022-.32309-.45235-.12913-.90467-.19386-1.35702-.19386-.452321-.0648-.969303-.12914-1.421622-.12914-.323089 0-.64621.0647-.969301.0647-.516949 0-.969299.0648-1.421621.19386-.45235.0648-.904669.12913-1.357019.25856-.452322.12915-.904673.25859-1.357023.45238-.452319.19385-.840041.38771-1.292389.58157-.38769.19387-.775412.45232-1.227761.64618-15.056371 9.82217-6.074235 32.82674 4.200264 39.48256-3.877175.71081-7.818947 1.5509-8.917479 2.39092-.06473.0647-.129138.12915-.129138.12915 2.778642 1.68009 5.686516 3.10173 8.723616 4.32949 4.135665 1.35702 8.529786 2.58479 10.468387 3.10176v.0647c5.363424 1.09854 10.79148 1.48626 16.284139 1.16317 28.62649-2.00321 52.0834-23.78003 56.3483-52.47111.12914.58159.25858 1.09852.38772 1.68012.19387 1.16312.45232 2.3909.58155 3.61867v.0648c.12914.58158.19386 1.16315.25858 1.6801v.25859c.0648.58157.12915 1.16316.12915 1.6801.0647.71082.12914 1.42162.12914 2.13247v1.0339c0 .32312.0647.7108.0647 1.03392 0 .38773-.0647.77542-.0647 1.16314v.90467c0 .45236-.0648.84006-.0648 1.2924 0 .25856 0 .51696-.0647.84006 0 .45236-.0647.90466-.0647 1.42162-.0648.19386-.0648.38772-.0648.58159-.0647.51696-.12914.9693-.19387 1.48626 0 .19387 0 .38771-.0647.58159-.0648.64617-.19385 1.22777-.25855 1.87394v.0648.0647c-.12914.58157-.2586 1.22776-.38775 1.80933v.19387c-.12912.58156-.25858 1.16316-.3877 1.74471 0 .0648-.0647.19387-.0647.25856-.12916.5816-.2586 1.16317-.45232 1.74478v.19384c-.19386.64617-.38773 1.22776-.51698 1.80934-.0647.0647-.0647.12914-.0647.12914-.19387.64621-.38771 1.29239-.58155 1.93858-.25858.64621-.45234 1.22778-.71081 1.87398-.25857.6462-.45236 1.2924-.71083 1.87396-.25859.64622-.51697 1.2278-.77543 1.87397h-.0648c-.2586.58157-.51699 1.22779-.8401 1.80938-.0647.19383-.12912.32309-.19384.4523-.0647.0648-.0647.12914-.12914.19388-4.20026 8.46514-10.40377 15.89639-18.15809 21.71217-.51695.32309-1.03392.71082-1.55086 1.09852-.12915.12915-.32312.19388-.45235.32309-.45235.3231-.90468.64618-1.42161.96931l.19385.38772h.0647c.90466-.12913 1.80934-.25858 2.71402-.38772h.0647c1.68012-.25858 3.36023-.58158 5.04035-.90467.45231-.0648.9693-.19385 1.42161-.32312.32309-.0648.58158-.12913.90467-.19386.45235-.0648.90468-.19386 1.35704-.25857.3877-.12914.77543-.19388 1.16314-.3231 6.46195-1.55089 12.73007-3.68335 18.73965-6.20349-10.27448 14.02243-24.03847 25.33087-40.12874 32.76212 7.43127-.51696 14.86251-1.74472 22.03528-3.81254 26.0417-7.68977 47.94772-25.20165 61.06549-48.7878-2.6494 14.92714-8.5944 29.14344-17.38265 41.55041 6.26809-4.13569 12.01923-8.91753 17.25342-14.34557 14.47478-15.12097 23.97388-34.31296 27.20483-54.92665 2.19708 10.2099 2.84328 20.74293 1.87398 31.14666 46.65534-65.07192 3.87717-132.53476-14.02244-150.305141-.0648-.129133-.12914-.193858-.12914-.323089-.0648.0647-.0648.0647-.0648.129144 0-.06471 0-.06471-.0647-.129144 0 .775442-.0647 1.550848-.12914 2.326291-.19387 1.48625-.38771 2.907879-.64621 4.329529-.32308 1.42162-.71081 2.84322-1.09854 4.26488-.45232 1.35699-.96925 2.77862-1.55085 4.13565-.58158 1.29237-1.22778 2.64939-1.93859 3.9418-.71082 1.22778-1.48625 2.52016-2.32629 3.6833-.84006 1.2278-1.74474 2.39093-2.64943 3.48944-.96931 1.16318-2.00319 2.1971-3.03712 3.23101-.64618.58158-1.22775 1.09853-1.87398 1.61546-.51694.45236-.96927.84009-1.48625 1.29239-1.16314.90468-2.32629 1.74474-3.61867 2.52019-1.22778.77542-2.52014 1.55086-3.81254 2.19707-1.35702.64619-2.71404 1.22776-4.07104 1.80935-1.35702.51693-2.77864.96928-4.20031 1.35701-1.42161.3877-2.90785.71081-4.32949.96928-1.48623.25858-2.97249.38771-4.39412.51697-1.03392.0647-2.06782.12915-3.10175.12915-1.48626 0-2.97248-.12915-4.39412-.25858-1.48624-.12914-2.97251-.32314-4.39413-.64623-1.48625-.25858-2.9079-.64621-4.32953-1.09851h-.0647c1.42163-.12914 2.84327-.2586 4.26492-.51697 1.48622-.25858 2.90785-.58156 4.3295-.96931 1.42162-.38771 2.84325-.84006 4.20026-1.357 1.42162-.51696 2.77865-1.16313 4.07105-1.80936 1.357-.64621 2.58478-1.357 3.87716-2.13244 1.22776-.84005 2.45554-1.68009 3.61869-2.58479 1.16316-.90466 2.26167-1.87394 3.29562-2.90786 1.09853-.96932 2.06781-2.06784 3.03711-3.16638.96927-1.16312 1.87396-2.32628 2.71402-3.48944.12915-.19387.25859-.45232.38774-.64619.64617-1.03392 1.29235-2.06783 1.87392-3.10176.71083-1.29239 1.35704-2.58479 1.9386-3.94177.58159-1.35702 1.09855-2.71405 1.55089-4.13566.45232-1.35703.77542-2.77864 1.09853-4.200258.25859-1.486258.51694-2.90791.64619-4.329528.12914-1.486244.25857-2.972503.25857-4.394119 0-1.033928-.0648-2.06783-.12912-3.101733-.12915-1.486246-.32311-2.9079-.51696-4.329519-.25859-1.486257-.58157-2.907873-.96931-4.329529-.45231-1.356991-.90467-2.778634-1.42161-4.135623-.51699-1.357028-1.16315-2.714042-1.80938-4.006443-.71081-1.292388-1.42161-2.584776-2.19704-3.812536-.84005-1.22776-1.68013-2.390917-2.5848-3.554087-.96927-1.098531-1.93857-2.19706-2.97251-3.29559-.51694-.516947-1.09853-1.098532-1.6801-1.615476-2.90787-2.2617-5.945-4.394159-8.9821-6.332732-.45233-.258574-.84005-.452342-1.2924-.646212-2.13246-1.356992-4.13566-2.067831-6.13885-2.714007z" fill="#e0234e" fill-rule="evenodd" transform="translate(0 -41.412487)"/>
    </svg>`,
  },
  /* TypeScript — top face */
  top: {
    brand: "#3178C6",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#3178C6"/>
      <text x="50" y="65" text-anchor="middle" font-size="38" font-weight="bold" fill="white" font-family="Arial,sans-serif">TS</text>
    </svg>`,
  },
  /* Node.js — bottom face */
  bottom: {
    brand: "#539E43",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="#1a1a1a"/>
      <path d="M50 12 L83 31 L83 69 L50 88 L17 69 L17 31Z" fill="#3c873a"/>
      <text x="50" y="50" text-anchor="middle"
        font-family="Arial,sans-serif" font-weight="700"
        font-size="11.5" fill="white">node.js</text>
    </svg>`,
  },
};

/* ─── SVG → THREE.CanvasTexture ──────────────────────────── */
function buildTexture(svg: string, size = 256, pad = 12): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const texture = new THREE.CanvasTexture(canvas);
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, pad, pad, size - pad * 2, size - pad * 2);
    texture.needsUpdate = true;
    URL.revokeObjectURL(url);
  };
  img.src = url;
  return texture;
}

/* ─── Sticker config ─────────────────────────────────────── */
interface StickerCfg {
  axis: "x" | "y" | "z";
  sign: 1 | -1;
  pos: [number, number, number];
  rot: [number, number, number];
  face: FaceName;
}

const STICKERS: StickerCfg[] = [
  { axis: "x", sign: 1, pos: [SOFF, 0, 0], rot: [0, Math.PI / 2, 0], face: "right" },
  { axis: "x", sign: -1, pos: [-SOFF, 0, 0], rot: [0, -Math.PI / 2, 0], face: "left" },
  { axis: "y", sign: 1, pos: [0, SOFF, 0], rot: [-Math.PI / 2, 0, 0], face: "top" },
  { axis: "y", sign: -1, pos: [0, -SOFF, 0], rot: [Math.PI / 2, 0, 0], face: "bottom" },
  { axis: "z", sign: 1, pos: [0, 0, SOFF], rot: [0, 0, 0], face: "front" },
  { axis: "z", sign: -1, pos: [0, 0, -SOFF], rot: [0, Math.PI, 0], face: "back" },
];

/* ─── Move → face mapping for glow color ────────────────── */
const MOVE_FACE: Record<string, FaceName> = {
  "R": "right", "R'": "right",
  "L": "left", "L'": "left",
  "U": "top", "U'": "top",
  "D": "bottom", "D'": "bottom",
  "F": "front", "F'": "front",
  "B": "back", "B'": "back",
};

/* ─── Move definitions ───────────────────────────────────── */
type MoveName =
  | "R" | "R'" | "L" | "L'"
  | "U" | "U'" | "D" | "D'"
  | "F" | "F'" | "B" | "B'";

interface MoveCfg {
  axis: "x" | "y" | "z";
  layer: 1 | -1;
  angle: number;
  tf: (x: number, y: number, z: number) => [number, number, number];
}

const MOVES: Record<MoveName, MoveCfg> = {
  "R": { axis: "x", layer: 1, angle: -Math.PI / 2, tf: (x, y, z) => [x, z, -y] },
  "R'": { axis: "x", layer: 1, angle: Math.PI / 2, tf: (x, y, z) => [x, -z, y] },
  "L": { axis: "x", layer: -1, angle: Math.PI / 2, tf: (x, y, z) => [x, -z, y] },
  "L'": { axis: "x", layer: -1, angle: -Math.PI / 2, tf: (x, y, z) => [x, z, -y] },
  "U": { axis: "y", layer: 1, angle: -Math.PI / 2, tf: (x, y, z) => [-z, y, x] },
  "U'": { axis: "y", layer: 1, angle: Math.PI / 2, tf: (x, y, z) => [z, y, -x] },
  "D": { axis: "y", layer: -1, angle: Math.PI / 2, tf: (x, y, z) => [z, y, -x] },
  "D'": { axis: "y", layer: -1, angle: -Math.PI / 2, tf: (x, y, z) => [-z, y, x] },
  "F": { axis: "z", layer: 1, angle: -Math.PI / 2, tf: (x, y, z) => [y, -x, z] },
  "F'": { axis: "z", layer: 1, angle: Math.PI / 2, tf: (x, y, z) => [-y, x, z] },
  "B": { axis: "z", layer: -1, angle: Math.PI / 2, tf: (x, y, z) => [-y, x, z] },
  "B'": { axis: "z", layer: -1, angle: -Math.PI / 2, tf: (x, y, z) => [y, -x, z] },
};

function invertMove(m: MoveName): MoveName {
  return m.endsWith("'") ? (m.slice(0, -1) as MoveName) : ((m + "'") as MoveName);
}

const SCRAMBLE: MoveName[] = [
  "U", "R", "F", "R'", "U", "R", "F", "U", "F", "B",
  "L", "D", "B'", "L'", "U'", "R", "F", "B", "D", "L",
];
const SOLVE: MoveName[] = [...SCRAMBLE].reverse().map(invertMove);

/* ─── Types ──────────────────────────────────────────────── */
interface CubieState {
  cx: number; cy: number; cz: number;   // mutable logical position
  ix: number; iy: number; iz: number;   // immutable initial position (key + sticker config)
  groupRef: React.RefObject<THREE.Group | null>;
}

/* ─── Sparks ─────────────────────────────────────────────── */
interface SparksHandle {
  burst(pos: THREE.Vector3, color: string): void;
}

const Sparks = forwardRef<SparksHandle>(function Sparks(_props, ref) {
  const grpRef = useRef<THREE.Group>(null!);
  const geo = useRef(new THREE.SphereGeometry(0.055, 4, 4)).current;

  useImperativeHandle(ref, () => ({
    burst(pos: THREE.Vector3, color: string) {
      const grp = grpRef.current;
      if (!grp) return;
      for (let i = 0; i < 16; i++) {
        const mat = new THREE.MeshBasicMaterial({
          color, transparent: true, opacity: 1,
          blending: THREE.AdditiveBlending, depthWrite: false,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        grp.add(mesh);
        const dir = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
        ).normalize().multiplyScalar(0.7 + Math.random() * 1.6);
        gsap.to(mesh.position, {
          x: pos.x + dir.x, y: pos.y + dir.y, z: pos.z + dir.z,
          duration: 0.40 + Math.random() * 0.30, ease: "power2.out",
        });
        gsap.to(mat, {
          opacity: 0,
          duration: 0.45 + Math.random() * 0.25, ease: "power2.in",
          onComplete: () => { grp.remove(mesh); mat.dispose(); },
        });
      }
    },
  }));

  return <group ref={grpRef} />;
});

/* ─── Holographic orbit light ────────────────────────────── */
function HoloLight() {
  const lightRef = useRef<THREE.PointLight>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.38;
    const r = 3.8;
    lightRef.current.position.set(
      Math.cos(t) * r,
      Math.sin(t * 0.65) * 1.8,
      Math.sin(t) * r,
    );
    lightRef.current.color.setHSL((t * 0.11) % 1, 1, 0.55);
  });
  return <pointLight ref={lightRef} intensity={1.6} distance={9} decay={2} />;
}

/* ─── Cubelet ────────────────────────────────────────────── */
interface CubeletProps {
  cubieRef: React.RefObject<THREE.Group | null>;
  initCx: number;
  initCy: number;
  initCz: number;
  delay: number;
  bodyMat: THREE.MeshStandardMaterial;
  stickerGeo: THREE.PlaneGeometry;
  faceMats: Record<FaceName, THREE.MeshStandardMaterial>;
}

function Cubelet({
  cubieRef, initCx, initCy, initCz, delay,
  bodyMat, stickerGeo, faceMats,
}: CubeletProps) {
  const progressRef = useRef(0);
  const target = new THREE.Vector3(initCx * GAP, initCy * GAP, initCz * GAP);
  const origin = new THREE.Vector3(
    initCx * GAP * 4.5,
    initCy * GAP * 4.5 + 7,
    initCz * GAP * 4.5,
  );

  useFrame(({ clock }, delta) => {
    const group = cubieRef.current;
    if (!group || progressRef.current >= 1) return;
    const t = clock.elapsedTime - delay;
    if (t <= 0) return;
    progressRef.current = Math.min(1, progressRef.current + delta * 1.35);
    const ease = 1 - Math.pow(1 - progressRef.current, 3);
    group.position.lerpVectors(origin, target, ease);
  });

  const stickers = STICKERS.filter(s => {
    const v: Record<string, number> = { x: initCx, y: initCy, z: initCz };
    return v[s.axis] === s.sign;
  });

  return (
    <group ref={cubieRef} position={origin.toArray()}>
      <RoundedBox args={[CUBIE, CUBIE, CUBIE]} radius={0.07} smoothness={4} castShadow receiveShadow>
        <primitive object={bodyMat} attach="material" />
      </RoundedBox>
      {stickers.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot}>
          <primitive object={stickerGeo} attach="geometry" />
          <primitive object={faceMats[s.face]} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

/* ─── CubeScene ──────────────────────────────────────────── */
function CubeScene() {
  const outerRef = useRef<THREE.Group>(null!);
  const cubeGrpRef = useRef<THREE.Group>(null!);
  const pivotRef = useRef<THREE.Group>(null!);
  const glowRef = useRef<THREE.PointLight>(null!);
  const sparksRef = useRef<SparksHandle | null>(null);
  const hovered = useRef(false);
  const { camera } = useThree();

  const bodyMat = useRef(
    new THREE.MeshStandardMaterial({ color: "#0d0d0d", roughness: 0.18, metalness: 0.22 })
  ).current;
  const stickerGeo = useRef(new THREE.PlaneGeometry(STICKER, STICKER)).current;

  /* logo textures + metallic sticker materials */
  const faceMats = useRef<Record<FaceName, THREE.MeshStandardMaterial>>(
    (() => {
      const out = {} as Record<FaceName, THREE.MeshStandardMaterial>;
      (Object.keys(FACE_CFGS) as FaceName[]).forEach(face => {
        const cfg = FACE_CFGS[face];
        const tex = buildTexture(cfg.svg);
        out[face] = new THREE.MeshStandardMaterial({
          map: tex,
          emissive: new THREE.Color(cfg.brand),
          emissiveMap: tex,
          emissiveIntensity: 0.08,
          roughness: 0.10,
          metalness: 0.40,
          transparent: true,
          alphaTest: 0.01,
        });
      });
      return out;
    })()
  ).current;

  /* per-face glow impulse (decays each frame, no GSAP conflict) */
  const faceGlow = useRef<Record<FaceName, number>>({
    front: 0, back: 0, right: 0, left: 0, top: 0, bottom: 0,
  }).current;

  const cubies = useRef<CubieState[]>(
    (() => {
      const list: CubieState[] = [];
      for (let x = -1; x <= 1; x++)
        for (let y = -1; y <= 1; y++)
          for (let z = -1; z <= 1; z++)
            list.push({ cx: x, cy: y, cz: z, ix: x, iy: y, iz: z, groupRef: createRef<THREE.Group>() });
      return list;
    })()
  ).current;

  const queue = useRef<MoveName[]>([]);
  const animating = useRef(false);
  const speedRef = useRef(1);

  const processQueue = useCallback(() => {
    if (animating.current || queue.current.length === 0) return;
    animating.current = true;

    const name = queue.current.shift()!;
    const cfg = MOVES[name];
    const pivot = pivotRef.current;
    const cubeGrp = cubeGrpRef.current;
    const speed = speedRef.current;

    pivot.rotation.set(0, 0, 0);
    pivot.updateMatrixWorld(true);

    const affected = cubies.filter(c => {
      const v: Record<string, number> = { x: c.cx, y: c.cy, z: c.cz };
      return v[cfg.axis] === cfg.layer;
    });
    affected.forEach(c => { if (c.groupRef.current) pivot.attach(c.groupRef.current); });

    /* spike the face glow */
    const faceName = MOVE_FACE[name] ?? "front";
    const brandColor = FACE_CFGS[faceName].brand;
    faceGlow[faceName] = 1.4;

    /* flash point light */
    const glow = glowRef.current;
    if (glow) {
      glow.color.set(brandColor);
      gsap.killTweensOf(glow);
      gsap.fromTo(glow, { intensity: 0 }, {
        intensity: 5, duration: 0.10 / speed,
        ease: "power2.out", yoyo: true, repeat: 1,
      });
    }

    /* camera FOV punch */
    const cam = camera as THREE.PerspectiveCamera;
    gsap.killTweensOf(cam);
    gsap.to(cam, {
      fov: 43, duration: 0.09 / speed, ease: "power2.out",
      onUpdate: () => cam.updateProjectionMatrix(),
      onComplete: () => gsap.to(cam, {
        fov: 40, duration: 0.28 / speed, ease: "power2.inOut",
        onUpdate: () => cam.updateProjectionMatrix(),
      }),
    });

    /* sparks */
    const sparks = sparksRef.current;
    if (sparks && affected.length > 0) {
      const center = new THREE.Vector3();
      affected.forEach(c => {
        if (c.groupRef.current)
          center.add(c.groupRef.current.getWorldPosition(new THREE.Vector3()));
      });
      center.divideScalar(affected.length);
      sparks.burst(center, brandColor);
    }

    gsap.to(pivot.rotation, {
      [cfg.axis]: cfg.angle,
      duration: 0.46 / speed,
      ease: speed > 1.5 ? "power3.inOut" : "back.out(1.45)",
      onComplete: () => {
        affected.forEach(c => {
          const g = c.groupRef.current;
          if (!g) return;
          cubeGrp.attach(g);
          const [nx, ny, nz] = cfg.tf(c.cx, c.cy, c.cz);
          c.cx = Math.round(nx);
          c.cy = Math.round(ny);
          c.cz = Math.round(nz);
        });
        animating.current = false;
        setTimeout(processQueue, speed > 1.5 ? 40 : 110);
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const phaseDur = (seq: MoveName[], spd: number) =>
      seq.length * (0.46 / spd + (spd > 1.5 ? 0.04 : 0.11)) * 1000;

    const runLoop = () => {
      if (cancelled) return;
      speedRef.current = 2.8;
      SCRAMBLE.forEach(m => queue.current.push(m));
      processQueue();
      const t1 = setTimeout(() => {
        if (cancelled) return;
        speedRef.current = 0.71;
        SOLVE.forEach(m => queue.current.push(m));
        processQueue();
        timers.push(setTimeout(runLoop, phaseDur(SOLVE, 0.71) + 1600));
      }, phaseDur(SCRAMBLE, 2.8) + 700);
      timers.push(t1);
    };

    timers.push(setTimeout(runLoop, 2200));
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* holographic shimmer + hover boost + glow decay */
  useFrame(({ clock }, delta) => {
    outerRef.current.position.y = Math.sin(clock.elapsedTime * 0.72) * 0.09;

    const t = clock.elapsedTime;
    const boost = hovered.current ? 3.2 : 1.0;
    (Object.keys(faceMats) as FaceName[]).forEach((face, i) => {
      faceGlow[face] = Math.max(0, faceGlow[face] - delta * 2.8);
      const shimmer = 0.06 + 0.04 * Math.sin(t * 1.5 + i * (Math.PI * 2 / 6));
      faceMats[face].emissiveIntensity = (shimmer + faceGlow[face] * 0.9) * boost;
    });
  });

  return (
    <group ref={outerRef}>
      <group ref={cubeGrpRef}>
        {/* invisible hover hitbox */}
        <mesh
          onPointerEnter={() => { hovered.current = true; }}
          onPointerLeave={() => { hovered.current = false; }}
        >
          <sphereGeometry args={[2.1, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {cubies.map((c) => (
          <Cubelet
            key={`${c.ix}_${c.iy}_${c.iz}`}
            cubieRef={c.groupRef}
            initCx={c.ix}
            initCy={c.iy}
            initCz={c.iz}
            delay={(Math.abs(c.cx) + Math.abs(c.cy) + Math.abs(c.cz)) * 0.09}
            bodyMat={bodyMat}
            stickerGeo={stickerGeo}
            faceMats={faceMats}
          />
        ))}
      </group>

      <group ref={pivotRef} />
      <pointLight ref={glowRef} position={[0, 0, 0]} intensity={0} distance={4} decay={2} />
      <HoloLight />
      <Sparks ref={sparksRef} />
    </group>
  );
}

/* ─── Root export ─────────────────────────────────────────── */
export default function RubiksCube() {
  return (
    <Wrapper>
      <CanvasWrapper>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <PerspectiveCamera makeDefault position={[5.5, 4, 5.2]} fov={40} />

          <ambientLight intensity={0.42} />
          <directionalLight
            position={[6, 10, 5]} intensity={2.0} castShadow
            shadow-mapSize-width={1024} shadow-mapSize-height={1024}
            shadow-camera-near={0.5} shadow-camera-far={30}
            shadow-camera-left={-4} shadow-camera-right={4}
            shadow-camera-top={4} shadow-camera-bottom={-4}
          />
          <directionalLight position={[-5, 1, -4]} intensity={0.4} color="#b8ccee" />
          <pointLight position={[0, -6, 2]} intensity={0.3} />

          <Suspense fallback={null}>
            <Environment preset="city" background={false} />
          </Suspense>

          <CubeScene />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
            <planeGeometry args={[30, 30]} />
            <shadowMaterial transparent opacity={0.12} />
          </mesh>

          <OrbitControls
            makeDefault
            enablePan={false} enableZoom={false}
            enableDamping dampingFactor={0.055} rotateSpeed={0.72}
            autoRotate autoRotateSpeed={0.5}
            minPolarAngle={Math.PI * 0.18} maxPolarAngle={Math.PI * 0.80}
          />
        </Canvas>
      </CanvasWrapper>
      <DragHint>↺ Drag to explore all 6 tech stacks</DragHint>
    </Wrapper>
  );
}
