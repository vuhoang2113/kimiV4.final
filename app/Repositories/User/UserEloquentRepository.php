<?php

namespace App\Repositories\User;

use App\Models\ContactGroup;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Repositories\EloquentRepository;
use App\Repositories\User\UserRepositoryInterface;
use App\Models\User;
use App\Models\Setting;

class UserEloquentRepository extends EloquentRepository implements UserRepositoryInterface
{
    public function getModel()
    {
        return User::class;
    }

    public function firstByColumn($columnName, $data)
    {
        $user = User::where($columnName, '=', $data)->first();
        return $user;
    }

    public function firstByEmail($email)
    {
        $user = User::select([
            'id',
            'name',
            'email',
            'phone_number',
            'avatar_url',
            'background_url',
            'introduction',
            'uid_id'
        ])
            ->where('email', '=', $email)
            ->whereHas('uid')
            ->with(['uid' => function ($query) {
                $query->select([
                    'id',
                    'code',
                ]);
            }])->first();
        return $user;
    }

    public function firstByUID($uid)
    {
        $user = User::select([
            'id',
            'name',
            'email',
            'phone_number',
            'avatar_url',
            'background_url',
            'introduction',
            'uid_id',
        ])
            ->whereHas('uid', function ($query) use ($uid) {
                $query->where('code', '=', $uid);
            })
            ->with(['about' => function ($query) {
                $query->select([
                    'id',
                    'order_number',
                    'user_id',
                    'social_network_id',
                    'show_button_text',
                    'button_text',
                    'value'
                ]);
                $query->with(['socialNetwork' => function ($query2) {
                    $query2->select([
                        'id',
                        'name',
                        'placeholder',
                        'href',
                        'href_app',
                        'path_icon_svg',
                    ]);
                }]);
                $query->orderBy('order_number', 'ASC');
            }])
            ->with(['uid' => function ($query) {
                $query->select([
                    'id',
                    'code',
                ]);
            }])
            ->first();
        return $user;
    }

    public function firstById($id)
    {
        $user = User::where('id', '=', $id)->with(['about' => function ($query) {
            $query->select(['*']);
            $query->with('socialNetwork');
            $query->orderBy('order_number', 'ASC');
        }])->first();
        return $user;
    }

    public function createNewUser($params = [])
    {
        $name = Arr::get($params, 'name');
        $email = Arr::get($params, 'email');
        $password = Arr::get($params, 'password');
        $uidId = Arr::get($params, 'uid_id');

        $user = $this->create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'uid_id' => $uidId,
        ]);

        Setting::create([
            'user_id' => $user->id,
            'contact_saving_feature' => 0,
        ]);
        ContactGroup::create([
            'user_id' => $user->id,
            'name' => 'Unknown',
        ]);

        return $user;
    }

    public function checkSavedContact($userLoginId, $uid): bool
    {
        $user = $this->firstByUID($uid);
        if ($user) {
            $resultHaveContact = User::where('id', '=', $userLoginId)->whereHas('contact', function ($query) use ($user) {
                $query->where('contact_user_id', '=', $user->id);
            })->first();
            return $resultHaveContact ? true : false;
        }
        return false;
    }
}
