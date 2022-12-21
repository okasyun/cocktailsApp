<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Favorite;

class FavoriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Favorite::create([
            'cocktail_id' => 3,
            'user_id' => 1,
            'cocktail_name' => "マティーニ",
        ]
        );
    }
}
