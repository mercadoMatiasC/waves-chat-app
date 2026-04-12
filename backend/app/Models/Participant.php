<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Participant extends Pivot
{
    protected $table = 'participants';

    public $incrementing = true;
}