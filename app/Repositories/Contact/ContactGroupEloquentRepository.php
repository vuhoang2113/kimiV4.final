<?php

namespace App\Repositories\Contact;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

use App\Repositories\EloquentRepository;
use App\Repositories\Contact\Interfaces\ContactGroupRepositoryInterface;
use App\Models\ContactGroup;

class ContactGroupEloquentRepository extends EloquentRepository implements ContactGroupRepositoryInterface
{
    public function getModel()
    {
        return ContactGroup::class;
    }

    public function getUserContactGroup()
    {
        return ContactGroup::select(['id', 'user_id', 'name'])->where('user_id', '=', Auth::user()->id)->get();
    }

    public function delete($id)
    {
        $result = $this->find($id);
        if ($result && (int)$result->user_id === (int)Auth::user()->id) {
            $result->delete();
            return true;
        }
        return false;
    }
}
