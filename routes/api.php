<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('categories', CategoryController::class);
Route::get('categories-list', [CategoryController::class, 'list']);
Route::apiResource('posts', PostController::class);
Route::apiResource('todos', TodoController::class);
Route::get('todos/count/not-completed', [TodoController::class, 'notCompleted']);
Route::post('todos/{todo}/change-status', [TodoController::class, 'changeStatus']);
Route::post('todos/change-all-status', [TodoController::class, 'changeAllStatus']);
Route::delete('todos/completed/remove', [TodoController::class, 'destroyCompleted']);