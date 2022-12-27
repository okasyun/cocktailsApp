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

const Result = (props) => {
    // TODO: GETメソッドの時にrequestパラメータが定義されていなくてエラーになる

    const { cocktailsData, errors, auth } = props;

    // カクテルの配列
    const cocktails = cocktailsData.cocktails;

    let cocktailsIs = false;

    cocktailsIs = cocktails.length ? true : false;

    console.log(props);
    console.log(cocktails);
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
                    ))}
                </Box>
            ) : (
                <>
                    <div>条件にあるカクテルが1つもありませんでした</div>
                    <Link href={route("questionnaire")}>戻る</Link>
                </>
            )}
        </Authenticated>
    );
};

export default Result;
