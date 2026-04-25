<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserIndexResource;
use App\Http\Resources\UserShowResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function index(UserRequest $request) {
        $myId = Auth::id();

        $friendIds = DB::table('friends')->where(function($query) use ($myId) {
                $query->where('lower_user_id', $myId)->orWhere('higher_user_id', $myId);
            })
            ->where('request_accepted', true)->get()
            ->map(function ($friendship) use ($myId) {
                return $friendship->lower_user_id == $myId 
                    ? $friendship->higher_user_id 
                    : $friendship->lower_user_id;
            });

        $users = User::where('id', '!=', $myId)->whereNotIn('id', $friendIds)->when($request->search, function($query, $search) {
            $query->where('username', 'like', "%{$search}%");
        })->paginate(20);

        return UserIndexResource::collection($users);
    }

    public function myself() {
        $user = Auth::user()->load('wave');

        return (new UserShowResource($user));
    }

    public function update(UserRequest $request, UserService $service) {
        $user = $service->updateProfile($request->validated(), Auth::user());

        return (new UserShowResource($user))->response()->setStatusCode(200);
    }
}