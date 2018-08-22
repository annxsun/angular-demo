import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormValidatiion } from '../../../util/formValidation';

@Component({
    selector: 'app-signin',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    private signForm: FormGroup;
    private formValidatiion: FormValidatiion;
    private formValidatiionInfo: any;
    private hide: boolean;

    signRule = [
        {   name: 'name',
            rules: ['required'],
        },
        {
            name: 'password',
            rules: ['required', 'password'],
        }
    ];

    constructor(private router: Router,
                private fb: FormBuilder) {}

    ngOnInit(): void {
        this.hide = true;
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
        console.log(this.signForm.value);
        this.router.navigate(['/http/list']);
    }

}
