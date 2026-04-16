<?php
namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WaveService {
    public function updateWave(array $data) {
        $wave = Auth::user()->wave;

        return DB::transaction(function () use ($data, $wave) {
            $wave->refresh()->lockForUpdate();
            $wave->update($data);
            return $wave;
        });
    }
}