<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CocktailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Main/Questionnaire');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Main/Result');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function handleQuestion(Request $request)
    {
        $params = $request->all();
        $url = $request->fullUrl();



        // クライアントインスタンス作成
        $client = new \GuzzleHttp\Client();

        // GET通信するURL
        $baseUrl = "https://cocktail-f.com/api/v1/cocktails";
        $response = $client->request(
            'GET',
            $baseUrl,
            ['query' => $params,
            'on_stats' => function (\GuzzleHttp\TransferStats $stats) use (&$queryUrl) {
                $queryUrl = $stats->getEffectiveUri();
                // dd($queryUrl);
            }]);


        $cocktailsData = json_decode($response->getBody(), true);

        return Inertia::render('Main/Result', ["cocktailsData" => $cocktailsData]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
