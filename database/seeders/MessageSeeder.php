<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Message;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Message::create([
            'user_id' => 1,
            'title' => "バーのレビュー",
            'content_text' => 'ジントニックが美味しかった',
            'content_image_path' => "sample_bar.png",
        ]);
    }
}
