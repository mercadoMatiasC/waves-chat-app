<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserShowResource;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function myself() {
        $user = Auth::user()->load('wave');

        return (new UserShowResource($user));
    }
}