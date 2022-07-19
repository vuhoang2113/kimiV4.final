<?php

namespace App\Services\Setting;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Arr;

use App\Services\Setting\SettingServiceInterface;
use App\Repositories\Setting\SettingEloquentRepository;

use App\Http\Requests\API\Setting\UpdateRequest;


class SettingService implements SettingServiceInterface
{
    protected $settingEloquentRepository;
    public function __construct(SettingEloquentRepository $settingEloquentRepository)
    {
        $this->settingEloquentRepository = $settingEloquentRepository;
    }

    public function getUserSetting(Request $request)
    {
        $userSetting = $this->settingEloquentRepository->getCurrentSetting($request->user());
        return $userSetting;
    }

    public function updateUserSetting(UpdateRequest $request)
    {
        $userSetting = $this->settingEloquentRepository->updateUserSetting($request);
        return $userSetting;
    }
}
