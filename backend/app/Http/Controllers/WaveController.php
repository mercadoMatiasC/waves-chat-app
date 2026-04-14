<?php

namespace App\Http\Controllers;

use App\Http\Requests\WaveRequest;
use App\Http\Resources\WaveShowResource;
use App\Models\User;
use App\Services\WaveService;

class WaveController extends Controller
{
    public function show(User $user, WaveService $service) {
        $service->checkIfUserCanSeeWave($user);
        $wave = $user->loadMissing('wave')->wave;

        return (new WaveShowResource($wave));
    }

    public function update(WaveRequest $request, WaveService $service) {
        $wave = $service->updateWave($request->validated());

        return (new WaveShowResource($wave))->response()->setStatusCode(200);
    }
}