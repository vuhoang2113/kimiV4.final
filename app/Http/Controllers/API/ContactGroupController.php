<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

use App\Http\Controllers\API\BaseController;
use App\AppConst;

use App\Services\Contact\ContactGroupService;
use App\Http\Requests\API\Contact\CreateContactGroupRequest;


class ContactGroupController extends BaseController
{
    protected $contactGroupService;

    public function __construct(ContactGroupService $contactGroupService)
    {
        $this->contactGroupService = $contactGroupService;
    }

    public function getUserContactGroup()
    {
        $result = $this->contactGroupService->getUserContactGroup();
        return $this->apiResponse(false, Response::HTTP_OK, AppConst::MESSAGE_SUCCESS, $result);
    }

    public function createUserContactGroup(CreateContactGroupRequest $request)
    {
        $result = $this->contactGroupService->createUserContactGroup($request);
        return $this->apiResponse(false, Response::HTTP_OK, AppConst::MESSAGE_SUCCESS, $result);
    }

    public function deleteUserContactGroup($id)
    {
        $result = $this->contactGroupService->deleteUserContactGroup($id);
        return $this->apiResponse(false, Response::HTTP_OK, AppConst::MESSAGE_SUCCESS, $result);
    }
}
