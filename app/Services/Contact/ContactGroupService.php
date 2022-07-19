<?php

namespace App\Services\Contact;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

use App\Services\Contact\Interfaces\ContactGroupServiceInterface;
use App\Repositories\Contact\ContactGroupEloquentRepository;
use App\Http\Requests\API\Contact\CreateContactGroupRequest;


class ContactGroupService implements ContactGroupServiceInterface
{
    protected $contactGroupEloquentRepository;
    public function __construct(ContactGroupEloquentRepository $contactGroupEloquentRepository)
    {
        $this->contactGroupEloquentRepository = $contactGroupEloquentRepository;
    }

    public function getUserContactGroup()
    {
        $userSetting = $this->contactGroupEloquentRepository->getUserContactGroup();
        return $userSetting;
    }

    public function createUserContactGroup(CreateContactGroupRequest $request)
    {
        $name = Arr::get($request, 'name');
        return $this->contactGroupEloquentRepository->create([
            'user_id' => Auth::user()->id,
            'name' => $name,
        ]);
    }

    public function deleteUserContactGroup($id)
    {
        return $this->contactGroupEloquentRepository->delete($id);
    }
}
