<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Wave;

class WavePolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Wave $wave) { //ONLY IF IT'S MYSELF OR A FRIEND USER
        return $user->id === $wave->user_id || $user->isFriendsWith($wave->user);
    }

    public function create(User $user): bool {
        return true;
    }

    public function update(User $user, Wave $wave): bool {
        return $user->id === $wave->user_id;
    }

    public function delete(User $user, Wave $wave): bool {
        return true;
    }

    public function restore(User $user, Wave $wave): bool {
        return true;
    }

    public function forceDelete(User $user, Wave $wave): bool {
        return true;
    }
}
