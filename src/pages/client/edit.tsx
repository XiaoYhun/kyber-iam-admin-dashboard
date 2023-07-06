import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";

export const ClientEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }} autoComplete="off">
        <TextField
          {...register("client_id")}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Client ID"
          name="client_id"
          disabled
        />
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
          variant="outlined"
        />

        <TextField
          {...register("created_at")}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Created At"
          name="created_at"
          disabled
        />
        <TextField
          {...register("updated_at")}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Updated At"
          name="updated_at"
          disabled
        />
      </Box>
    </Edit>
  );
};
