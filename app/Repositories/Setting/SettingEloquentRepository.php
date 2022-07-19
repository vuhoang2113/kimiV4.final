<?php

namespace App\Repositories\Setting;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

use App\Repositories\EloquentRepository;
use App\Repositories\Setting\SettingRepositoryInterface;
use App\Models\Setting;
use App\Http\Requests\API\Setting\UpdateRequest;

class SettingEloquentRepository extends EloquentRepository implements SettingRepositoryInterface
{
    public function getModel()
    {
        return Setting::class;
    }

    public function getCurrentSetting($user)
    {
        return Setting::select(['id', 'user_id', 'contact_saving_feature'])->where('user_id', '=', $user->id)->first();
    }

    public function updateUserSetting(UpdateRequest $request)
    {
        $contactSavingValue = Arr::get($request, 'contact_saving_feature');
        Setting::where('user_id', '=', $request->user()->id)->update(['contact_saving_feature' => $contactSavingValue]);
        return Setting::select(['id', 'user_id', 'contact_saving_feature'])->where('user_id', '=', $request->user()->id)->first();
    }
}
