<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserShowResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function myself() {
        $user = Auth::user();

        return (new UserShowResource($user));
    }

    public function store(Request $request) {
        //
    }

    public function update(Request $request, User $user) {
        //
    }

    public function destroy(User $user) {
        //
    }
}