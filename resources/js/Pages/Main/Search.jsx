import React from "react";
import { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Inertia } from "@inertiajs/inertia";
const Search = (props) => {
    const { errors, auth } = props;
    const [cocktailsName, setCocktailsName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = { word: cocktailsName };
        Inertia.post("/cocktails/search", value);
    };

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    検索
                </h2>
            }
        >
            <Head title="検索" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            カクテル検索
                        </div>
                    </div>
                </div>
            </div>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: "500px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <TextField
                    label="カクテル名"
                    variant="outlined"
                    value={cocktailsName}
                    onChange={(e) => setCocktailsName(e.target.value)}
                />
                <Button type="submit" contained>
                    検索
                </Button>
            </Box>
        </Authenticated>
    );
};

export default Search;
