<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Contact;

class ContactUsFormController extends Controller {

    public function ContactUsForm(Request $request) {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10'
         ]);

        Contact::create($request->all());

        return response()->json([
            'status' => 200
        ]);
    }
}
