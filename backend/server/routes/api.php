<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CommentController;

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


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// Route for user registration
Route::post('/register', 'App\Http\Controllers\AuthController@register');

// Route for user login
Route::post('/login', 'App\Http\Controllers\AuthController@login');



Route::middleware(['auth:api'])->group(function () {
    // Route for displaying all tasks
    Route::get('/tasks', [TaskController::class, 'index']);

    // Route for creating a new task
    Route::post('/tasks', [TaskController::class, 'store']);

    // Route for displaying a specific task
    Route::get('/tasks/{task}', [TaskController::class, 'show']);

    // Route for updating a task
    Route::put('/tasks/{task}', [TaskController::class, 'update']);

    // Route for deleting a task
    Route::delete('/tasks/{task}', [TaskController::class   , 'destroy']);



    //update tasks progress
    Route::put('/tasks/{id}/progress', [TaskController::class, 'updateProgress'])->name('tasks.updateProgress');
    Route::get('/tasks/report', [TaskController::class, 'getReport'])->name('tasks.getReport');
    

    //assign task to user
    Route::post('tasks/{task}/assign-users', [TaskController::class, 'assignUsers']);
    Route::post('tasks/{task}/remove-users', [TaskController::class, 'removeUsers']);



    //comments
    Route::post('/tasks/{task}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::get('/tasks/{task}/comments', [CommentController::class, 'index'])->name('comments.index');
   
});