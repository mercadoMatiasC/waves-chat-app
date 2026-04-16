<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Participant extends Pivot
{
    protected $fillable = [
        'conversation_id',
        'user_id',
        'last_joined_at',
        'hidden_at',
        'last_read_at',
    ];

    protected $table = 'participants';

    public $incrementing = true;
}