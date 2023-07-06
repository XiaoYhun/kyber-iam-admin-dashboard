import { Create, useAutocomplete } from "@refinedev/mui";
import { Box, Autocomplete, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const ClientCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }} autoComplete="off">
        <TextField
          {...register("client_name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.client_name}
          helperText={(errors as any)?.client_name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Client Name"
          name="client_name"
        />
      </Box>
    </Create>
  );
};
