import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import cn from "classnames";
import { FC, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputError } from "~shared/input-error";
import styles from "./ImageInput.module.css";

interface IImageInputProps {
  name: string;
  variant?: "square" | "circular" | "rounded";
}

const ImageInput: FC<IImageInputProps> = ({ name, variant }) => {
  const { control } = useFormContext();

  const setVariant = useMemo(() => {
    return variant ?? "circular";
  }, [variant]);

  const setClass = cn(styles.avatar, {
    [styles.avatar_mod]: !!variant,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <Avatar variant={setVariant} className={setClass}>
            <IconButton>
              <label htmlFor="image-input">
                <AddAPhotoIcon className={styles.icon} />
                <input
                  hidden
                  id="image-input"
                  accept="image/*"
                  type="file"
                  value={value}
                  onChange={onChange}
                />
              </label>
            </IconButton>
          </Avatar>
          <InputError message={error?.message as string} />
        </>
      )}
    />
  );
};

export default ImageInput;
