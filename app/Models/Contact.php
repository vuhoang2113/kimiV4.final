<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class Contact extends BaseModel
{
    use HasFactory;
    protected $table = 'contacts';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
        'contact_user_id',
    ];

    public function delete()
    {
        $this->contactDetail()->each(function ($item) {
            $item->delete();
        });
        return parent::delete();
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function contactUser()
    {
        return $this->belongsTo(User::class, 'contact_user_id', 'id');
    }

    public function contactDetail()
    {
        return $this->hasOne(ContactDetail::class, 'contact_id', 'id');
    }
}
