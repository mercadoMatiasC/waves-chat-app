<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class ConversationRequest extends FormRequest
{
    public function authorize(User $creator, User $friend): bool {
        //if 1-to-1 chat, check if the creator is friend with the other user
        return true;
    }

    public function rules(): array {
        $rules = [
            'group_title' => ['nullable', 'string'],
        ];

        //CREATING
        if ($this->isMethod('post')) {
            $rules['is_group'] = ['required', 'boolean'];
            $rules['participants'] = ['present', 'array', $this->is_group ? 'min:0' : 'min:1'];
            $rules['group_title'] = ['required_if:is_group,true', 'nullable', 'string'];
        }

        //UPDATING
        if ($this->isMethod('patch') || $this->isMethod('put')){
            $isGroup = $this->route('conversation')->is_group;
            $rules['participants'] = ['sometimes', 'array', 'min:1'];
        }
        return $rules;
    }
}