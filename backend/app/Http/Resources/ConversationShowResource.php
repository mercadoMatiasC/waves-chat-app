<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class ConversationShowResource extends JsonResource { 
    public function toArray(Request $request): array { 
        return [
            'id' => $this->id,
            'is_group' => (bool) $this->is_group,
            'owner_id' => $this->owner_id,
            'group_title' => $this->group_title,
            'participants' => UserIndexResource::collection($this->whenLoaded('participants')),
        ];
    } 
}