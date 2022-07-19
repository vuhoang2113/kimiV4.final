<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Contact;
use App\Models\ContactGroup;

class ContactDetail extends BaseModel
{
    use HasFactory;
    protected $table = 'contact_details';
    protected $primaryKey = 'id';
    protected $fillable = [
        'contact_id',
        'contact_group_id',
        'note',
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class, 'contact_id', 'id');
    }

    public function contactGroup()
    {
        return $this->belongsTo(ContactGroup::class, 'contact_group_id', 'id');
    }
}
