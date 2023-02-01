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
import StarIcon from "@mui/icons-material/Star";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";

const Result = (props) => {
    // TODO: GETメソッドの時にrequestパラメータが定義されていなくてエラーになる
    const [favorite, setFavorite] = useState(null);
    const { cocktailsData, errors, auth } = props;

    //TODO:useeffect使う必要ない
    // const [cocktailsIs, setCocktailsIs] = useState(true);

    const cocktails = cocktailsData.cocktails;
    const [cocktailsIs, setCocktailsIs] = useState(() => {
        return cocktails.length != 0;
    });
    // useEffect(() => {

    //     cocktails.length ? setCocktailsIs(true) : setCocktailsIs(false);
    // }, [cocktailsIs]);

    const handleClick = (e, cocktail_id, cocktail_name) => {
        // console.log(cocktail_id);
        e.preventDefault();
        const value = {
            cocktail_id: cocktail_id,
            cocktail_name: cocktail_name,
        };
        // Inertia.post("/cocktails/favorite", value);
        axios.post("/cocktails/favorite", value);
    };

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
            <Head title="カクテル表示結果" />
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
                    <h1>Result</h1>
                    <h1>リクエスト</h1>

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
                                    <IconButton
                                        type="submit"
                                        aria-label="star-white"
                                    >
                                        <StarBorderIcon />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </form>
                    ))}
                </Box>
            ) : (
                <>
                    <div>条件にあるカクテルが1つもありませんでした</div>
                    <Link href={route("cocktails.questionnaireDisplay")}>
                        戻る
                    </Link>
                </>
            )}
        </Authenticated>
    );
};

export default Result;
