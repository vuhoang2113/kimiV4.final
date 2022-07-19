<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

use App\Http\Controllers\API\BaseController;
use App\AppConst;

use App\Services\Setting\SettingService;

use App\Http\Requests\API\Setting\UpdateRequest;


class SettingController extends BaseController
{
    protected $settingService;

    public function __construct(SettingService $settingService)
    {
        $this->settingService = $settingService;
    }

    public function getUserSetting(Request $request)
    {
        $setting = $this->settingService->getUserSetting($request);
        return $this->apiResponse(false, Response::HTTP_OK, AppConst::MESSAGE_SUCCESS, $setting);
    }

    public function updateUserSetting(UpdateRequest $request)
    {
        $setting = $this->settingService->updateUserSetting($request);
        return $this->apiResponse(false, Response::HTTP_OK, AppConst::MESSAGE_SUCCESS, $setting);
    }
}
