<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    //-- RELATIONSHIPS --
    public function message(){
        return $this->belongsTo(Message::class);
    }
}
