<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MessageRequest extends FormRequest
{
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        $rules = [];

        //CREATING
        if ($this->isMethod('post')) {
            $rules['sender_id']       = ['required', 'exists:users,id'];
            $rules['text_body']       = ['required_without:attachments', 'nullable', 'string'];

            //ATTACHMENTS
            $rules['attachments']     = ['nullable', 'array'];
            $rules['attachments.*']   = ['file', 'max:10240']; // 10MB max
        }

        //UPDATING
        if ($this->isMethod('patch') || $this->isMethod('put')){
            $rules['sender_id']       = ['prohibited'];
            $rules['text_body']       = ['nullable', 'string'];
        }

        return $rules; 
    }
}