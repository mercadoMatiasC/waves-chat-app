<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserShowResource;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function myself() {
        $user = Auth::user()->load('wave');

        return (new UserShowResource($user));
    }

    public function update(UserRequest $request, UserService $service) {
        $user = $service->updateProfile($request->validated(), Auth::user());

        return (new UserShowResource($user))->response()->setStatusCode(200);
    }
}