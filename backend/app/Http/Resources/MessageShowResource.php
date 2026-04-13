<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class MessageShowResource extends JsonResource{ 
    public function toArray(Request $request): array { 
        return [
            "id" => $this->id,
            "conversation_id" => $this->conversation_id,
            "sender_id" => $this->sender_id,
            "text_body" => $this->text_body,
            "attachments" => [
                "empty1" => "PLACEHOLDER1",
                "empty2" => "PLACEHOLDER2",
                "empty3" => "PLACEHOLDER3",
            ],
        ];
    } 
}