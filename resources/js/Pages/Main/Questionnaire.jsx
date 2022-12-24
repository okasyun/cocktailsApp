import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { useState } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Slider from "@mui/material/Slider";

import { FormControl } from "@mui/material";
import { Typography } from "@mui/material";
import {
    baseOptions,
    techniqueOptions,
    tasteOptions,
    styleOptions,
    topOptions,
    glassOptions,
} from "/resources/data/selectOptionsData";
import SelectInput from "@/OriginComponents/SelectInput";

const Questionnaire = (props) => {
    const [base, setBase] = useState("");
    const [technique, setTechnique] = useState("");
    const [taste, setTaste] = useState("");
    const [style, setStyle] = useState("");
    const [alcohol, setAlcohol] = useState([0, 20]);
    const [top, setTop] = useState("");
    const [glass, setGlass] = useState("");

    const alcoholChange = (event, newValue) => {
        setAlcohol(newValue);
        console.log(alcohol);
    };

    const alcoholChangeText = (alcohol) => {
        return `${alcohol}o`;
    };

    const handleSubmit = (event) => {
        e.preventDefault();
        setData(evene.target.value);
    };
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    アンケート
                </h2>
            }
        >
            <Head title="アンケート" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            カクテルアンケート
                        </div>
                    </div>
                </div>
            </div>
            <CssBaseline />
            <Box
                component="main"
                maxWidth="xs"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <SelectInput
                    label="ベース"
                    value={base}
                    handleChange={setBase}
                    options={baseOptions}
                />
                <SelectInput
                    label="技法"
                    value={technique}
                    handleChange={setTechnique}
                    options={techniqueOptions}
                />
                <SelectInput
                    label="味わい"
                    value={taste}
                    handleChange={setTaste}
                    options={tasteOptions}
                />
                <SelectInput
                    label="スタイル"
                    value={style}
                    handleChange={setStyle}
                    options={styleOptions}
                />
                <SelectInput
                    label="TOP"
                    value={top}
                    handleChange={setTop}
                    options={topOptions}
                />
                <SelectInput
                    label="グラス"
                    value={glass}
                    handleChange={setGlass}
                    options={glassOptions}
                />

                <FormControl sx={{ width: "50%" }}>
                    <Typography gutterBottom>アルコール度数</Typography>
                    <Slider
                        value={alcohol}
                        onChange={alcoholChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={alcoholChangeText}
                    />
                </FormControl>
            </Box>
        </Authenticated>
    );
};

export default Questionnaire;
