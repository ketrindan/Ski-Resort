import MenuItem from "@mui/material/MenuItem";
import type { ComponentProps } from "react";
import { AnyAction } from "redux";

export type CardMenuItem = ComponentProps<typeof MenuItem> & {
  text: string;
  id: string;
  callback: AnyAction;
};
