<?php

namespace App\Rules\Contact;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

use App\Models\ContactGroup;

class ContactGroupIdIsMineRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $contactGroup = ContactGroup::find($value);
        if ($contactGroup) {
            return (int)$contactGroup->user_id === (int)Auth::user()->id;
        }
        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The contact group must belong to the logged in user';
    }
}
