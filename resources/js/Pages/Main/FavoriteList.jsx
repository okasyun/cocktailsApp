import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/inertia-react";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const FavoriteList = (props) => {
    const { cocktailsData, errors, auth } = props;

    const cocktails = [];
    cocktailsData.map((cocktailData) => {
        cocktails.push(cocktailData.cocktail);
    });

    const [cocktailsIs, setCocktailsIs] = useState(() => {
        return cocktails.length != 0;
    });

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    カクテルお気に入り結果
                </h2>
            }
        >
            <Head title="カクテルお気に入り一覧" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            カクテルお気に入り一覧
                        </div>
                    </div>
                </div>
            </div>
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    width: "700px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "50px",
                }}
            >
                <h1>お気に入り一覧</h1>

                {cocktails.map((cocktail) => (
                    <form
                        onSubmit={(e) =>
                            handleClick(
                                e,
                                cocktail.cocktail_id,
                                cocktail.cocktail_name
                            )
                        }
                    >
                        <Card
                            key={cocktail.cocktail_id}
                            sx={{ width: "300px" }}
                        >
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
                    </form>
                ))}
            </Box>
        </Authenticated>
    );
};

export default FavoriteList;
