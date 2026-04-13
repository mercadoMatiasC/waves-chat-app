<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageShowResource;
use App\Models\Conversation;
use App\Models\Message;
use App\Services\MessageService;

class MessageController extends Controller
{
    public function store(MessageRequest $request, Conversation $conversation, MessageService $service) {
        $message = $service->storeMessage($request->validated(), $conversation);

        return (new MessageShowResource($message))->response()->setStatusCode(201);
    }

    public function show(Message $message, MessageService $service) {
        $message->load('conversation.participants'); //..., 'attachments']);
        $service->checkIfUserCanSeeMessage($message);

        return new MessageShowResource($message);
    }

    public function update(MessageRequest $request, Message $message, MessageService $service) {
        $service->updateMessage($request->validated(), $message->conversation, $message);

        return (new MessageShowResource($message))->response()->setStatusCode(200);
    }

    public function destroy(Message $message) {
        //NOT FOR NOW!
    }
}
