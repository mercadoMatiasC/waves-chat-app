<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wave extends Model
{
    //-- RELATIONSHIPS --
    public function user() {
        return $this->belongsTo(User::class);
    }
}