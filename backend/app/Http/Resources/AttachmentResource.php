<?php 
namespace App\Http\Resources; 

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource; 
    
class AttachmentResource extends JsonResource{ 
    public function toArray(Request $request): array { 
        return [
            "id" => $this->id,
            "is_image" => $this->is_image,
            "file_name" => $this->file_name,
            "file_size" => $this->file_size,
            "file_path" => $this->file_path,
        ];
    } 
}