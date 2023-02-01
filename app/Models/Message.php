<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content_text','content_image_path'];
    
    public function user()
    {
    return $this->belongsTo(User::class);
    }
}
