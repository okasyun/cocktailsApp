<?php

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('cocktails/questionnaire',[CocktailController::class, 'questionnaireDisplay'])->name('questionnaire')->middleware('auth');
Route::post('cocktails/questionnaire',[CocktailController::class, 'questionnaireResult'])->name('questionnaire')->middleware('auth');

Route::get('cocktails/search', [CocktailController::class, 'searchDisplay'])->name('search')->middleware('auth');
Route::post('cocktails/search', [CocktailController::class, 'searchResult'])->name('search')->middleware('auth');

require __DIR__.'/auth.php';
