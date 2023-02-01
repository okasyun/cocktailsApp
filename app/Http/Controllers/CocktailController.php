<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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

        // dd($cocktailsData);

        return Inertia::render("Main/SearchResult", ["cocktailsData" => $cocktailsData]);
    }


    public function addFavorite (Request $request)
    {
        $param = $request->all();
        $cocktail_id = $request->input('cocktail_id');
        $cocktail_name = $request->input('cocktail_name');

        $user_id = Auth::id();

        // TODO:お気に入り追加しても画面遷移しない
        // TODO:user_idが一致していているテーブルの中で、cocktail_idの重複がないようにする
        if(Favorite::where('user_id', Auth::id())->where('cocktail_id',$cocktail_id)->get()->count()==0) {
            Favorite::create(['user_id'=> $user_id, 'cocktail_id' => $cocktail_id, 'cocktail_name' => $cocktail_name]);
        }

    }

    public function favoriteListDisplay ()
    {
        $user_id = Auth::id();

        // $favoriteList = Favorite::where("user_id", $user_id)->get()->toArray();
        // $id = Favorite::select('cocktail_id')->where("user_id", $user_id)->get()->toArray();
        $cocktail_ids = array_column(Favorite::select('cocktail_id')->where("user_id", $user_id)->get()->toArray() ,'cocktail_id');
        // dd($id);
        $cocktails_data = [];
        foreach($cocktail_ids as $cocktail_id) 
        {
            $url = "https://cocktail-f.com/api/v1/cocktails/" . $cocktail_id;
            $client = new \GuzzleHttp\Client(['base_uri' => $url]);
            $response = $client->request('GET');
            $cocktail_data = json_decode($response->getBody(), true);
            array_push($cocktails_data, $cocktail_data);
        }

        return Inertia::render("Main/FavoriteList", ['cocktailsData' => $cocktails_data]);
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
