<?php

use App\Http\Controllers\ConversationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

    Route::middleware(['auth:sanctum'])->group(function () {
        //-- CONVERSATIONS --
        Route::controller(ConversationController::class)->group(function () {
            Route::post  ('chats', 'store');
            Route::get   ('chats', 'index');
            Route::patch ('chats/{conversation}', 'update');
            Route::get   ('chats/{conversation}/messages', 'show');
        });

        //-- PROFILE --
        Route::controller(ProfileController::class)->group(function () {
            Route::get   ('/me', 'myself');
        });
    });

    Route::get('/test-session', function (Request $request) {
    return [
        'session_id' => $request->session()->getId(),
        'user' => $request->user(),
    ];
});
require __DIR__.'/auth.php';