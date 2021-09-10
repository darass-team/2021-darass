declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
declare module "*.pdf";

declare type ObjectValueType<T> = T[keyof T];

declare type OptionalBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
