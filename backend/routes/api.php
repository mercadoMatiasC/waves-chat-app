<?php

use App\Http\Controllers\AttachmentController;
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
            Route::patch ('/me', 'update');
            Route::get   ('/users', 'index');       // -- NEW ENDPOINT --
            Route::get   ('/users/{user}', 'show'); // -- NEW ENDPOINT --
        });

        //-- 🌊 WAVES --
        Route::controller(WaveController::class)->group(function () {
            Route::get   ('/users/{user}/wave', 'show');
            Route::patch ('/my-wave', 'update');
        });

        //-- FRIENDS --
        Route::controller(FriendController::class)->group(function () {
            Route::post  ('/friend-requests/{user}', 'store');
            Route::patch ('/friend-requests/{user}', 'accept');
            Route::delete('/friends/{user}', 'destroy');

            Route::get   ('/friends', 'index');
            Route::get   ('/friend-requests/sent', 'sentRequests');
            Route::get   ('/friend-requests/received', 'receivedRequests');
        });
    
        //-- CONVERSATIONS --
        Route::controller(ConversationController::class)->group(function () {
            Route::post  ('chats', 'store');
            Route::get   ('chats', 'index');
            Route::patch ('chats/{conversation}', 'update');
            Route::get   ('chats/{conversation}', 'show');      // -- MODIFIED ENDPOINT --
            Route::delete('chats/{conversation}', 'destroy');   // -- NEW ENDPOINT --
            Route::get   ('chats/{conversation}/Edit', 'edit'); // -- NEW ENDPOINT --
        });

        //-- MESSAGES --
        Route::controller(MessageController::class)->group(function (){
            Route::get   ('chats/{conversation}/messages', 'index'); // -- NEW ENDPOINT --
            Route::post  ('chats/{conversation}/messages', 'store');
            Route::get   ('messages/{message}', 'show');
            Route::patch ('messages/{message}', 'update');
        });

        //-- ATTACHMENTS --
        Route::controller(AttachmentController::class)->group(function (){
            Route::delete('/attachments/{attachment}', 'destroy');
        });


    });

    Route::get('/test-session', function (Request $request) {
        return [
            'session_id' => $request->session()->getId(),
            'user' => $request->user(),
        ];
    });

require __DIR__.'/auth.php';