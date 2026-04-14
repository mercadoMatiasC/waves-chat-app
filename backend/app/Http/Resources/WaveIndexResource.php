<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class WaveIndexResource extends JsonResource{ 
    public function toArray(Request $request): array { 
        return [
            'id' => $this->id,
            "user_id" => $this->user_id,
            "colour_code" => $this->colour_code,
            "emoji" => $this->emoji,
        ];
    } 
}