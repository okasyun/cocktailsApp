import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";

const SelectInput = (props) => {
    const { label, options, value, handleChange } = props;
    return (
        <>
            <FormControl sx={{ width: "50%" }}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                >
                    {options.map((data) => {
                        return (
                            <MenuItem id={data.id} value={data.value}>
                                {data.label}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </>
    );
};

export default SelectInput;
