declare module "eruda" {
  export function init();
  export function add(module: any);
}

declare module "eruda-code";
declare module "eruda-dom";

declare module "*.png";

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
