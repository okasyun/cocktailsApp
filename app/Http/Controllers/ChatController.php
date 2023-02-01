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

        // $user = Auth::user();
        // $user = auth()->user();
        // User::find(1);
        $user = Auth::user();

        // $id = auth()->id();
        // $user=User::find($id);
    
        // DBにメッセージを保存
        $message = $user->messages()->create([
            'title' => $request['title'],
            'content_text' => $request['content_text'],
            'content_image_path' => $request['content_image_path']
        ]);
    }
}
