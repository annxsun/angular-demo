import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormValidatiion } from '../../../util/formValidation';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    private signForm: FormGroup;
    private formValidatiion: FormValidatiion;
    private formValidatiionInfo: any;

    private passwordHide: boolean;
    private rePasswordHide: boolean;

    signRule = [
        {   name: 'name',
            rules: ['required'],
        },
        {
            name: 'email',
            rules: ['required', 'email'],
        },
        {
            name: 'password',
            rules: ['required', 'password'],
        },
        {
            name: 'repassword',
            rules: ['required'],
        }
    ];

    constructor(private router: Router,
        private fb: FormBuilder) {}

    ngOnInit(): void {
        this.passwordHide = true;
        this.rePasswordHide = true;
        this.formValidatiion = new FormValidatiion(this.signRule);
        this.formValidatiionInfo = this.formValidatiion.getValidationParmas();
        this.buildForm();
    }

    buildForm() {
        this.signForm = this.fb.group(this.formValidatiionInfo.controlsConfig);
        this.signForm.valueChanges.subscribe(data => {
            this.formValidatiion.onValueChanged(this.signForm, data);
        });
        this.formValidatiion.onValueChanged(this.signForm);
    }

    sign() {
        this.router.navigate(['/']);
    }

}
