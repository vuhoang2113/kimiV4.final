<?php

namespace App\Services\Setting;

use Illuminate\Http\Request;

interface SettingServiceInterface
{
    public function getUserSetting(Request $request);
}
