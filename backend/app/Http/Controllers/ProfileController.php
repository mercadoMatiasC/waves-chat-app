<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserIndexResource;
use App\Http\Resources\UserShowResource;
use App\Models\User;
use App\Services\ImageService;
use App\Services\UserService;
use Illuminate\Support\Arr;
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

    public function show(User $user) {
        $me = Auth::user();
        $can_see_wave = $me->id === $user->id || $me->isFriendsWith($user);

        if ($can_see_wave)
            $user->load('wave');
        else
            $user->unsetRelation('wave');

        return new UserShowResource($user);
    }

    public function myself() {
        $user = Auth::user()->load('wave');

        return (new UserShowResource($user));
    }

    public function update(UserRequest $request, UserService $user_service, ImageService $image_service) {
        $user = Auth::user();
        $data = $request->validated();

        if ($request->hasFile('logo_file')) {
            $newFilename = "{$user->id}.webp";
            
            $path = $image_service->profileImageProcess(
                file: $request->file('logo_file'),
                filename: $newFilename,
                deletePath: $user->profile_image_route,
            );

            $data['profile_image_route'] = $path;
        }    

        $user = $user_service->updateProfile(Arr::except($data, ['logo_file']), $user);

        return (new UserShowResource($user))->response()->setStatusCode(200);
    }
}