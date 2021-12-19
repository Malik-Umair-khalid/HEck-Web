import TextField from '@mui/material/TextField';

function BasicTextField({error, helperText, label, name, type, id, value, onChange, onBlur}) {
  return (
      <TextField 
        sx={{marginBottom: "20px", backgroundColor: "white", borderRadius: "5px"}}
        className="input-field"
        error={error}
        helperText={helperText}
        id={id}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        variant="outlined"
        fullWidth />
  );
}

export {BasicTextField};