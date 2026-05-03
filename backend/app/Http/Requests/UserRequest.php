<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        $userId = $this->user()->id;

        return [
            'username' => ['sometimes', 'string', 'max:30', "unique:users,username,{$userId}"],
            'email'    => ['sometimes', 'email', "unique:users,email,{$userId}"],
            'description' => ['sometimes', 'nullable', 'string', 'max:160'],
            'password' => ['sometimes', 'confirmed', 'min:8'],
        ];
    }
}
