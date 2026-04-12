<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMessageRequest extends FormRequest
{
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'conversation_id' => ['required', 'exists:conversations,id'],
            'sender_id'       => ['required', 'exists:users,id'],
            //ATTACHMENTS
            'text_body'       => ['required_without:attachments', 'nullable', 'string'],
            'attachments'     => ['nullable', 'array'],
            'attachments.*'   => ['file', 'max:10240'], // 10MB max
        ];
    }
}