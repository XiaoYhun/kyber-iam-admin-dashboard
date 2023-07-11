import { Create, useAutocomplete } from '@refinedev/mui'
import { Box, Autocomplete, TextField, Checkbox, InputLabel } from '@mui/material'
import { useForm } from '@refinedev/react-hook-form'
import { IResourceComponentsProps } from '@refinedev/core'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Control, Controller, FieldValues, useController, useFieldArray } from 'react-hook-form'

const MultipleOptionsController = ({
  name,
  control,
  options,
  label,
  rules,
  freeSolo,
}: {
  name: string
  control: Control<FieldValues, {}>
  options: string[]
  label: string
  rules?: any
  freeSolo?: boolean
}) => {
  const {
    field: { ref, ...field },
    fieldState: { invalid, error },
  } = useController({
    name: name,
    control,
    rules: rules,
    defaultValue: [],
  })

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <Autocomplete
          multiple
          freeSolo={freeSolo}
          disableCloseOnSelect
          clearOnBlur
          options={options}
          value={field.value}
          onChange={(e, value) => field.onChange(value)}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              type="text"
              margin="normal"
              fullWidth
              label={label}
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
      )}
    />
  )
}

export const ClientCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm()
  console.log('🚀 ~ file: create.tsx:78 ~ getValues:', getValues())

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} autoComplete="off">
        <TextField
          {...register('client_name', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.client_name}
          helperText={(errors as any)?.client_name?.message}
          margin="normal"
          fullWidth
          type="text"
          label="Client Name *"
          name="client_name"
        />

        <Autocomplete
          id="redirect_uris"
          options={['https://kyberswap.com']}
          fullWidth
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!(errors as any)?.redirect_uris}
              helperText={(errors as any)?.redirect_uris?.message}
              margin="normal"
              type="text"
              label="Redirect URIs *"
              name="redirect_uris"
            />
          )}
        />
        <MultipleOptionsController
          name="grant_types"
          control={control}
          options={['authorization_code', 'refresh_token', 'password']}
          label="Grant Types"
        />
        <MultipleOptionsController
          name="response_types"
          control={control}
          options={['code', 'token', 'id_token']}
          label="Response Types"
        />

        <TextField
          {...register('scope')}
          error={!!(errors as any)?.scope}
          helperText={(errors as any)?.scope?.message}
          margin="normal"
          fullWidth
          type="text"
          label="Scope"
          name="scope"
        />
        <TextField
          {...register('subject_type')}
          error={!!(errors as any)?.subject_type}
          helperText={(errors as any)?.subject_type?.message}
          margin="normal"
          fullWidth
          type="text"
          label="Subject Type"
          name="subject_type"
        />
        <TextField
          {...register('token_endpoint_auth_method')}
          error={!!(errors as any)?.token_endpoint_auth_method}
          helperText={(errors as any)?.token_endpoint_auth_method?.message}
          margin="normal"
          fullWidth
          type="text"
          label="Token endpoint auth method"
          name="token_endpoint_auth_method"
        />
        <Autocomplete
          id="post_logout_redirect_uris"
          options={['https://kyberswap.com']}
          fullWidth
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              {...register('post_logout_redirect_uris')}
              error={!!(errors as any)?.post_logout_redirect_uris}
              helperText={(errors as any)?.post_logout_redirect_uris?.message}
              margin="normal"
              fullWidth
              type="text"
              label="Post logout redirect URIs *"
              name="post_logout_redirect_uris"
            />
          )}
        />
        <InputLabel sx={{ fontWeight: 600, fontSize: '1.2em' }}>Metadata</InputLabel>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1em',
            '& > div': { width: '31%' },
            border: '1px solid #555',
            padding: '1em',
            borderRadius: '8px',
          }}
        >
          <MultipleOptionsController
            name="allowed_redirect_query_params"
            control={control}
            options={[]}
            freeSolo
            label="allowed_redirect_query_params"
          />
          <MultipleOptionsController
            name="allowed_login_methods"
            control={control}
            options={['password', 'ethereum', 'google']}
            freeSolo
            label="allowed_login_methods"
          />
          <MultipleOptionsController
            name="login_remember"
            control={control}
            options={[]}
            freeSolo
            label="login_remember"
          />
          <MultipleOptionsController
            name="login_remember_for"
            control={control}
            options={[]}
            freeSolo
            label="login_remember_for"
          />
          <MultipleOptionsController
            name="consent_remember"
            control={control}
            options={[]}
            freeSolo
            label="consent_remember"
          />
          <MultipleOptionsController
            name="consent_remember_for"
            control={control}
            options={[]}
            freeSolo
            label="consent_remember_for"
          />
        </Box>
        <TextField
          {...register('authorization_code_grant_access_token_lifespan')}
          error={!!(errors as any)?.authorization_code_grant_access_token_lifespan}
          helperText={(errors as any)?.authorization_code_grant_access_token_lifespan?.message}
          margin="normal"
          fullWidth
          type="text"
          label="authorization_code_grant_access_token_lifespan"
          name="authorization_code_grant_access_token_lifespan"
        />
        <TextField
          {...register('authorization_code_grant_id_token_lifespan')}
          error={!!(errors as any)?.authorization_code_grant_id_token_lifespan}
          helperText={(errors as any)?.authorization_code_grant_id_token_lifespan?.message}
          margin="normal"
          fullWidth
          type="text"
          label="authorization_code_grant_id_token_lifespan"
          name="authorization_code_grant_id_token_lifespan"
        />
        <TextField
          {...register('password_grant_access_token_lifespan')}
          error={!!(errors as any)?.password_grant_access_token_lifespan}
          helperText={(errors as any)?.password_grant_access_token_lifespan?.message}
          margin="normal"
          fullWidth
          type="text"
          label="password_grant_access_token_lifespan"
          name="password_grant_access_token_lifespan"
        />
        <TextField
          {...register('password_grant_refresh_token_lifespan')}
          error={!!(errors as any)?.password_grant_refresh_token_lifespan}
          helperText={(errors as any)?.password_grant_refresh_token_lifespan?.message}
          margin="normal"
          fullWidth
          type="text"
          label="password_grant_refresh_token_lifespan"
          name="password_grant_refresh_token_lifespan"
        />
        <TextField
          {...register('refresh_token_grant_id_token_lifespan')}
          error={!!(errors as any)?.refresh_token_grant_id_token_lifespan}
          helperText={(errors as any)?.refresh_token_grant_id_token_lifespan?.message}
          margin="normal"
          fullWidth
          type="text"
          label="refresh_token_grant_id_token_lifespan"
          name="refresh_token_grant_id_token_lifespan"
        />
        <TextField
          {...register('refresh_token_grant_access_token_lifespan')}
          error={!!(errors as any)?.refresh_token_grant_access_token_lifespan}
          helperText={(errors as any)?.refresh_token_grant_access_token_lifespan?.message}
          margin="normal"
          fullWidth
          type="text"
          label="refresh_token_grant_access_token_lifespan"
          name="refresh_token_grant_access_token_lifespan"
        />
        <TextField
          {...register('refresh_token_grant_refresh_token_lifespan')}
          error={!!(errors as any)?.refresh_token_grant_refresh_token_lifespan}
          helperText={(errors as any)?.refresh_token_grant_refresh_token_lifespan?.message}
          margin="normal"
          fullWidth
          type="text"
          label="refresh_token_grant_refresh_token_lifespan"
          name="refresh_token_grant_refresh_token_lifespan"
        />
      </Box>
    </Create>
  )
}
