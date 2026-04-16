<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    protected $fillable = [
        'lower_user_id',
        'higher_user_id',
        'sender_id',
        'request_accepted', // Very important for your acceptFriendRequest method!
    ];

    protected $table = 'friends';
}
