<?php
namespace App\Services;

use App\Exceptions\BusinessException;
use App\Models\Attachment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AttachmentService {
    public function ensureUserCanManageAttachment(Attachment $attachment) {
        $attachment->loadMissing('message');
        
        if ($attachment->message->sender_id !== Auth::id()) 
            throw new BusinessException("You cannot manage attachments that were not sent by you.");
    }

    public function deleteAttachment(Attachment $attachment) {
        $this->ensureUserCanManageAttachment($attachment);

        return DB::transaction(function () use ($attachment) {   
            $message = $attachment->message;
            $attachment->refresh()->lockForUpdate();

            //Storage::delete($attachment->file_path;); 
            
            $attachment->delete();
            $message->touch();

            return $message->load('attachments');
        });
    }
}