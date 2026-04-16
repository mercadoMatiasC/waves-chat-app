<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WaveRequest extends FormRequest
{
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        $rules = [
            'text_body'   => ['sometimes', 'string', 'max:255'],
            'colour_code' => ['sometimes', 'string', 'regex:/^#([a-fA-F0-9]{3}){1,2}$/'],
            'emoji'       => ['sometimes', 'string']
        ];

        return $rules; 
    }
}