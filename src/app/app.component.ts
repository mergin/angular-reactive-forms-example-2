import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    projectForm: FormGroup;
    statusOptions = ['Stable', 'Critical', 'Finished'];
    forbiddenProjectNames = ['Test'];

    constructor() { }

    ngOnInit() {
        this.projectForm = new FormGroup({
            // 'projectName': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
            'projectName': new FormControl(null, [Validators.required], this.forbiddenNamesAsync),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'projectStatus': new FormControl('Stable')
        });
    }

    onSubmit() {
        console.log(this.projectForm);
        // this.projectForm.reset();
    }

    forbiddenNames(control: FormControl): { [s: string]: boolean } {
        if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
            return { 'nameIsForbidden': true };
        }
        return null;
    }

    forbiddenNamesAsync(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'Test') {
                    resolve({ 'nameIsForbidden': true });
                } else {
                    resolve(null);
                }
            }, 1500);
        });
        return promise;
    }
}
