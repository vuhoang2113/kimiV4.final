<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\AppConst;

class BaseModel extends Model
{
    use SoftDeletes;
    use HasFactory;
}
