<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class WaveShowResource extends JsonResource{ 
    public function toArray(Request $request): array { 
        return [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "text_body" => $this->text_body,
            "colour_code" => $this->colour_code,
            "emoji" => $this->emoji,
        ];
    } 
}