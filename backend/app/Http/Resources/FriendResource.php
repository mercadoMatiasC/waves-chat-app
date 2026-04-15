<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class FriendResource extends JsonResource{ 
    public function toArray(Request $request): array { 
        return [
            "higher_user_id" => $this->higher_user_id,
            "lower_user_id" => $this->lower_user_id,
            "sender_id" => $this->sender_id,
            "request_accepted" => $this->request_accepted,
        ];
    } 
}