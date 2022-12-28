<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CocktailController extends Controller
{
    /**
     * アンケートページの表示
     *
     * @return \Illuminate\Http\Response
     */
    public function questionnaireDisplay()
    {
        return Inertia::render('Main/Questionnaire');
    }

    /**
     * アンケートのリクエストパラメータをカクテルAPIに送信
     * APIのレスポンスを返す
     * @param Request $request
     * @return void
     */
    public function questionnaireResult(Request $request)
    {
        $onlyParameter = [
            'base', 'technique', 'taste', 'style', 'alcohol_from', 'alcohol_to', 'top', 'glass'
        ];
        $params = $request->only($onlyParameter);
        $url = $request->fullUrl();
        // 例外処理

        $client = new \GuzzleHttp\Client();

        $baseUrl = "https://cocktail-f.com/api/v1/cocktails";
        $response = $client->request(
            'GET',
            $baseUrl,
            ['query' => $params,
            'on_stats' => function (\GuzzleHttp\TransferStats $stats) use (&$queryUrl) {
                $queryUrl = $stats->getEffectiveUri();
            }]);

        $cocktailsData = json_decode($response->getBody(), true);

        return Inertia::render('Main/QuestionnaireResult', ["cocktailsData" => $cocktailsData]);
    }

    /**
     * カクテル検索の表示
     *
     * @return void
     */
    public function searchDisplay () 
    {
        return Inertia::render('Main/Search');
    }

    /**
     * 検索のリクエストパラメータをカクテルAPIに渡す
     * APIのレスポンスを渡す
     * @param mixed $name
     * @return mixed
     */

    public function searchResult (Request $request)
    {
        $param = $request->only('word');
        // dd($param);

        $client = new \GuzzleHttp\Client();

        $baseUrl =  'https://cocktail-f.com/api/v1/cocktails';
        $response = $client->request(
            'GET',
            $baseUrl,
            ['query' => $param,
            'on_stats' => function (\GuzzleHttp\TransferStats $stats) use (&$queryUrl) {
                $queryUrl = $stats->getEffectiveUri();
                // dd($queryUrl);
            }]);
            
        $cocktailsData = json_decode($response->getBody(), true);

        return Inertia::render("Main/SearchResult", ["cocktailsData" => $cocktailsData]);
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
