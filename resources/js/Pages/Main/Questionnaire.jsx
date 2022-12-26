import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
} from "/resources/js/data/selectOptionsData";
import SelectInput from "@/OriginComponents/SelectInput";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";

const Questionnaire = (props) => {
    const { errors, auth } = props;
    const [base, setBase] = useState(null);
    const [technique, setTechnique] = useState(null);
    const [taste, setTaste] = useState(null);
    const [style, setStyle] = useState(null);
    const [alcohol, setAlcohol] = useState([0, 20]);
    const [top, setTop] = useState(null);
    const [glass, setGlass] = useState(null);

    const alcoholChange = (event, newValue) => {
        setAlcohol(newValue);
    };

    const alcoholChangeText = (alcohol) => {
        return `${alcohol}o`;
    };

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
            <Link href={route("result")}>カクテル表示結果</Link>
            <Box
                component="form"
                maxWidth="xs"
                sx={{
                    display: "flex",
                    justifyContent: "center",
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
                    <Typography gutterBottom>アルコール度数</Typography>
                    <Slider
                        value={alcohol}
                        onChange={alcoholChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={alcoholChangeText}
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
