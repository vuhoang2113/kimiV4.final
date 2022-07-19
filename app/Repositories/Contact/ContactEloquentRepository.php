<?php

namespace App\Repositories\Contact;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

use App\Repositories\EloquentRepository;
use App\Repositories\Contact\Interfaces\ContactRepositoryInterface;
use App\Models\Contact;
use App\Http\Requests\API\Contact\CreateContactRequest;
use App\Models\ContactGroup;
use App\Models\ContactDetail;

class ContactEloquentRepository extends EloquentRepository implements ContactRepositoryInterface
{
    public function getModel()
    {
        return Contact::class;
    }

    public function getUserContact()
    {
        return Contact::select([
            'contacts.id',
            'contacts.user_id',
            'contacts.contact_user_id',
        ])
            ->where('contacts.user_id', '=', Auth::user()->id)
            ->whereHas('contactUser')
            ->with(['contactUser' => function ($query) {
                $query->select(['id', 'name', 'uid_id']);
                $query->whereHas('uid');
                $query->with(['uid' => function ($query2) {
                    $query2->select(['id', 'code']);
                }]);
            }])
            ->whereHas('contactDetail')
            ->with(['contactDetail' => function ($query) {
                $query->select(['id', 'contact_id', 'contact_group_id', 'note']);
                $query->whereHas('contactGroup');
                $query->with(['contactGroup' => function ($query) {
                    $query->select(['id', 'name']);
                }]);
            }])
            ->get();
    }

    public function createOrUpdateContact(CreateContactRequest $request)
    {
        $contactUserId = Arr::get($request, 'contact_user_id');
        $contactGroupId = Arr::get($request, 'contact_group_id');
        $note = Arr::get($request, 'note');

        $newContact = $this->_model->updateOrCreate([
            'user_id' => Auth::user()->id,
            'contact_user_id' => $contactUserId,
        ]);
        if ($newContact) {
            ContactDetail::updateOrCreate([
                'contact_id' => $newContact->id,
                'contact_group_id' => $contactGroupId
            ], [
                'contact_id' => $newContact->id,
                'contact_group_id' => $contactGroupId,
                'note' => $note,
            ]);
        }
        return $newContact;
    }
}
