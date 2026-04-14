<?php
namespace App\Services;

use App\Exceptions\BusinessException;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WaveService {
    public function checkIfUserCanSeeWave(User $user) {
        //MY OWN WAVE
        if ($user->id === Auth::id())
            return true;

        //$is_friend = $user->friends->contains('id', Auth::id());

        //if (!$is_friend)
        //    throw new BusinessException("You cannot see Waves from users that are not in your friends list.");
    }

    public function updateWave(array $data) {
        $wave = Auth::user()->wave;

        return DB::transaction(function () use ($data, $wave) {
            $wave->refresh()->lockForUpdate();
            $wave->update($data);
            return $wave;
        });
    }
}