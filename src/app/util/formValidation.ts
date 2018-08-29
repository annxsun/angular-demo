import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class FormValidatiion {
    private formErrors: any;
    private validationMessages: any;
    private controlsConfig: any;

    /**
     * 规则定义
     */
    private validationIndex = {
        required: {
            rules: [Validators.required],
            message: {
                required: '此为必填项'
            }
        },
        email: {
            rules: [Validators.email],
            message: {
                email: '请输入正确的邮箱',
            }
        },
        password: {
            rules: [
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(6),
                Validators.maxLength(25)
            ],
            message: {
                pattern: '密码中必须包含数字和字母',
                minlength: '请输入大于6个字符',
                maxlength: '请输入小于25个字符'
            }
        }
    };


    constructor(formInfo: Array<FormItem>) {
      this.resetParams();
      this.initValidationParamsByFormInfo(formInfo);
    }

    /**
     * 规则顶定义集合
     *
     * @param functionRule
     */
    functionRulesIndex(functionRule: any) {
        if (functionRule['name'] === 'minLength') {
            return this.minLength(functionRule['value']);
        }
        if (functionRule['name'] === 'maxLength') {
            return this.maxLength(functionRule['value']);
        }
    }

    /** 最小长度 */
    minLength(min: number) {
        return {
            message: {
                minlength: '请输入大于' + min + '个字符'
            },
            rules: [Validators.minLength(min)],
        };
    }

    /** 最大长度 */
    maxLength(max: number) {
        return {
            message: {
                minlength: '请输入小于' + max + '个字符'
            },
            rules: [Validators.maxLength(max)],
        };
    }

    /**
     * 重置参数，赋空值
     */
    resetParams() {
        this.formErrors = {};
        this.validationMessages = {};
        this.controlsConfig = {};
    }

    /**
     * 根据表单信息，来初始化校验信息
     *
     * @param formInfo 表单信息
     */
    initValidationParamsByFormInfo(formInfo: Array<FormItem>) {
        for (let i = 0; i < formInfo.length; i++) {
            let name = formInfo[i].name;
            let defauleVaule = formInfo[i].defauleVaule ? formInfo[i].defauleVaule : '';
            let rulesArr = formInfo[i].rules;
            let functionRules = formInfo[i].functionRules;
            this.formErrors[name] = '';
            this.validationMessages[name] = {};
            this.controlsConfig[name] = {};
            let controlsConfigArray = [];
            this.controlsConfig[name] = [defauleVaule, controlsConfigArray];
            if (rulesArr && rulesArr.length > 0) {
                rulesArr.forEach(ele => {
                    this.validationMessages[name] = Object.assign(
                        this.validationMessages[name],
                        this.validationIndex[ele]['message']);
                    controlsConfigArray = [...controlsConfigArray, ...this.validationIndex[ele]['rules']];
                    this.controlsConfig[name] = [defauleVaule, controlsConfigArray];
                });
            }

            if (functionRules && functionRules.length > 0) {
                functionRules.forEach(ele => {
                    let result = this.functionRulesIndex(ele);
                    this.validationMessages[name] = Object.assign(
                        this.validationMessages[name],
                        result['message']);
                    controlsConfigArray = [...controlsConfigArray, ...result['rules']];
                    this.controlsConfig[name] = [defauleVaule, controlsConfigArray];
                });
            }
        }
        // console.log("formErrors", this.formErrors);
        // console.log("validationMessages", this.validationMessages);
        // console.log("controlsConfig", this.controlsConfig);
    }

    /**
     * 获取校验相关信息
     */
    getValidationParmas() {
        return {
            formErrors: this.formErrors,
            validationMessages: this.validationMessages,
            controlsConfig: this.controlsConfig
        };
    }

    /**
     * 表单字段值发生修改
     *
     * @param data
     */
    onValueChanged(formGroup: FormGroup, data?: any) {
        const form = formGroup;
        for (let field in this.formErrors) {
            if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
                this.formErrors[field] = '';
                let control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    let messages = this.validationMessages[field];
                    for (let key in control.errors) {
                        if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }
}

/**
 * 表单信息
 */
export interface FormItem {
    name: string;
    defauleVaule?: string;
    rules: Array<string>;
    functionRules?: Array<any>;
}
