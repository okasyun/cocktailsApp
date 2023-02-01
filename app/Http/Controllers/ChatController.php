<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message; 

use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    
   
    public function fetchMessages()
    {
        return Message::with('user')->get();
    }
    public function sendMessage(Request $request)
    {

        dd($request);
        // $user = Auth::user();
        // $user = auth()->user();
        // User::find(1);
        $user = Auth::user();

        // $id = auth()->id();
        // $user=User::find($id);
    
        // DBにメッセージを保存
        $message = $user->messages()->create([
            'message' => $request['message']
        ]);
    }
}
