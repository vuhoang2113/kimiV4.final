<?php

namespace App\Services\Contact;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

use App\Services\Contact\Interfaces\ContactServiceInterface;
use App\Repositories\Contact\ContactEloquentRepository;

use App\Http\Requests\API\Contact\CreateContactRequest;

class ContactService implements ContactServiceInterface
{
    protected $contactEloquentRepository;
    public function __construct(ContactEloquentRepository $contactEloquentRepository)
    {
        $this->contactEloquentRepository = $contactEloquentRepository;
    }

    public function getUserContact()
    {
        $userSetting = $this->contactEloquentRepository->getUserContact();
        return $userSetting;
    }

    public function createUserContact(CreateContactRequest $request)
    {
        $userContact = $this->contactEloquentRepository->createOrUpdateContact($request);
        return $userContact;
    }

    public function deleteUserContact($id)
    {
        $result = $this->contactEloquentRepository->delete($id);
        return $result;
    }
}
