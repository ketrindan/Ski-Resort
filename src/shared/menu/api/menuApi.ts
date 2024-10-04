import MenuItem from "@mui/material/MenuItem";
import type { ComponentProps } from "react";

export type CardMenuItem = ComponentProps<typeof MenuItem> & {
  text: string;
  id: string;
};
