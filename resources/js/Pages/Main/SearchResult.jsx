import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
const SearchResult = (props) => {
    const { auth, errors, cocktailsData } = props;

    const [cocktailsIs, setCocktailsIs] = useState(false);

    const cocktails = cocktailsData.cocktails;
    useEffect(() => {
        cocktails.length ? setCocktailsIs(true) : setCocktailsIs(false);
    }, [cocktailsIs]);

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    カクテル表示結果
                </h2>
            }
        >
            <Head title="検索結果" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            カクテル表示結果
                        </div>
                    </div>
                </div>
            </div>
            <CssBaseline />
            {cocktailsIs ? (
                <Box
                    componet="main"
                    sx={{
                        width: "700px",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    {cocktails.map((cocktail) => (
                        <Card key={cocktail.cocktail_id} sx={{ width: "50%" }}>
                            <CardContent>
                                <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {`${cocktail.cocktail_name}/${cocktail.cocktail_name_english}`}
                                </Typography>
                                <Typography variant="body2">
                                    {cocktail.cocktail_digest}
                                </Typography>
                                <ul>
                                    <li>{`ベース：${cocktail.base_name}`}</li>
                                    <li>{`技法：${cocktail.technique_name}`}</li>
                                    <li>{`味わい：${cocktail.taste_name}`}</li>
                                    <li>{`スタイル：${cocktail.style_name}`}</li>
                                    <li>{`アルコール度数：${cocktail.alcohol}%`}</li>
                                    <li>{`TOP:${cocktail.top_name}`}</li>
                                    <li>{`グラス：${cocktail.glass_name}`}</li>
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) : (
                <div>データがひとつもありませんでした。</div>
            )}
        </Authenticated>
    );
};

export default SearchResult;
