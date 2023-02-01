<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CocktailController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () 
{
    Route::name('profile.')->group(function() {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::group(['prefix' => 'cocktails', 'as' => "cocktails."], function () {
        Route::get('questionnaire',[CocktailController::class, 'questionnaireDisplay'])->name('questionnaireDisplay'); // route('cocktails.questionnaire')
        Route::post('questionnaire/result',[CocktailController::class, 'questionnaireResult'])->name('questionnaireResult');
        Route::get('search', [CocktailController::class, 'searchDisplay'])->name('searchDisplay');
        Route::post('search', [CocktailController::class, 'searchResult'])->name('searchResult');
        Route::post('favorite', [CocktailController::class, 'addFavorite'])->name('favorite');
        Route::get('favoriteList', [CocktailController::class, 'favoriteListDisplay'])->name('favoriteList');

        Route::inertia('/chat', "Chats/Chats")->name('chat.index');
        Route::get('/messages', [ChatController::class, 'fetchMessages'])->name('chat.fetch');
        Route::post('/messages', [ChatController::class, 'sendMessage'])->name('chat.store');
    });

});

require __DIR__.'/auth.php';
