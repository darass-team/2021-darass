import { allSpaces } from "../constants/regex";

export const isEmptyString = (str: string) => str.replace(allSpaces, "").length === 0;
