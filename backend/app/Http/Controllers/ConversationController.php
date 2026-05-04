<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Http\Requests\ConversationRequest;
use App\Http\Resources\ConversationIndexResource;
use App\Http\Resources\ConversationShowResource;
use App\Services\ConversationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
    public function index(Request $request) {
        $search_term = $request->input('q');

        $query = Auth::user()->conversations()
            ->with(['participants', 'latestMessage'])
            ->withMax('messages', 'created_at')
            ->orderByRaw('COALESCE(messages_max_created_at, conversations.created_at) DESC');

        if (!empty($search_term))
            $query->whereHas('participants', function($q) use ($search_term) {
                $q->where('username', 'LIKE', "%{$search_term}%")
                ->where('users.id', '!=', Auth::id());
            });

        $conversations = $query->paginate(20);

        return ConversationIndexResource::collection($conversations);
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

    public function show(Conversation $conversation, ConversationService $service) {
        $service->ensureUserIsMember($conversation);

        return new ConversationShowResource($conversation->load(['participants', 'messages']));
    }

    public function edit(Conversation $conversation, ConversationService $service) {
        $service->ensureUserIsOwner($conversation);

        return new ConversationShowResource($conversation->load(['participants', 'messages']));
    }

    public function update(ConversationRequest $request, Conversation $conversation, ConversationService $conversation_service) {  
        $conversation = $conversation_service->updateConversation(
            $request->safe()->except('participants'), 
            $request->participants,
            $conversation
        );

        return (new ConversationShowResource($conversation))->response()->setStatusCode(200);
    }

    public function destroy(Conversation $conversation, ConversationService $service) {
        $service->deleteConversation($conversation);

        return response()->noContent();
    }
}