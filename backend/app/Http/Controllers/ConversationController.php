<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Http\Requests\ConversationRequest;
use App\Http\Resources\ConversationIndexResource;
use App\Http\Resources\ConversationShowResource;
use App\Services\ConversationService;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
    public function index() {
        $conversations = Auth::user()->conversations()->paginate(20);

        return (ConversationIndexResource::collection($conversations));
    }

    public function store(ConversationRequest $request, ConversationService $service) {
        $isGroup = $request->boolean('is_group');

        $conversation = $service->storeConversation(
            $request->safe()->except('participants'), 
            $request->participants,
            $isGroup ? Auth::user() : null
        );

        return (new ConversationIndexResource($conversation))->response()->setStatusCode(201);
    }

    public function show(Conversation $conversation) {
        $conversation->load('participants');

        return (new ConversationShowResource($conversation));
    }

    public function update(ConversationRequest $request, Conversation $conversation, ConversationService $conversation_service) {  
        $conversation = $conversation_service->updateConversation($request->validated(), $conversation);

        return (new ConversationIndexResource($conversation))->response()->setStatusCode(200);
    }
}