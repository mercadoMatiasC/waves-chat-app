<?php
namespace App\Services;

use App\Exceptions\BusinessException;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserService {
    public function ensureUserCanUpdate(User $user) {
        $auth_user = Auth::user();

        if ($auth_user->isNot($user) && !$auth_user->is_admin)
            throw new BusinessException("You cannot update other users' information.");
    }
    public function updateProfile(array $data, User $user): User{
        $this->ensureUserCanUpdate($user);

        if (isset($data['password']))
            $data['password'] = bcrypt($data['password']);

        $user->update($data);

        return $user;
    }
}