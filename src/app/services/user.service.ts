import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService extends BaseService {

    getUser(id) {
        const url = `${environment.portalApi}/user/UserData/${id}`;
        return this.http.get(url, { headers: this.createHeader() });
    }


    updateUserImg(fileT) {
        const url = `${environment.portalApi}/user/ImgUpload`;
        return this.http.post(url, { file: fileT, contentType: 'image/png' });
    }

}
