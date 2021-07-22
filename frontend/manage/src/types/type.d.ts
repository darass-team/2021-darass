declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
declare module "*.pdf";

declare interface Window {
  Kakao: any;
}

declare type ObjectValueType<T> = T[keyof T];
