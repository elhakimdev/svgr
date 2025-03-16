import { describe, expect, test } from "vitest";
import { createSvgVNode } from "../svg-vnode";

describe("Describe Svg VNode Factory Function", () => {
  test("It should create 'svg' tag only", (ctx) => {
    const svgNode = createSvgVNode("svg");

    expect(svgNode).toStrictEqual({
      tag: "svg",
      props: {},
      attrs: {},
      children: [],
    });
    expect(svgNode.tag).toStrictEqual("svg");
    expect(svgNode.props).toStrictEqual({});
    expect(svgNode.attrs).toStrictEqual({});
    expect(svgNode.children).toStrictEqual([]);
    expect(svgNode.children.length).toStrictEqual(0);
    expect(svgNode.el).toStrictEqual(undefined);
  });

  test("It should create 'svg' tag with props", (ctx) => {
    const svgNode = createSvgVNode("svg", {
      width: 200,
      height: 300,
    });

    expect(svgNode).toStrictEqual({
      tag: "svg",
      props: {
        width: 200,
        height: 300,
      },
      attrs: {},
      children: [],
    });
    expect(svgNode.tag).toStrictEqual("svg");
    expect(svgNode.props).toStrictEqual({
      width: 200,
      height: 300,
    });
    expect(svgNode.attrs).toStrictEqual({});
    expect(svgNode.props.width).toStrictEqual(200);
    expect(svgNode.props.height).toStrictEqual(300);
    expect(svgNode.attrs).toStrictEqual({});
    expect(svgNode.children).toStrictEqual([]);
    expect(svgNode.children.length).toStrictEqual(0);
    expect(svgNode.el).toStrictEqual(undefined);
  });

  test("It should create 'svg' tag with children", (ctx) => {
    const svgPatVNode = createSvgVNode(
      "path",
      {},
      {
        d: "",
      },
    );
    const svgRootNode = createSvgVNode("svg", [svgPatVNode]);
    expect(svgRootNode).toStrictEqual({
      tag: "svg",
      props: {},
      attrs: {},
      children: [
        {
          tag: "path",
          props: {},
          attrs: {
            d: "",
          },
          children: [],
        },
      ],
    });
    expect(svgRootNode.tag).toStrictEqual("svg");
    expect(svgRootNode.props).toStrictEqual({});
    expect(svgRootNode.children).toStrictEqual([
      {
        tag: "path",
        props: {},
        attrs: {
          d: "",
        },
        children: [],
      },
    ]);
    expect(svgRootNode.children.length).toStrictEqual(1);
    expect(svgRootNode.el).toStrictEqual(undefined);

    expect(svgRootNode.children[0]).toStrictEqual({
      tag: "path",
      props: {},
      attrs: {
        d: "",
      },
      children: [],
    });
    expect(svgRootNode.children[0].tag).toStrictEqual("path");
    expect(svgRootNode.children[0].props).toStrictEqual({});
    expect(svgRootNode.children[0].attrs).toStrictEqual({
      d: "",
    });
    expect(svgRootNode.children[0].children).toStrictEqual([]);
    expect(svgRootNode.children[0].children.length).toStrictEqual(0);
    expect(svgRootNode.children[0].el).toStrictEqual(undefined);
  });

  test("It should create 'svg' tag with props & children (tag only)", (ctx) => {
    const svgPatVNode = createSvgVNode(
      "path",
      {
        id: "pathSvgEl",
      },
      {
        d: "",
      },
    );
    const svgRootNode = createSvgVNode(
      "svg",
      {
        id: "rootSvgEl",
      },
      {
        fill: "blue",
      },
      [svgPatVNode],
    );
    expect(svgRootNode).toStrictEqual({
      tag: "svg",
      props: {
        id: "rootSvgEl",
      },
      attrs: {
        fill: "blue",
      },
      children: [
        {
          tag: "path",
          props: {
            id: "pathSvgEl",
          },
          attrs: {
            d: "",
          },
          children: [],
        },
      ],
    });
    expect(svgRootNode.tag).toStrictEqual("svg");
    expect(svgRootNode.props).toStrictEqual({
      id: "rootSvgEl",
    });
    expect(svgRootNode.props.id).toStrictEqual("rootSvgEl");
    expect(svgRootNode.attrs).toStrictEqual({
      fill: "blue",
    });
    expect(svgRootNode.attrs.fill).toStrictEqual("blue");
    expect(svgRootNode.children).toStrictEqual([
      {
        tag: "path",
        props: {
          id: "pathSvgEl",
        },
        attrs: {
          d: "",
        },
        children: [],
      },
    ]);
    expect(svgRootNode.children.length).toStrictEqual(1);
    expect(svgRootNode.el).toStrictEqual(undefined);

    expect(svgRootNode.children[0]).toStrictEqual({
      tag: "path",
      props: {
        id: "pathSvgEl",
      },
      attrs: {
        d: "",
      },
      children: [],
    });
    expect(svgRootNode.children[0].tag).toStrictEqual("path");
    expect(svgRootNode.children[0].props).toStrictEqual({
      id: "pathSvgEl",
    });
    expect(svgRootNode.children[0].props.id).toStrictEqual("pathSvgEl");
    expect(svgRootNode.children[0].attrs).toStrictEqual({
      d: "",
    });
    expect(svgRootNode.children[0].children).toStrictEqual([]);
    expect(svgRootNode.children[0].children.length).toStrictEqual(0);
    expect(svgRootNode.children[0].el).toStrictEqual(undefined);
  });
});
