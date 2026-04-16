<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Services\AttachmentService;

class AttachmentController extends Controller
{
    public function destroy(Attachment $attachment, AttachmentService $service) {
        $service->deleteAttachment($attachment);
        
        return response()->json(
            [
                'success' => true,
                'message' => 'Attachment removed successfully'
            ], 200);
    }
}
