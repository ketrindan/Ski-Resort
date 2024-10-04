import Avatar from "@mui/material/Avatar";
import cn from "classnames";
import { FC, useMemo } from "react";
import styles from "./AvatarItem.module.css";

interface IAvatarItem {
  photo?: string;
  variant?: "square" | "circular" | "rounded";
}

const AvatarItem: FC<IAvatarItem> = ({ photo, variant }) => {
  const setVariant = useMemo(() => {
    if (variant) {
      return variant;
    } else {
      return "circular";
    }
  }, [variant]);

  const setClass = cn(styles.avatar, {
    [styles.avatar_mod]: !!variant,
  });

  return (
    <Avatar
      src={photo}
      alt="avatar"
      variant={setVariant}
      className={setClass}
    />
  );
};

export default AvatarItem;
