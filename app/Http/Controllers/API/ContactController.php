<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

use App\Http\Controllers\API\BaseController;
use App\AppConst;

use App\Services\Contact\ContactService;
use App\Http\Requests\API\Contact\CreateContactRequest;

class ContactController extends BaseController
{
    protected $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    public function getUserContact()
    {
        $result = $this->contactService->getUserContact();
        return $this->apiResponse(false, Response::HTTP_OK, AppConst::MESSAGE_SUCCESS, $result);
    }

    public function createUserContact(CreateContactRequest $request)
    {
        $result = $this->contactService->createUserContact($request);
        return $this->apiResponse(false, Response::HTTP_OK, AppConst::MESSAGE_SUCCESS, $result);
    }

    public function deleteUserContact($id)
    {
        $result = $this->contactService->deleteUserContact($id);
        return $this->apiResponse(false, Response::HTTP_OK, AppConst::MESSAGE_SUCCESS, $result);
    }
}
