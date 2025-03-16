type SVGGlobalAttributes = {
  id?: string;
  class?: string;
  style?: string;
  tabindex?: number;
  lang?: string;
  role?: string;
  dataset?: Record<string, string>; // `data-*` attributes
  // Accessibility
  ariaLabel?: string;
  ariaHidden?: boolean;
  ariaDescribedBy?: string;
};

type SVGPresentationAttributes = {
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  strokeDasharray?: string;
  strokeDashoffset?: string;
  opacity?: number;
  visibility?: "visible" | "hidden" | "collapse";
  transform?: string;
  clipPath?: string;
  mask?: string;
  filter?: string;
  cursor?: string;
};

type SVGShapeAttributes = {
  rect: {
    x?: number;
    y?: number;
    width: number;
    height: number;
    rx?: number;
    ry?: number;
  };
  circle: { cx: number; cy: number; r: number };
  ellipse: { cx: number; cy: number; rx: number; ry: number };
  line: { x1: number; y1: number; x2: number; y2: number };
  polyline: { points: string };
  polygon: { points: string };
};

type SVGPathAttributes = {
  path: { d: string; pathLength?: number };
};

type SVGTextAttributes = {
  text: {
    x?: number;
    y?: number;
    dx?: number;
    dy?: number;
    textAnchor?: "start" | "middle" | "end";
  };
  tspan: { x?: number; y?: number; dx?: number; dy?: number };
  textPath: { href: string };
};

type SVGContainerAttributes = {
  g: {};
  svg: {
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    xmlns?: string;
  };
  defs: {};
  symbol: { viewBox?: string };
  use: {
    href?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  };
};

type SVGGradientAttributes = {
  linearGradient: {
    x1?: string;
    y1?: string;
    x2?: string;
    y2?: string;
    gradientUnits?: string;
  };
  radialGradient: {
    cx?: string;
    cy?: string;
    r?: string;
    fx?: string;
    fy?: string;
    gradientUnits?: string;
  };
  pattern: { patternUnits?: string; patternContentUnits?: string };
};

type SVGClipMaskAttributes = {
  clipPath: {};
  mask: {};
};

type SVGFilterAttributes = {
  filter: {
    x?: string;
    y?: string;
    width?: string;
    height?: string;
    filterUnits?: string;
  };
  feGaussianBlur: { stdDeviation: number };
  feOffset: { dx: number; dy: number };
  feBlend: { mode?: string };
};

// Combine global attributes, presentation attributes, and specific attributes
type SVGAttributes<T extends keyof SVGElementTagNameMap> = SVGGlobalAttributes &
  SVGPresentationAttributes &
  (T extends keyof SVGShapeAttributes
    ? SVGShapeAttributes[T]
    : T extends keyof SVGPathAttributes
      ? SVGPathAttributes[T]
      : T extends keyof SVGTextAttributes
        ? SVGTextAttributes[T]
        : T extends keyof SVGContainerAttributes
          ? SVGContainerAttributes[T]
          : T extends keyof SVGGradientAttributes
            ? SVGGradientAttributes[T]
            : T extends keyof SVGClipMaskAttributes
              ? SVGClipMaskAttributes[T]
              : T extends keyof SVGFilterAttributes
                ? SVGFilterAttributes[T]
                : {}); // Default empty object if no match

export type SVGProperties<T extends keyof SVGElementTagNameMap> = Partial<
  SVGElementTagNameMap[T]
> &
  Record<string, string | number | boolean>;

export interface SVGVNode<
  T extends keyof SVGElementTagNameMap = keyof SVGElementTagNameMap,
> {
  tag: T;
  attrs: SVGAttributes<T>;
  props: SVGProperties<T>;
  children: SVGVNode[];
  el?: SVGElementTagNameMap[T];
}

export function createSvgVNode<T extends keyof SVGElementTagNameMap>(
  tag: T,
): SVGVNode<T>;
export function createSvgVNode<T extends keyof SVGElementTagNameMap>(
  tag: T,
  children: SVGVNode[],
): SVGVNode<T>;
export function createSvgVNode<T extends keyof SVGElementTagNameMap>(
  tag: T,
  props: SVGAttributes<T>,
): SVGVNode<T>;
export function createSvgVNode<T extends keyof SVGElementTagNameMap>(
  tag: T,
  props: SVGProperties<T>,
  attrs: SVGAttributes<T>,
): SVGVNode<T>;
export function createSvgVNode<T extends keyof SVGElementTagNameMap>(
  tag: T,
  props: SVGProperties<T>,
  attrs: SVGAttributes<T>,
  children: SVGVNode[],
): SVGVNode<T>;
export function createSvgVNode<T extends keyof SVGElementTagNameMap>(
  tag: T,
  ...args: (SVGAttributes<T> | SVGVNode[])[]
): SVGVNode<T> {
  let attrs: SVGAttributes<T> | {} = {};
  let props: SVGProperties<T> = {};
  let children: SVGVNode[] = [];

  if (typeof args[0] === "object" && !Array.isArray(args[0])) {
    props = args[0] as SVGProperties<T>;
  }

  if (typeof args[1] === "object" && !Array.isArray(args[1])) {
    attrs = args[1] as SVGAttributes<T>;
  }

  if (Array.isArray(args[args.length - 1])) {
    children = args[args.length - 1] as SVGVNode[];
  }

  const createProxy = <T>(obj: T) =>
    new Proxy(obj as object, {
      set(target, key, value) {
        target[key] = value;
        return true;
      },
    });

  let SvgVnode: SVGVNode<T> = {
    tag,
    props: createProxy(props) as SVGProperties<T>,
    attrs: createProxy(attrs) as SVGAttributes<T>,
    children: createProxy(children) as SVGVNode[],
  };

  return SvgVnode;
}
