import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import SelectInput from "@/OriginComponents/SelectInput";
import {
    baseOptions,
    techniqueOptions,
    tasteOptions,
    styleOptions,
    topOptions,
    glassOptions,
} from "/resources/js/data/selectOptionsData";

const Questionnaire = (props) => {
    const { errors, auth } = props;
    const [base, setBase] = useState(null);
    const [technique, setTechnique] = useState(null);
    const [taste, setTaste] = useState(null);
    const [style, setStyle] = useState(null);
    const [alcohol, setAlcohol] = useState([0, 20]);
    const [top, setTop] = useState(null);
    const [glass, setGlass] = useState(null);

    const [alcoholDisabled, setAlcoholDisabled] = useState(true);

    const marks = [
        { value: 0, label: "0%" },
        { value: 100, label: "100%" },
    ];

    const alcoholIsChange = (event) => {
        setAlcoholDisabled(!alcoholDisabled);
    };

    console.log(alcoholDisabled);

    const alcoholChange = (event, newValue) => {
        setAlcohol(newValue);
    };

    const alcoholValueLabelFormat = (alcohol) => {
        return `${alcohol}%`;
    };

    const alcoholValueText = (value) => {
        return `${value}%`;
    };

    useEffect(() => {
        if (alcoholDisabled === false) {
            setAlcohol([null, null]);
        }
    }, [alcoholDisabled]);

    const handleSubmit = (e) => {
        const values = {
            base: base,
            technique: technique,
            taste: taste,
            style: style,
            alcohol_from: alcohol[0],
            alcohol_to: alcohol[1],
            top: top,
            glass: glass,
        };
        e.preventDefault();
        Inertia.post("/cocktails/result", values);
    };
    return (
        <Authenticated
            auth={auth}
            errors={errors}
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
                component="form"
                maxWidth="xs"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "20px",
                }}
                onSubmit={handleSubmit}
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
                    <FormControlLabel
                        label="アルコール度数"
                        control={
                            <Checkbox
                                checked={alcoholDisabled}
                                onChange={alcoholIsChange}
                                inputProps={{ "aria-label": "controlled" }}
                            />
                        }
                    />
                    <Slider
                        disabled={!alcoholDisabled}
                        value={alcohol}
                        onChange={alcoholChange}
                        getAriaValueText={alcoholValueText}
                        valueLabelDisplay="auto"
                        valueLabelFormat={alcoholValueLabelFormat}
                        marks={marks}
                    />
                </FormControl>
                <Button variant="contained" type="submit">
                    送信
                </Button>
            </Box>
        </Authenticated>
    );
};

export default Questionnaire;
