<?php

namespace App\Repositories\User;

use Illuminate\Http\Request;

interface UserRepositoryInterface
{
    public function firstByColumn($columnName, $data);
    public function firstByEmail($email);
    public function firstByUID($uid);
    public function firstById($id);
    public function createNewUser($params = []);
    public function checkSavedContact($userLoginId, $uid): bool;
}
