import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormValidatiion } from '../../../util/formValidation';
import { MyHttpService } from '../myhttp.service';
import { LoadingService } from '../../../shared/loading/loading.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    private userForm: FormGroup;
    private formValidatiion: FormValidatiion;
    private formValidatiionInfo: any;
    private id: string;
    private hasDate: boolean;

    userRule = [
        {
            name: 'id',
            rules: [],
        },
        {   name: 'name',
            rules: ['required'],
        },
        {
            name: 'email',
            rules: ['required', 'email'],
        },
        {
            name: 'birth',
            rules: ['required'],
        },
        {
            name: 'hobby',
            rules: ['required'],
        },
        {
            name: 'role',
            rules: ['required'],
        },
    ];

    constructor(private router: Router,
        private fb: FormBuilder,
        private service: MyHttpService,
        private activatedRoute: ActivatedRoute,
        private loading: LoadingService) {
        }

    ngOnInit(): void {
        this.hasDate = false;
        this.getRouterParams();
        this.hasDate = true;
        this.initFormGroup();
        if (this.id) {
            this.getDetail();
        }
    }

    initFormGroup() {
        this.formValidatiion = new FormValidatiion(this.userRule);
        this.formValidatiionInfo = this.formValidatiion.getValidationParmas();
        this.buildForm();
    }

    buildForm() {
        this.userForm = this.fb.group(this.formValidatiionInfo.controlsConfig);
        this.userForm.valueChanges.subscribe(data => {
            this.formValidatiion.onValueChanged(this.userForm, data);
        });
        this.formValidatiion.onValueChanged(this.userForm);
    }

    submit() {
     if (this.id) {
         this.update();
         return;
     }

     this.creat();
    }

    getRouterParams() {
        this.id = this.activatedRoute.snapshot.params['id'];
    }

    getDetail() {
        this.loading.start();
        this.service.getUser(this.id).subscribe(data => {
            for (let i = 0; i < this.userRule.length; i++) {
                this.userRule[i]['defauleVaule'] = data[this.userRule[i]['name']];
            }
            this.initFormGroup();
            this.loading.stop();
            this.hasDate = true;
        });
    }

    back() {
        this.router.navigate(['./http/list']);
    }

    creat() {
        let user = this.userForm.value;
        user['birth'] = user['birth'].getFullYear() + '-' +
                        String(user['birth'].getMonth()).padStart(2, '0') + '-' +
                        user['birth'].getDate();
        this.service.addUsers(user).subscribe(data => {
            this.back();
        });
    }

    update() {
        let user = this.userForm.value;
        if (typeof user['birth'] !== 'string') {
            user['birth'] = user['birth'].getFullYear() + '-' +
                            String(user['birth'].getMonth()).padStart(2, '0') + '-' +
                            user['birth'].getDate();
        }
        this.service.updateUser(user).subscribe(data => {
            this.back();
        });
    }

}
