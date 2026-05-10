<?php

namespace App\Http\Controllers;

use App\Events\PrivateMessageSent;
use App\Events\PrivateMessageUpdated;
use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageIndexResource;
use App\Http\Resources\MessageShowResource;
use App\Models\Conversation;
use App\Models\Message;
use App\Services\MessageService;

class MessageController extends Controller
{
    public function index(Conversation $conversation){
        $messages = $conversation->messages()->orderBy('created_at', 'desc')->paginate(20);

        return (MessageIndexResource::collection($messages));
    }

    public function store(MessageRequest $request, Conversation $conversation, MessageService $service) {
        $mock_attachments = [
            [
                "is_image" => true,
                "file_name" => 'pepito.jpg',
                "file_size" => '2048',
                "file_path" => "conversations/{$conversation->id}/pepito.jpg",
            ],
            [
                "is_image" => false,
                "file_name" => 'resume.pdf',
                "file_size" => '1024',
                "file_path" => "conversations/{$conversation->id}/images/resume.pdf",
            ],
        ];
        
        $message = $service->storeMessage($request->validated(), $conversation, $mock_attachments);
        $message_resource = new MessageShowResource($message);

        $broadcastData = $message_resource->resolve();
        broadcast(new PrivateMessageSent($conversation->id, $broadcastData))->toOthers();

        return $message_resource->response()->setStatusCode(201);
    }

    public function show(Message $message, MessageService $service) {
        $message->load(['conversation.participants', 'attachments']);
        $service->checkIfUserCanSeeMessage($message);

        return new MessageShowResource($message);
    }

    public function update(MessageRequest $request, Message $message, MessageService $service) {
        $service->updateMessage($request->validated(), $message->conversation, $message);

        $resource = new MessageShowResource($message);
        $broadcastData = $resource->resolve();

        broadcast(new PrivateMessageUpdated($message->conversation_id, $broadcastData))->toOthers();

        return $resource->response()->setStatusCode(200);
    }
}
