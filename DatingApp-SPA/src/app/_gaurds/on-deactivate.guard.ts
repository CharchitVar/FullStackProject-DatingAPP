import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class OnDeactivateGuard implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if(component.editForm.dirty){
            return confirm('Are You sure You want to Continue ? Any Changes will be lost ');
        }
        return true;

    }

}