<?php

use App\Http\Controllers\ConversationController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WaveController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

    Route::middleware(['auth:sanctum'])->group(function () {
        //-- PROFILE --
        Route::controller(ProfileController::class)->group(function () {
            Route::get   ('/me', 'myself');
        });

        //-- FRIENDS --
        Route::controller(FriendController::class)->group(function () {
            Route::post  ('/friend-requests/{user}', 'store');
            Route::patch ('/friend-requests/{user}', 'accept');

            Route::get   ('/friends', 'index');
            Route::get   ('/friend-requests/sent', 'sentRequests');
            Route::get   ('/friend-requests/received', 'receivedRequests');
        });
    
        //-- CONVERSATIONS --
        Route::controller(ConversationController::class)->group(function () {
            Route::post  ('chats', 'store');
            Route::get   ('chats', 'index');
            Route::patch ('chats/{conversation}', 'update');
            Route::get   ('chats/{conversation}/messages', 'show');
        });

        //-- MESSAGES --
        Route::controller(MessageController::class)->group(function (){
            Route::post  ('chats/{conversation}/messages', 'store');
            Route::get   ('messages/{message}', 'show');
            Route::patch ('messages/{message}', 'update');
        });

        //-- 🌊 Waves --
        Route::controller(WaveController::class)->group(function () {
            Route::get   ('/users/{user}/wave', 'show');
            Route::patch ('/my-wave', 'update');
        });
    });

    Route::get('/test-session', function (Request $request) {
        return [
            'session_id' => $request->session()->getId(),
            'user' => $request->user(),
        ];
    });

require __DIR__.'/auth.php';