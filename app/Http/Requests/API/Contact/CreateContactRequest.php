<?php

namespace App\Http\Requests\API\Contact;

use Illuminate\Foundation\Http\FormRequest;

use App\Rules\DifferentUserLoginIdRule;
use App\Rules\Contact\ContactGroupIdIsMineRule;

class CreateContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'contact_user_id' => ['required', 'exists:users,id', 'integer', new DifferentUserLoginIdRule()],
            'contact_group_id' => ['required', 'exists:contact_groups,id', new ContactGroupIdIsMineRule()],
            'note' => ['nullable', 'string', 'max:1024'],
        ];
    }
}
