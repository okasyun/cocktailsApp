<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FavoriteController extends Controller
{
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

}
