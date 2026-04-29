<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class MessageIndexResource extends JsonResource{ 
    public function toArray(Request $request): array { 
        return [
            "id" => $this->id,
            "conversation_id" => $this->conversation_id,
            "sender_id" => $this->sender_id,
            "text_body" => $this->text_body,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    } 
}